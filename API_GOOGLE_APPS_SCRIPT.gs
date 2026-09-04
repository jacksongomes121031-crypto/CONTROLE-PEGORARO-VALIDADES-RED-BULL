/**
 * API DEYCON / GRUPO PECORARO - VERSAO 5.0
 *
 * ESTRUTURA NOVA:
 *   PAINEL       -> dashboard geral por faixa de validade
 *   BASE GERAL   -> todos os lancamentos
 *   SUP - NOME   -> uma aba separada para cada supervisor
 *
 * NAO USA / NAO CRIA:
 *   ITENS, LOG_API, CONFIG, REGISTROS
 *
 * O sistema web continua usando a mesma API_URL. Esta alteracao fica somente
 * no Apps Script / Google Sheets.
 */

const CONFIG = {
  SPREADSHEET_ID: "",
  ABA_BASE: "BASE GERAL",
  ABA_PAINEL: "PAINEL",
  PREFIXO_SUPERVISOR: "SUP - ",
  TIMEZONE: "America/Sao_Paulo",
  PREFIXO_REGISTRO: "REG",
  PREFIXO_ITEM: "ITEM"
};

const CABECALHO = [
  "DATA REGISTRO", "SUPERVISOR", "VENDEDOR", "CNPJ", "CLIENTE",
  "PRODUTO", "TAMANHO", "VALIDADE", "QUANTIDADE", "PREÇO PRODUTO (R$)",
  "DIAS PARA VENCER", "STATUS", "INDICADOR", "OBSERVAÇÃO", "ID REGISTRO",
  "ID ITEM", "MÊS REFERÊNCIA", "IMAGEM PRODUTO", "LINK FOTOS", "BUSCA IMAGEM", "DATA CRIAÇÃO"
];

function doGet() {
  return respostaJSON({
    sucesso: true,
    status: "online",
    sistema: "API Deycon / Grupo Pecoraro",
    versao: "5.0.0-base-geral-supervisores-painel",
    data: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "dd/MM/yyyy HH:mm:ss")
  });
}

function doPost(e) {
  const inicio = Date.now();
  let lock = null;
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respostaJSON({ sucesso: false, erro: "Nenhum conteúdo recebido." });
    }

    const dados = lerJSON(e);
    const validacao = validarRegistro(dados);
    if (!validacao.valido) return respostaJSON({ sucesso: false, erro: validacao.mensagem });

    lock = LockService.getScriptLock();
    if (!lock.tryLock(8000)) {
      return respostaJSON({ sucesso: false, erro: "A planilha está ocupada. Tente novamente em alguns segundos." });
    }

    const ss = obterPlanilha();
    const base = prepararBase(ss);
    const idRegistro = gerarIdRapido(CONFIG.PREFIXO_REGISTRO);
    const dataRegistro = criarDataSegura(normalizarDataISO(dados.dataRegistroISO || dados.dataRegistro));
    const mesReferencia = nomeMes(dataRegistro);
    const agora = new Date();
    const hoje = inicioDoDia(new Date());
    const supervisorNome = limparTexto(dados.supervisor);

    const linhas = dados.produtos.map(function(item) {
      const validade = criarDataSegura(normalizarDataISO(item.validade));
      const dias = calcularDias(hoje, validade);
      const status = calcularStatus(dias);
      return [
        Utilities.formatDate(dataRegistro, CONFIG.TIMEZONE, "dd/MM/yyyy"),
        supervisorNome,
        limparTexto(dados.vendedor),
        limparTexto(dados.cnpj),
        limparTexto(dados.cliente),
        limparTexto(item.produto),
        limparTexto(item.tamanho),
        validade,
        Number(item.quantidade) || 0,
        Number(item.precoPagoCliente) || 0,
        dias,
        status,
        "●",
        limparTexto(item.observacao),
        idRegistro,
        gerarIdRapido(CONFIG.PREFIXO_ITEM),
        mesReferencia,
        limparTexto(item.imagemProduto),
        limparTexto(item.linkFotos),
        limparTexto(item.buscaImagem),
        Utilities.formatDate(agora, CONFIG.TIMEZONE, "dd/MM/yyyy HH:mm:ss")
      ];
    });

    // 1) Base geral: recebe TODOS os lancamentos.
    appendLinhas(base, linhas);

    // 2) Aba exclusiva do supervisor: recebe somente os lancamentos dele.
    const abaSupervisor = prepararAbaSupervisor(ss, supervisorNome);
    appendLinhas(abaSupervisor, linhas);

    // Atualização do painel: somente valores, sem reconstruir layout a cada envio.
    atualizarPainelRapido(ss);

    return respostaJSON({
      sucesso: true,
      mensagem: "Registro salvo com sucesso.",
      idRegistro: idRegistro,
      quantidadeItens: linhas.length,
      supervisorAba: abaSupervisor.getName(),
      dataProcessamento: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "dd/MM/yyyy HH:mm:ss"),
      tempoMs: Date.now() - inicio
    });
  } catch (erro) {
    return respostaJSON({ sucesso: false, erro: erro && erro.message ? erro.message : "Erro interno na API." });
  } finally {
    if (lock) lock.releaseLock();
  }
}

function obterPlanilha() {
  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.trim()) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID.trim());
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("Planilha não encontrada. Informe CONFIG.SPREADSHEET_ID se necessário.");
  return ss;
}

function prepararBase(ss) {
  let sheet = ss.getSheetByName(CONFIG.ABA_BASE);
  if (!sheet) sheet = ss.insertSheet(CONFIG.ABA_BASE);
  garantirCabecalho(sheet);
  return sheet;
}

function garantirCabecalho(sheet) {
  if (sheet.getMaxColumns() < CABECALHO.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), CABECALHO.length - sheet.getMaxColumns());
  }
  const atual = sheet.getRange(1, 1, 1, CABECALHO.length).getValues()[0];
  let diferente = false;
  for (let i = 0; i < CABECALHO.length; i++) {
    if (String(atual[i] || "") !== CABECALHO[i]) { diferente = true; break; }
  }
  if (diferente) sheet.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO]);
}

function prepararAbaSupervisor(ss, nomeSupervisor) {
  const nome = nomeAbaSupervisor(nomeSupervisor);
  let sheet = ss.getSheetByName(nome);
  if (!sheet) sheet = ss.insertSheet(nome);
  garantirCabecalho(sheet);
  if (sheet.getLastRow() === 1) configurarVisualTabela(sheet);
  return sheet;
}

function nomeAbaSupervisor(nome) {
  let limpo = limparTexto(nome).replace(/[\\\/\?\*\[\]:]/g, "-");
  limpo = limpo.replace(/\s+/g, " ").trim();
  if (!limpo) limpo = "SEM NOME";
  let nomeFinal = CONFIG.PREFIXO_SUPERVISOR + limpo;
  if (nomeFinal.length > 100) nomeFinal = nomeFinal.substring(0, 100);
  return nomeFinal;
}

function appendLinhas(sheet, linhas) {
  const primeiraLinha = Math.max(sheet.getLastRow() + 1, 2);
  sheet.getRange(primeiraLinha, 1, linhas.length, CABECALHO.length).setValues(linhas);
  sheet.getRange(primeiraLinha, 8, linhas.length, 1).setNumberFormat("dd/MM/yyyy");
  sheet.getRange(primeiraLinha, 10, linhas.length, 1).setNumberFormat("R$ #,##0.00");
  sheet.getRange(primeiraLinha, 11, linhas.length, 1).setNumberFormat("0");
  sheet.getRange(primeiraLinha, 13, linhas.length, 1).setHorizontalAlignment("center").setFontSize(16);
}

function configurarVisualTabela(sheet) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, CABECALHO.length)
    .setFontWeight("bold")
    .setWrap(true)
    .setHorizontalAlignment("center");

  const larguras = [105,190,190,145,210,190,90,100,90,125,115,100,70,250,120,120,130,250,250,250,145];
  larguras.forEach(function(largura, i) { sheet.setColumnWidth(i + 1, largura); });
  sheet.getDataRange().setVerticalAlignment("middle");
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), CABECALHO.length).createFilter();
  aplicarFormatacaoStatus(sheet);
}

function aplicarFormatacaoStatus(sheet) {
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("OK")
      .setFontColor("#188038").setBackground("#E6F4EA")
      .setRanges([sheet.getRange("L2:L")]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("CRÍTICO")
      .setFontColor("#B06000").setBackground("#FEF7E0")
      .setRanges([sheet.getRange("L2:L")]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("VENCIDO")
      .setFontColor("#B31412").setBackground("#FCE8E6")
      .setRanges([sheet.getRange("L2:L")]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("●")
      .setFontColor("#188038")
      .setRanges([sheet.getRange("M2:M")]).build()
  ]);
}

function atualizarPainelRapido(ss) {
  const base = ss.getSheetByName(CONFIG.ABA_BASE);
  const painel = prepararPainel(ss);
  const cont = contarFaixas(base);
  const pct = function(v){ return cont.total ? v / cont.total : 0; };

  // Atualiza apenas os números. O layout já foi criado por configurarPlanilhaNova().
  painel.getRange("A4").setValue("TOTAL DE PRODUTOS\n" + cont.total);
  painel.getRange("C4").setValue("+30 DIAS\n" + cont.mais30);
  painel.getRange("E4").setValue("16–30 DIAS\n" + cont.d16a30);
  painel.getRange("G4").setValue("8–15 DIAS\n" + cont.d8a15);
  painel.getRange("A7").setValue("0–7 DIAS\n" + cont.d0a7);
  painel.getRange("C7").setValue("VENCIDO\n" + cont.vencido);
  painel.getRange("B11:B15").setValues([[cont.mais30],[cont.d16a30],[cont.d8a15],[cont.d0a7],[cont.vencido]]);
  painel.getRange("C11:C15").setValues([[pct(cont.mais30)],[pct(cont.d16a30)],[pct(cont.d8a15)],[pct(cont.d0a7)],[pct(cont.vencido)]]);
}

function atualizarPainel(ss) {
  const base = ss.getSheetByName(CONFIG.ABA_BASE);
  const painel = prepararPainel(ss);
  const cont = contarFaixas(base);
  escreverPainel(painel, cont);
}

function prepararPainel(ss) {
  let sheet = ss.getSheetByName(CONFIG.ABA_PAINEL);
  if (!sheet) sheet = ss.insertSheet(CONFIG.ABA_PAINEL, 0);
  return sheet;
}

function contarFaixas(base) {
  const r = { total:0, mais30:0, d16a30:0, d8a15:0, d0a7:0, vencido:0 };
  if (!base || base.getLastRow() < 2) return r;

  const qtd = base.getLastRow() - 1;
  const valores = base.getRange(2, 6, qtd, 7).getValues(); // F:L
  const hoje = inicioDoDia(new Date());

  valores.forEach(function(row) {
    if (!limparTexto(row[0])) return;
    let dias = Number(row[6]);
    if (!isFinite(dias)) {
      const validade = converterValorParaData(row[2]);
      if (!validade) return;
      dias = calcularDias(hoje, validade);
    }
    r.total++;
    if (dias > 30) r.mais30++;
    else if (dias >= 16) r.d16a30++;
    else if (dias >= 8) r.d8a15++;
    else if (dias >= 0) r.d0a7++;
    else r.vencido++;
  });
  return r;
}

function escreverPainel(sheet, r) {
  sheet.clear();
  sheet.setHiddenGridlines(true);

  // Cabecalho
  sheet.getRange("A1:H1").merge();
  sheet.getRange("A1").setValue("PAINEL GERAL — CONTROLE DE VALIDADES");
  sheet.getRange("A1:H1").setFontWeight("bold").setFontSize(20).setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(1, 42);

  sheet.getRange("A2:H2").merge();
  sheet.getRange("A2").setValue("Visão consolidada de todos os lançamentos • Atualização automática");
  sheet.getRange("A2:H2").setHorizontalAlignment("center").setFontStyle("italic");

  // KPIs
  const kpis = [
    ["TOTAL DE PRODUTOS", r.total],
    ["+30 DIAS", r.mais30],
    ["16–30 DIAS", r.d16a30],
    ["8–15 DIAS", r.d8a15],
    ["0–7 DIAS", r.d0a7],
    ["VENCIDO", r.vencido]
  ];

  const blocos = ["A4:B5","C4:D5","E4:F5","G4:H5","A7:B8","C7:D8"];
  kpis.forEach(function(k, i) {
    const rg = sheet.getRange(blocos[i]);
    rg.merge();
    rg.setValue(k[0] + "\n" + k[1]);
    rg.setWrap(true).setHorizontalAlignment("center").setVerticalAlignment("middle");
    rg.setFontWeight("bold").setFontSize(i === 0 ? 15 : 14);
    rg.setBorder(true,true,true,true,true,true);
  });
  sheet.setRowHeight(4, 30); sheet.setRowHeight(5, 34); sheet.setRowHeight(7, 30); sheet.setRowHeight(8, 34);

  // Tabela de distribuicao
  sheet.getRange("A10:D10").setValues([["FAIXA DE VALIDADE","TOTAL","% DO TOTAL","LEITURA"]]);
  sheet.getRange("A11:A15").setValues([["+30 dias"],["16–30 dias"],["8–15 dias"],["0–7 dias"],["Vencido"]]);
  sheet.getRange("B11:B15").setValues([[r.mais30],[r.d16a30],[r.d8a15],[r.d0a7],[r.vencido]]);
  const pct = function(v){ return r.total ? v / r.total : 0; };
  sheet.getRange("C11:C15").setValues([[pct(r.mais30)],[pct(r.d16a30)],[pct(r.d8a15)],[pct(r.d0a7)],[pct(r.vencido)]]).setNumberFormat("0.0%");
  sheet.getRange("D11:D15").setValues([["Dentro da validade"],["Atenção"],["Atenção"],["Prioridade"],["Ação imediata"]]);
  sheet.getRange("A10:D15").setBorder(true,true,true,true,true,true);
  sheet.getRange("A10:D10").setFontWeight("bold").setHorizontalAlignment("center");
  sheet.getRange("B11:C15").setHorizontalAlignment("center");

  // Rodape
  sheet.getRange("A17:H17").merge();
  sheet.getRange("A17").setValue("Os dias para vencer são calculados a partir da data atual. As faixas do painel são: +30, 16–30, 8–15, 0–7 e Vencido.");
  sheet.getRange("A17:H17").setWrap(true).setFontStyle("italic").setHorizontalAlignment("center");

  [220,105,105,145,105,105,105,105].forEach(function(w,i){ sheet.setColumnWidth(i+1,w); });

  // Destaques visuais por faixa.
  sheet.getRange("A11:D11").setBackground("#E6F4EA").setFontColor("#188038");
  sheet.getRange("A12:D12").setBackground("#E8F0FE").setFontColor("#174EA6");
  sheet.getRange("A13:D13").setBackground("#FEF7E0").setFontColor("#B06000");
  sheet.getRange("A14:D14").setBackground("#FCE8E6").setFontColor("#B31412");
  sheet.getRange("A15:D15").setBackground("#F4CCCC").setFontColor("#990000");

  sheet.setFrozenRows(2);
}

/**
 * Execute UMA VEZ para converter a planilha antiga para a estrutura nova.
 * Se existir a antiga aba SUPERVISOR, seus dados válidos são migrados para
 * BASE GERAL e para as respectivas abas de supervisor.
 * Abas antigas ITENS / LOG_API / CONFIG / REGISTROS deixam de ser usadas.
 */
function configurarPlanilhaNova() {
  const ss = obterPlanilha();
  const antiga = ss.getSheetByName("SUPERVISOR");
  let dadosAntigos = [];

  // Aproveita somente a antiga SUPERVISOR, nunca ITENS/LOG_API/CONFIG.
  if (antiga && antiga.getLastRow() >= 2) {
    const qtd = antiga.getLastRow() - 1;
    const cols = Math.min(antiga.getLastColumn(), CABECALHO.length);
    const valores = antiga.getRange(2, 1, qtd, cols).getValues();
    valores.forEach(function(row) {
      const completa = row.slice(0, CABECALHO.length);
      while (completa.length < CABECALHO.length) completa.push("");
      if (limparTexto(completa[5])) dadosAntigos.push(completa);
    });
  }

  // Remove somente as abas legadas do sistema e as abas de supervisor desta estrutura.
  ["ITENS","LOG_API","CONFIG","REGISTROS","SUPERVISOR"].forEach(function(nome) {
    const sh = ss.getSheetByName(nome);
    if (sh && ss.getSheets().length > 1) ss.deleteSheet(sh);
  });
  ss.getSheets().forEach(function(sh) {
    if (sh.getName().indexOf(CONFIG.PREFIXO_SUPERVISOR) === 0 && ss.getSheets().length > 1) {
      ss.deleteSheet(sh);
    }
  });

  const base = prepararBase(ss);
  if (base.getLastRow() > 1) base.getRange(2,1,base.getLastRow()-1,CABECALHO.length).clearContent();
  configurarVisualTabela(base);

  if (dadosAntigos.length) {
    appendLinhas(base, dadosAntigos);
    // Recalcula dias/status para os dados migrados.
    atualizarDiasStatusAba(base);
    const grupos = {};
    dadosAntigos.forEach(function(row) {
      const sup = limparTexto(row[1]) || "SEM NOME";
      if (!grupos[sup]) grupos[sup] = [];
      grupos[sup].push(row);
    });
    Object.keys(grupos).forEach(function(sup) {
      const sh = prepararAbaSupervisor(ss, sup);
      appendLinhas(sh, grupos[sup]);
      atualizarDiasStatusAba(sh);
    });
  }

  const painel = prepararPainel(ss);
  atualizarPainel(ss);
  instalarAtualizacaoDiaria();
  ss.setActiveSheet(painel);
  SpreadsheetApp.flush();
}

function atualizarDiasStatusAba(sheet) {
  if (!sheet || sheet.getLastRow() < 2) return;
  const qtd = sheet.getLastRow() - 1;
  const datas = sheet.getRange(2, 8, qtd, 1).getValues();
  const hoje = inicioDoDia(new Date());
  const dias = [];
  const status = [];
  const indicadores = [];
  datas.forEach(function(row) {
    const validade = converterValorParaData(row[0]);
    if (!validade) {
      dias.push([""]); status.push([""]); indicadores.push([""]);
      return;
    }
    const d = calcularDias(hoje, validade);
    const st = calcularStatus(d);
    dias.push([d]); status.push([st]); indicadores.push(["●"]);
  });
  sheet.getRange(2, 11, qtd, 1).setValues(dias).setNumberFormat("0");
  sheet.getRange(2, 12, qtd, 1).setValues(status);
  sheet.getRange(2, 13, qtd, 1).setValues(indicadores).setHorizontalAlignment("center").setFontSize(16);
}

function atualizarDiasEStatus() {
  const ss = obterPlanilha();
  const base = ss.getSheetByName(CONFIG.ABA_BASE);
  if (base) atualizarDiasStatusAba(base);
  ss.getSheets().forEach(function(sh) {
    if (sh.getName().indexOf(CONFIG.PREFIXO_SUPERVISOR) === 0) atualizarDiasStatusAba(sh);
  });
  atualizarPainel(ss);
}

function instalarAtualizacaoDiaria() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === "atualizarDiasEStatus") ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger("atualizarDiasEStatus").timeBased().everyDays(1).atHour(1).create();
}

function validarRegistro(dados) {
  if (!dados || typeof dados !== "object") return { valido:false, mensagem:"Dados inválidos." };
  if (!String(dados.supervisor || "").trim()) return { valido:false, mensagem:"Supervisor não informado." };
  if (!String(dados.vendedor || "").trim()) return { valido:false, mensagem:"Vendedor não informado." };
  if (!String(dados.cnpj || "").trim()) return { valido:false, mensagem:"CNPJ não informado." };
  if (!String(dados.cliente || "").trim()) return { valido:false, mensagem:"Cliente não informado." };
  if (!Array.isArray(dados.produtos) || !dados.produtos.length) return { valido:false, mensagem:"Nenhum produto foi enviado." };

  for (let i=0; i<dados.produtos.length; i++) {
    const item = dados.produtos[i];
    if (!String(item.produto || "").trim()) return { valido:false, mensagem:"Produto não informado no item "+(i+1)+"." };
    if (!String(item.tamanho || "").trim()) return { valido:false, mensagem:"Tamanho não informado no item "+(i+1)+"." };
    if (!String(item.validade || "").trim()) return { valido:false, mensagem:"Validade não informada no item "+(i+1)+"." };
    const qtd = Number(item.quantidade);
    if (!isFinite(qtd) || qtd <= 0) return { valido:false, mensagem:"Quantidade inválida no item "+(i+1)+"." };
    const preco = Number(item.precoPagoCliente);
    if (!isFinite(preco) || preco < 0) return { valido:false, mensagem:"Preço inválido no item "+(i+1)+"." };
  }
  return { valido:true };
}

function lerJSON(e) {
  const conteudo = e.postData.contents;
  try { return JSON.parse(conteudo); }
  catch (_) {
    if (e.parameter && e.parameter.payload) return JSON.parse(e.parameter.payload);
    throw new Error("O conteúdo recebido não é um JSON válido.");
  }
}

function gerarIdRapido(prefixo) {
  const props = PropertiesService.getScriptProperties();
  const chave = "SEQ_" + prefixo;
  const atual = Number(props.getProperty(chave) || 0) + 1;
  props.setProperty(chave, String(atual));
  return prefixo + "-" + String(atual).padStart(6, "0");
}

function nomeMes(data) {
  const meses=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  return meses[data.getMonth()] + " " + data.getFullYear();
}

function normalizarDataISO(valor) {
  if (!valor) return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd");
  const texto = String(valor).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) return texto;
  const br = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (br) return br[3]+"-"+br[2]+"-"+br[1];
  const d = new Date(valor);
  if (!isNaN(d.getTime())) return Utilities.formatDate(d, CONFIG.TIMEZONE, "yyyy-MM-dd");
  throw new Error("Data inválida: " + texto);
}

function criarDataSegura(dataISO) {
  const p = String(dataISO).split("-");
  if (p.length === 3) {
    const ano=Number(p[0]), mes=Number(p[1]), dia=Number(p[2]);
    const d=new Date(ano,mes-1,dia,12,0,0);
    if (d.getFullYear()===ano && d.getMonth()===mes-1 && d.getDate()===dia) return d;
  }
  throw new Error("Data inválida: " + dataISO);
}

function converterValorParaData(valor) {
  if (valor instanceof Date && !isNaN(valor.getTime())) return inicioDoDia(valor);
  if (valor === null || valor === undefined || valor === "") return null;
  try { return criarDataSegura(normalizarDataISO(valor)); } catch (_) { return null; }
}

function inicioDoDia(data) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate(), 12, 0, 0);
}

function calcularDias(hoje, validade) {
  return Math.round((inicioDoDia(validade).getTime() - inicioDoDia(hoje).getTime()) / 86400000);
}

function calcularStatus(dias) {
  if (dias < 0) return "VENCIDO";
  if (dias <= 15) return "CRÍTICO";
  return "OK";
}

function limparTexto(valor) {
  return valor === null || valor === undefined ? "" : String(valor).trim();
}

function respostaJSON(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

function testarAPI() {
  const hoje = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd");
  const resultado = doPost({postData:{contents:JSON.stringify({
    dataRegistroISO:hoje, supervisor:"TESTE SUPERVISOR", vendedor:"TESTE VENDEDOR", cnpj:"00.000.000/0001-00", cliente:"CLIENTE TESTE",
    produtos:[{produto:"Red Bull Energy Drink", tamanho:"250 ml", validade:"2026-12-31", quantidade:1, precoPagoCliente:8.5, observacao:"TESTE"}]
  })}});
  Logger.log(resultado.getContent());
}
