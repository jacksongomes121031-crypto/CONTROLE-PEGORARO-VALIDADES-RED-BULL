/* =========================================================
   CONFIGURAÇÃO DA API GOOGLE SHEETS
========================================================= */

const API_URL = "https://script.google.com/macros/s/AKfycbycU16iVgnQ5JwdQ-rMcLLiBPKwHuer7_3rusZG3xM83iVbP31t11NMAVLEo-Xluu2iOw/exec";

/* =========================================================
   DEYCON
   CONTROLE DE VALIDADES • RED BULL

   SCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   EQUIPE / SUPERVISORES
========================================================= */

const equipes = {

  "ALESSANDRO J. VARELA HOLOSBACK": [
    "CARLA SOMENSI",
    "GRAZIELE LEAL PIRES",
    "MAHYANA DE ALMEIDA FINGER",
    "RONALDO BRANDAO OLIVEIRA"
  ],

  "CESAR MATHEUS MENDES": [
    "ADINALVA A.SPERANDIO3039",
    "DOUGLAS F DE SOUZA",
    "ELISABETE R.ALMEIDA 2533",
    "MICHELI L.BISCAIA 503172",
    "OSMAIR S.SANTOS 503043"
  ],

  "CLAUDIO ERZINGER": [
    "ADRIANA MARA DA SILVA",
    "BRUNA APARECIDA ARANTES 638",
    "BRUNA C.P.A.ROSARIO 503323",
    "CLAUDEMIR MOREIRA DA SILVA",
    "JOSE LUCZYNSKI",
    "LUGESMAIAN SANTANA 503520",
    "SIMONE ALVES DOS SANTOS",
    "VIVIANE OLIVEIRA ERZINGER"
  ],

  "DIEGO LUIZ ANTONIACOMI": [
    "DAIANE DE FATIMA TOLEDO",
    "DANIELE MOREIRA DE OLIVEIRA",
    "ELIANA MENDONCA DE OLIVEIRA",
    "FRANCIELE C.GASPAR503025",
    "LUSINALVA N.PEREIRA 1743",
    "RICARDO DOMINGUES",
    "VANIA ROSA MARTINEZ",
    "WILIAN CANDIDO MACIEL DE SOUZA"
  ],

  "JULIANO BERTOLDO": [
    "CLAUDIOMAR VIRGILIO MARTINS",
    "DOUGLAS MOREIRA DE CARVALHO",
    "NATHAN VIEIRA DOS SANTOS",
    "RAPHAEL PIRES RAMOS BERTOLDO",
    "RICARDO RAFAEL KINDINGER",
    "SIDNEY M. ATANAZIO 2207",
    "VALDIRENE S.ATANAZIO502868"
  ],

  "KATIA RIBEIRO PEREIRA": [
    "CARLOS HENRIQUE F.BARGINSKI",
    "CAROLINE DOS SANTOS PORTELLA",
    "JOELMA WOINAROSKI COELHO",
    "JOYCE DA SILVA",
    "MARLON DOS SANTOS RODRIGUES",
    "REGIANE C.DONATO 502780",
    "RICARDO RUPPEL",
    "ROBSON FERNANDO DE LORENA",
    "VANESSA ZAKRZEWSKI 504093"
  ],

  "LEANDRO CONTADOR": [
    "BRUNO A.DE OLIVEIRA GOMES",
    "CARLA DA SILVA CAPPUTE",
    "FERNANDO DUARTE BRANDAO",
    "JANETE DE SOUZA ARAUJO",
    "JEFFERSON RODRIGO GOMES SILVA",
    "JOMAR RIBEIRO DOS SANTOS",
    "RODRIGO JOSE DALLA PEGORARA",
    "RONE ALVES DE SOUZA 1739"
  ],

  "MARIA ANDREIA R. A. SANTOS": [
    "APARECIDO GONCALVES VALENTE",
    "CLEYDE S. KAWAHARA 772",
    "JOAO AUGUSTO KIVEL",
    "JOEL FIATCOSKI 502446",
    "LUCIANO CORDEIRO",
    "ROSLAINE RIBAS SANTANA",
    "VIVIANE OLIVEIRA ERZINGER"
  ],

  "SAMUEL GONCALVES": [
    "FERNANDA R.DE GODOY REOLON",
    "GISELE DA SILVA CASSEMIRO",
    "JUCY DE OLIVEIRA S.TEODORO",
    "MARCIA IACHECHEN LARA",
    "MIDIAN TENEDINI",
    "RONALDO M.M.JUNIOR 503177",
    "ROSANGELA DOS SANTOS",
    "ROSANGELA WOINAROSKI",
    "ROSEMARI DE SOUZA 502068"
  ]

};


/* =========================================================
   PRODUTOS
========================================================= */

const produtos = [
  {
    nome: "Red Bull Energy Drink",
    tamanhos: ["250 ml", "355 ml", "473 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/3695a10545/br_ed_250ml_energy-drink_country_rgb__cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Energy+Drink"
  },

  {
    nome: "Red Bull Zero",
    tamanhos: ["250 ml", "355 ml", "473 ml"],
    imagem: "./redbull-zero-250ml.webp",
    imagens: {
      "250 ml": "./redbull-zero-250ml.webp"
    },
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Zero"
  },

  {
    nome: "Red Bull Sugarfree",
    tamanhos: ["250 ml", "355 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/528x1348/8083114670/br_sf_250ml_sugarfree_country_rgb__cold_closed_front_com_full.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Sugarfree"
  },

  {
    nome: "The White Edition Sugarfree",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/97bb5a49dc/br_sf-cs_250ml_ac_the-white-edition_country_rgb_packrq-4842_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+White+Edition+Sugarfree"
  },

  {
    nome: "The Maçã Edition Sugarfree",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/528x1348/6b32a22fb3/br_sf-fai_250ml_ac_the-maca-edition-sugarfree_country_rgb_packrq-3400_cold_closed_front_com_full.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Ma%C3%A7%C3%A3+Edition+Sugarfree"
  },

  {
    nome: "The Nectarina Edition Sugarfree",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/222e943f79/br_sf-wp_250ml_ac_the-nectarina-edition-sugarfree_country_rgb_packrq-5170_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Nectarina+Edition+Sugarfree"
  },

  {
    nome: "The Ice Edition Sugarfree",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/48c7ee3693/br_sf-igb_250ml_ac_the-ice-edition-sugarfree_country_rgb_initi8-188_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Ice+Edition+Sugarfree"
  },

  {
    nome: "The Amora Edition Sugarfree",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/528x1348/2d9f981288/new_br_sf-ff_250ml_the-amora-edition-sugarfree_country_rgb_initi8-49_cold_closed_front_com_full.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Amora+Edition+Sugarfree"
  },

  {
    nome: "The Pomelo Edition Sugarfree",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/030bc3b020/br_sf-wpg_250ml_the-pomelo-edition-sugarfree_country_rgb_initi8-56_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Pomelo+Edition+Sugarfree"
  },

  {
    nome: "The Tropical Edition",
    tamanhos: ["250 ml", "473 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/635d955ea9/br_yl_250ml_the-tropical-edition_country_rgb_do238698_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Tropical+Edition"
  },

  {
    nome: "The Melancia Edition",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/8c43f3f482/br_wm_250ml_the-melancia-edition_country_rgb_do238714_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Melancia+Edition"
  },

  {
    nome: "The Melão Edition",
    tamanhos: ["250 ml"],
    imagem: "./redbull-melao-250ml.png",
    imagens: {
      "250 ml": "./redbull-melao-250ml.png"
    },
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Mel%C3%A3o+Edition"
  },

  {
    nome: "The Pêssego Edition",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/528x1348/6faa6f0f46/br_as_250ml_the-pessego-edition_country_rgb__cold_closed_front_com_full.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+P%C3%AAssego+Edition"
  },

  {
    nome: "The Cereja Edition",
    tamanhos: ["250 ml"],
    imagem: "https://www.redbull.com/energydrink/v1/resources/storyblok/images/f/287059/870x2200/14471adf6c/br_jb_250ml_the-cereja-edition_country_rgb_do243994_cold_closed_front_com_25.png/m/352x0",
    buscaImagem: "https://www.google.com/search?tbm=isch&q=Red+Bull+Cereja+Edition"
  }
];


/* =========================================================
   ELEMENTOS
========================================================= */

const supervisor =
  document.getElementById("supervisor");

const vendedor =
  document.getElementById("vendedor");

const cnpj =
  document.getElementById("cnpj");

const cliente =
  document.getElementById("cliente");

const areaProdutos =
  document.getElementById("produtos");

const mensagemBox =
  document.getElementById("mensagem");

const dataRegistroInput =
  document.getElementById("dataRegistro");

const btnConsultarCnpj =
  document.getElementById("btn-consultar-cnpj");


/* =========================================================
   VERIFICAR ELEMENTOS
========================================================= */

if (!supervisor) {
  console.error("Elemento #supervisor não encontrado.");
}

if (!vendedor) {
  console.error("Elemento #vendedor não encontrado.");
}

if (!cnpj) {
  console.error("Elemento #cnpj não encontrado.");
}

if (!cliente) {
  console.error("Elemento #cliente não encontrado.");
}

if (!areaProdutos) {
  console.error("Elemento #produtos não encontrado.");
}

if (!mensagemBox) {
  console.error("Elemento #mensagem não encontrado.");
}


/* =========================================================
   CARREGAR SUPERVISORES
========================================================= */

if (supervisor) {

  Object.keys(equipes).forEach(
    nome => {

      const option =
        document.createElement("option");

      option.value =
        nome;

      option.textContent =
        nome;

      supervisor.appendChild(option);

    }
  );

}


/* =========================================================
   SUPERVISOR → VENDEDOR
========================================================= */

if (supervisor) {

  supervisor.addEventListener(
    "change",
    function () {

      vendedor.innerHTML = `
        <option value="">
          Selecione o vendedor
        </option>
      `;

      vendedor.disabled = true;

      if (!this.value) {

        atualizarProcesso(1);

        return;

      }

      const lista =
        equipes[this.value];

      if (!lista) {
        return;
      }

      lista.forEach(
        nome => {

          const option =
            document.createElement("option");

          option.value =
            nome;

          option.textContent =
            nome;

          vendedor.appendChild(option);

        }
      );

      vendedor.disabled = false;

      atualizarProcesso(1);

    }
  );

}


/* =========================================================
   MÁSCARA CNPJ
========================================================= */

if (cnpj) {

  cnpj.addEventListener(
    "input",
    function () {

      let valor =
        this.value.replace(/\D/g, "");

      valor =
        valor.substring(0, 14);

      if (valor.length > 12) {

        valor =
          valor.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/,
            "$1.$2.$3/$4-$5"
          );

      }

      else if (valor.length > 8) {

        valor =
          valor.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/,
            "$1.$2.$3/$4"
          );

      }

      else if (valor.length > 5) {

        valor =
          valor.replace(
            /^(\d{2})(\d{3})(\d{0,3}).*/,
            "$1.$2.$3"
          );

      }

      else if (valor.length > 2) {

        valor =
          valor.replace(
            /^(\d{2})(\d{0,3}).*/,
            "$1.$2"
          );

      }

      this.value =
        valor;

    }
  );

}


/* =========================================================
   CNPJ — VALIDAÇÃO
========================================================= */

function cnpjValido(valor) {

  const digits =
    String(valor || "")
      .replace(/\D/g, "");

  if (
    digits.length !== 14 ||
    /^([0-9])\1{13}$/.test(digits)
  ) {

    return false;

  }

  const calc =
    (base, pesos) => {

      let soma = 0;

      for (
        let i = 0;
        i < pesos.length;
        i++
      ) {

        soma +=
          Number(base[i]) *
          pesos[i];

      }

      const resto =
        soma % 11;

      return resto < 2
        ? 0
        : 11 - resto;

    };


  const d1 =
    calc(
      digits.slice(0, 12),
      [5,4,3,2,9,8,7,6,5,4,3,2]
    );


  const d2 =
    calc(
      digits.slice(0, 12) + d1,
      [6,5,4,3,2,9,8,7,6,5,4,3,2]
    );


  return (
    Number(digits[12]) === d1 &&
    Number(digits[13]) === d2
  );

}


/* =========================================================
   CONSULTA CNPJ
========================================================= */

let consultaCnpjTimer = null;


async function consultarCnpjAutomaticamente() {

  if (!cnpj || !cliente) {
    return;
  }

  const digits =
    cnpj.value.replace(/\D/g, "");


  if (
    digits.length !== 14 ||
    !cnpjValido(digits)
  ) {

    cnpj.classList.remove(
      "cnpj-valido",
      "cnpj-invalido"
    );

    return;

  }


  cnpj.classList.add("cnpj-valido");

  cnpj.classList.remove(
    "cnpj-invalido"
  );


  try {

    const resposta =
      await fetch(
        "https://brasilapi.com.br/api/cnpj/v1/" + digits,
        {
          method: "GET",
          headers: {
            "Accept": "application/json"
          },
          cache: "no-store"
        }
      );


    if (!resposta.ok) {

      throw new Error(
        "CNPJ não encontrado"
      );

    }


    const dados =
      await resposta.json();


    const nome =
      dados.razao_social ||
      dados.nome_fantasia ||
      "";


    if (
      nome &&
      !cliente.value.trim()
    ) {

      cliente.value =
        nome;

    }


    atualizarProcesso(2);

  }

  catch (erro) {

    cnpj.classList.remove(
      "cnpj-valido"
    );

    cnpj.classList.add(
      "cnpj-invalido"
    );

    console.warn(
      "Não foi possível consultar o CNPJ:",
      erro
    );

  }

}


/* =========================================================
   EVENTOS
========================================================= */

if (vendedor) {

  vendedor.addEventListener(
    "change",
    function () {

      if (this.value) {

        atualizarProcesso(2);

      }

    }
  );

}


if (cnpj) {

  cnpj.addEventListener(
    "input",
    function () {

      const digits =
        this.value.replace(/\D/g, "");


      this.classList.remove(
        "cnpj-valido",
        "cnpj-invalido"
      );


      if (consultaCnpjTimer) {

        clearTimeout(
          consultaCnpjTimer
        );

      }


      if (digits.length === 14) {

        if (cnpjValido(digits)) {

          this.classList.add(
            "cnpj-valido"
          );


          consultaCnpjTimer =
            setTimeout(
              consultarCnpjAutomaticamente,
              120
            );

        }

        else {

          this.classList.add(
            "cnpj-invalido"
          );

        }

      }

    }
  );

}


if (btnConsultarCnpj) {

  btnConsultarCnpj.addEventListener(
    "click",
    () => {

      const digits =
        cnpj?.value.replace(/\D/g, "") || "";


      if (!cnpjValido(digits)) {

        mostrarMensagem(
          "CNPJ inválido. Confira os números antes de consultar.",
          "erro"
        );

        cnpj?.focus();

        return;

      }


      consultarCnpjAutomaticamente();

    }
  );

}


/* =========================================================
   DATA DO REGISTRO
========================================================= */

if (dataRegistroInput) {

  const hoje =
    new Date();

  const yyyy =
    hoje.getFullYear();

  const mm =
    String(
      hoje.getMonth() + 1
    ).padStart(2, "0");

  const dd =
    String(
      hoje.getDate()
    ).padStart(2, "0");


  dataRegistroInput.value =
    `${yyyy}-${mm}-${dd}`;

}


/* =========================================================
   DATA MÍNIMA DE VALIDADE
========================================================= */

function dataMinimaValidade30Dias() {

  const d =
    new Date();

  d.setHours(
    12,
    0,
    0,
    0
  );


  d.setDate(
    d.getDate() + 30
  );


  return (
    d.getFullYear() +
    "-" +
    String(
      d.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
      d.getDate()
    ).padStart(2, "0")
  );

}


/* =========================================================
   CLIENTE
========================================================= */

if (cliente) {

  cliente.addEventListener(
    "input",
    function () {

      if (
        this.value.trim()
      ) {

        atualizarProcesso(3);

      }

    }
  );

}


/* =========================================================
   PREÇO — MÁSCARA BRASILEIRA

   Digite:
   1050 → 10,50
========================================================= */

function formatarPrecoBR(valor) {

  let numeros =
    String(valor || "")
      .replace(/\D/g, "");


  if (!numeros) {

    return "";

  }


  numeros =
    numeros.replace(
      /^0+(?=\d)/,
      ""
    );


  const numero =
    Number(numeros) / 100;


  return numero.toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );

}


/* =========================================================
   CONVERTER PREÇO PARA NÚMERO
========================================================= */

function converterPrecoParaNumero(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {

    return 0;

  }


  let texto =
    String(valor)
      .replace(/\s/g, "")
      .replace(/R\$/gi, "");


  if (
    texto.includes(",")
  ) {

    texto =
      texto
        .replace(/\./g, "")
        .replace(",", ".");

  }


  const numero =
    Number(texto);


  return Number.isFinite(numero)
    ? numero
    : 0;

}


/* =========================================================
   ATIVAR MÁSCARA DE PREÇO
========================================================= */

function ativarMascaraPreco(input) {

  if (
    !input ||
    input.dataset.mascaraPrecoAtiva === "1"
  ) {

    return;

  }


  input.dataset.mascaraPrecoAtiva =
    "1";


  input.addEventListener(
    "input",
    function () {

      this.value =
        formatarPrecoBR(
          this.value
        );


      this.setSelectionRange(
        this.value.length,
        this.value.length
      );

    }
  );


  input.addEventListener(
    "blur",
    function () {

      if (!this.value) {
        return;
      }


      const numero =
        converterPrecoParaNumero(
          this.value
        );


      this.value =
        numero.toLocaleString(
          "pt-BR",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        );

    }
  );

}


/* =========================================================
   ADICIONAR PRODUTO
========================================================= */

function adicionarProduto() {

  if (!areaProdutos) {

    return;

  }


  const div =
    document.createElement("div");


  div.className =
    "produto";


  div.innerHTML = `

    <div class="produto-visual">

      <div class="produto-foto-wrap">

        <img
          class="produto-foto"
          alt="Foto do produto Red Bull"
          loading="lazy"
        >

        <div class="produto-foto-fallback">
          RB
        </div>

      </div>


      <div class="produto-visual-info">

        <span class="produto-kicker">
          CATÁLOGO RED BULL
        </span>

        <strong class="produto-titulo">
          Novo produto
        </strong>

        <small>
          Selecione o produto para visualizar a embalagem.
        </small>

      </div>

    </div>


    <div class="produto-topo">

      <div class="produto-identificacao">

        <div
          class="produto-icone"
          aria-hidden="true"
        >

          <svg viewBox="0 0 24 24">

            <path
              d="m21 8-9-5-9 5 9 5 9-5Z"
            />

            <path
              d="M3 8v9l9 5 9-5V8"
            />

            <path
              d="M12 13v9"
            />

          </svg>

        </div>


        <div class="produto-mini-label">
          DADOS DO ITEM
        </div>

      </div>


      <button
        type="button"
        class="remover"
        title="Remover produto"
        aria-label="Remover produto"
      >
        ×
      </button>

    </div>


    <label>
      Produto / Sabor
    </label>


    <select class="produtoNome">

      <option value="">
        Selecione o produto
      </option>

      ${produtos
        .map(
          (produto, index) => `
            <option value="${index}">
              ${produto.nome}
            </option>
          `
        )
        .join("")
      }

    </select>


    <div class="produto-link-foto">

      <span class="produto-foto-status">
        ●
      </span>

      <span>
        Imagem do produto
      </span>

      <a
        class="produto-foto-link"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        abrir fotos no Google
      </a>

    </div>


    <div class="produto-grid produto-grid-comercial">

      <div>

        <label>
          Tamanho
        </label>


        <select
          class="produtoTamanho"
          disabled
        >

          <option value="">
            Selecione primeiro o produto
          </option>

        </select>

      </div>


      <div>

        <label>
          Preço pago pelo cliente (R$)
        </label>


        <div class="preco-input">

          <span>
            R$
          </span>


          <input
            type="text"
            class="precoPagoCliente"
            inputmode="decimal"
            autocomplete="off"
            placeholder="0,00"
          >

        </div>

      </div>


      <div>

        <label>
          Validade
        </label>


        <div class="data-input">

          <span class="data-icone">
            📅
          </span>


          <input
            type="date"
            class="validade"
          >

        </div>

      </div>


      <div class="quantidade-box">

        <label>
          Quantidade
        </label>


        <input
          type="number"
          class="quantidade"
          min="1"
          step="1"
          inputmode="numeric"
          placeholder="Ex.: 10"
        >


        <span>
          UN.
        </span>

      </div>

    </div>


    <label>
      Observação
    </label>


    <textarea
      class="observacao"
      rows="2"
      maxlength="500"
      placeholder="Ex.: preço promocional, exposição, troca, avaria..."
    ></textarea>

  `;


  const selectProduto =
    div.querySelector(
      ".produtoNome"
    );


  const selectTamanho =
    div.querySelector(
      ".produtoTamanho"
    );


  const validade =
    div.querySelector(
      ".validade"
    );




  const quantidade =
    div.querySelector(
      ".quantidade"
    );


  const precoPagoCliente =
    div.querySelector(
      ".precoPagoCliente"
    );


  ativarMascaraPreco(
    precoPagoCliente
  );


  const observacao =
    div.querySelector(
      ".observacao"
    );


  const fotoLink =
    div.querySelector(
      ".produto-foto-link"
    );


  const foto =
    div.querySelector(
      ".produto-foto"
    );


  const fotoFallback =
    div.querySelector(
      ".produto-foto-fallback"
    );


  /* =======================================================
     PRODUTO → TAMANHO
  ======================================================= */

  selectProduto.addEventListener(
    "change",
    function () {

      selectTamanho.innerHTML = `
        <option value="">
          Selecione o tamanho
        </option>
      `;


      selectTamanho.disabled =
        true;


      if (
        this.value === ""
      ) {

        return;

      }


      const produto =
        produtos[
          Number(this.value)
        ];


      if (!produto) {

        return;

      }


      const produtoBusca =
        encodeURIComponent(
          produto.nome +
          " Red Bull"
        );


      if (fotoLink) {

        fotoLink.href =
          produto.buscaImagem ||
          "https://www.google.com/search?tbm=isch&q=" +
          produtoBusca;

      }


      const imagemInicial =
        produto.imagens?.[
          produto.tamanhos[0]
        ] ||
        produto.imagem ||
        "";


      if (foto) {

        if (imagemInicial) {

          foto.src =
            imagemInicial;

          foto.classList.add(
            "visivel"
          );

          fotoFallback.classList.remove(
            "visivel"
          );

        }

        else {

          foto.removeAttribute(
            "src"
          );

          foto.classList.remove(
            "visivel"
          );

          fotoFallback.classList.add(
            "visivel"
          );

        }

      }


      const titulo =
        div.querySelector(
          ".produto-titulo"
        );


      if (titulo) {

        titulo.textContent =
          produto.nome;

      }


      const visualInfo =
        div.querySelector(
          ".produto-visual-info small"
        );


      if (visualInfo) {

        visualInfo.textContent =
          produto.imagem
            ? "Foto do produto carregada automaticamente."
            : "Foto disponível no catálogo do Google.";

      }


      produto.tamanhos.forEach(
        tamanho => {

          const option =
            document.createElement(
              "option"
            );


          option.value =
            tamanho;


          option.textContent =
            tamanho;


          selectTamanho.appendChild(
            option
          );

        }
      );


      selectTamanho.disabled =
        false;

    }
  );


  /* =======================================================
     TAMANHO → FOTO
  ======================================================= */

  selectTamanho.addEventListener(
    "change",
    function () {

      const produto =
        produtos[
          Number(
            selectProduto.value
          )
        ];


      if (
        !produto ||
        !foto
      ) {

        return;

      }


      const imagem =
        produto.imagens?.[
          this.value
        ] ||
        (
          produto.imagens
            ? ""
            : produto.imagem
        ) ||
        "";


      if (imagem) {

        foto.src =
          imagem;

        foto.classList.add(
          "visivel"
        );

        fotoFallback.classList.remove(
          "visivel"
        );

      }

      else {

        foto.removeAttribute(
          "src"
        );

        foto.classList.remove(
          "visivel"
        );

        fotoFallback.classList.add(
          "visivel"
        );

      }


      if (fotoLink) {

        const q =
          encodeURIComponent(
            produto.nome +
            " " +
            this.value +
            " Red Bull"
          );


        fotoLink.href =
          "https://www.google.com/search?tbm=isch&q=" +
          q;

      }

    }
  );


  /* =======================================================
     REMOVER
  ======================================================= */

  div
    .querySelector(".remover")
    .addEventListener(
      "click",
      () => {

        div.remove();

      }
    );


  /* =======================================================
     EVENTOS
  ======================================================= */

  validade.addEventListener(
    "change",
    () =>
      atualizarProcesso(3)
  );


  quantidade.addEventListener(
    "input",
    () =>
      atualizarProcesso(3)
  );


  precoPagoCliente.addEventListener(
    "input",
    () =>
      atualizarProcesso(3)
  );


  observacao.addEventListener(
    "input",
    () =>
      atualizarProcesso(3)
  );


  areaProdutos.appendChild(
    div
  );

}


/* =========================================================
   COLETAR PRODUTOS
========================================================= */

function coletarProdutos() {

  const lista = [];


  document
    .querySelectorAll(".produto")
    .forEach(
      item => {

        const produtoSelect =
          item.querySelector(
            ".produtoNome"
          );


        const tamanhoSelect =
          item.querySelector(
            ".produtoTamanho"
          );


        const validade =
          item.querySelector(
            ".validade"
          );


        const quantidade =
          item.querySelector(
            ".quantidade"
          );


        const precoPagoCliente =
          item.querySelector(
            ".precoPagoCliente"
          );


        const observacao =
          item.querySelector(
            ".observacao"
          );


        if (
          produtoSelect.value === "" &&
          tamanhoSelect.value === "" &&
          validade.value === "" &&
          quantidade.value === "" &&
          precoPagoCliente.value === "" &&
          observacao.value.trim() === ""
        ) {

          return;

        }


        const produto =
          produtos[
            Number(
              produtoSelect.value
            )
          ];


        lista.push({

          produto:
            produto
              ? produto.nome
              : "",


          tamanho:
            tamanhoSelect.value,


          validade:
            validade.value,


          quantidade:
            quantidade.value
              ? Number(
                  quantidade.value
                )
              : 0,


          precoPagoCliente:
            converterPrecoParaNumero(
              precoPagoCliente.value
            ),


          observacao:
            observacao.value.trim(),


          imagemProduto:
            produto &&
            produto.imagem
              ? produto.imagem
              : "",


          linkFotos:
            produto &&
            produto.buscaImagem
              ? produto.buscaImagem
              : "",


          buscaImagem:
            produto &&
            produto.buscaImagem
              ? produto.buscaImagem
              : ""

        });

      }
    );


  return lista;

}


/* =========================================================
   VALIDAR PRODUTOS
========================================================= */

function validarProdutos() {

  const itens =
    document.querySelectorAll(
      ".produto"
    );


  if (
    itens.length === 0
  ) {

    return {

      valido: false,

      mensagem:
        "Adicione pelo menos um produto."

    };

  }


  for (
    let i = 0;
    i < itens.length;
    i++
  ) {

    const item =
      itens[i];


    const produto =
      item
        .querySelector(
          ".produtoNome"
        )
        .value;


    const tamanho =
      item
        .querySelector(
          ".produtoTamanho"
        )
        .value;


    const validade =
      item
        .querySelector(
          ".validade"
        )
        .value;


    const quantidade =
      item
        .querySelector(
          ".quantidade"
        )
        .value;


    const precoPagoCliente =
      item
        .querySelector(
          ".precoPagoCliente"
        )
        .value;


    const vazio =
      !produto &&
      !tamanho &&
      !validade &&
      !quantidade;


    if (vazio) {

      continue;

    }


    if (!produto) {

      return {

        valido: false,

        mensagem:
          `Selecione o produto do item ${i + 1}.`

      };

    }


    if (!tamanho) {

      return {

        valido: false,

        mensagem:
          `Selecione o tamanho do item ${i + 1}.`

      };

    }


    if (!validade) {

      return {

        valido: false,

        mensagem:
          `Informe a validade do item ${i + 1}.`

      };

    }


    if (
      !quantidade ||
      Number(quantidade) <= 0
    ) {

      return {

        valido: false,

        mensagem:
          `Informe uma quantidade válida no item ${i + 1}.`

      };

    }


    if (
      precoPagoCliente === "" ||
      converterPrecoParaNumero(
        precoPagoCliente
      ) < 0
    ) {

      return {

        valido: false,

        mensagem:
          `Informe um preço pago pelo cliente válido no item ${i + 1}.`

      };

    }

  }


  const produtosValidos =
    coletarProdutos()
      .filter(
        item =>
          item.produto &&
          item.tamanho &&
          item.validade &&
          item.precoPagoCliente !== "" &&
          converterPrecoParaNumero(
            item.precoPagoCliente
          ) >= 0 &&
          Number(
            item.quantidade
          ) > 0
      );


  if (
    produtosValidos.length === 0
  ) {

    return {

      valido: false,

      mensagem:
        "Preencha pelo menos um produto completo."

    };

  }


  return {

    valido: true,

    produtos:
      produtosValidos

  };

}


/* =========================================================
   SALVAR
========================================================= */

async function salvar() {

  const botao =
    document.querySelector(
      ".btn-confirmar"
    );


  /* =======================================================
     SUPERVISOR
  ======================================================= */

  if (
    !supervisor.value
  ) {

    mostrarMensagem(
      "Selecione o supervisor.",
      "erro"
    );


    supervisor.focus();


    return;

  }


  /* =======================================================
     VENDEDOR
  ======================================================= */

  if (
    !vendedor.value
  ) {

    mostrarMensagem(
      "Selecione o vendedor.",
      "erro"
    );


    vendedor.focus();


    return;

  }


  /* =======================================================
     CNPJ
  ======================================================= */

  const cnpjValor =
    cnpj.value.trim();


  const numerosCnpj =
    cnpjValor.replace(
      /\D/g,
      ""
    );


  if (
    !cnpjValido(
      numerosCnpj
    )
  ) {

    mostrarMensagem(
      "CNPJ inválido. Confira os números antes de continuar.",
      "erro"
    );


    cnpj.focus();


    return;

  }


  /* =======================================================
     CLIENTE
  ======================================================= */

  const clienteValor =
    cliente.value.trim();


  if (
    !clienteValor
  ) {

    mostrarMensagem(
      "Digite o nome do cliente.",
      "erro"
    );


    cliente.focus();


    return;

  }


  /* =======================================================
     PRODUTOS
  ======================================================= */

  const resultadoProdutos =
    validarProdutos();


  if (
    !resultadoProdutos.valido
  ) {

    mostrarMensagem(
      resultadoProdutos.mensagem,
      "erro"
    );


    return;

  }


  /* =======================================================
     DATA / MÊS
  ======================================================= */

  const dataRegistroISO =
    dataRegistroInput?.value ||
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );


  const dataRegistroObj =
    new Date(
      dataRegistroISO +
      "T12:00:00"
    );


  const mesesPt = [

    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"

  ];


  const mesReferencia =
    mesesPt[
      dataRegistroObj.getMonth()
    ] +
    " " +
    dataRegistroObj.getFullYear();


  const nomeAbaMes =
    String(
      dataRegistroObj.getMonth() + 1
    ).padStart(
      2,
      "0"
    ) +
    " - " +
    mesReferencia;


  /* =======================================================
     OBJETO DO REGISTRO
  ======================================================= */

  const registro = {

    dataRegistro:
      dataRegistroObj.toLocaleDateString(
        "pt-BR"
      ),


    dataRegistroISO:
      dataRegistroISO,


    mesReferencia:
      mesReferencia,


    nomeAbaMes:
      nomeAbaMes,


    supervisor:
      supervisor.value,


    vendedor:
      vendedor.value,


    cnpj:
      cnpjValor,


    cliente:
      clienteValor,


    produtos:
      resultadoProdutos.produtos

  };


  /* =======================================================
     BACKUP LOCAL
  ======================================================= */

  try {

    let registros =
      JSON.parse(
        localStorage.getItem(
          "deycon_registros_v2"
        ) ||
        "[]"
      );


    registros.push(
      registro
    );


    localStorage.setItem(
      "deycon_registros_v2",
      JSON.stringify(
        registros
      )
    );

  }

  catch (erro) {

    console.warn(
      "Não foi possível salvar backup local.",
      erro
    );

  }


  /* =======================================================
     BOTÃO
  ======================================================= */

  const textoOriginal =
    botao
      ? botao.innerHTML
      : "";


  if (botao) {

    botao.disabled =
      true;


    botao.innerHTML = `
      <span class="check">⏳</span>
      <span>SALVANDO...</span>
    `;

  }


  /* =======================================================
     ENVIAR PARA GOOGLE SHEETS
     
     IMPORTANTE:
     Content-Type = text/plain
     
     Isso evita o preflight CORS do navegador
     com Google Apps Script.
  ======================================================= */

  try {

    mostrarMensagem(
      "⏳ Enviando registro para o Google Sheets...",
      "sucesso"
    );


    const resposta =
      await fetch(
        API_URL,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8"

          },

          body:
            JSON.stringify(
              registro
            ),

          redirect:
            "follow"

        }
      );


    const textoResposta =
      await resposta.text();


    let resultadoAPI;


    /* =====================================================
       CONVERTER RESPOSTA DA API
    ===================================================== */

    try {

      resultadoAPI =
        JSON.parse(
          textoResposta
        );

    }

    catch (erroJSON) {

      console.error(
        "Resposta inválida da API:",
        textoResposta
      );


      throw new Error(
        "A API respondeu, mas o retorno não é um JSON válido."
      );

    }


    /* =====================================================
       VERIFICAR SUCESSO
    ===================================================== */

    if (
      !resultadoAPI ||
      resultadoAPI.sucesso !== true
    ) {

      throw new Error(

        resultadoAPI?.erro ||

        resultadoAPI?.mensagem ||

        "A API não confirmou o salvamento."

      );

    }


    console.log(
      "Registro enviado para Google Sheets:",
      resultadoAPI
    );


    /* =====================================================
       ATUALIZAR REGISTRO LOCAL
    ===================================================== */

    registro.idRegistro =
      resultadoAPI.idRegistro ||
      "";


    registro.quantidadeItens =
      resultadoAPI.quantidadeItens ||
      registro.produtos.length;


    registro.dataProcessamento =
      resultadoAPI.dataProcessamento ||
      "";


    registro.sincronizado =
      true;


    /* =====================================================
       ATUALIZAR BACKUP LOCAL COM ID DA API
    ===================================================== */

    try {

      const registrosAtualizados =
        JSON.parse(
          localStorage.getItem(
            "deycon_registros_v2"
          ) ||
          "[]"
        );


      if (
        registrosAtualizados.length > 0
      ) {

        registrosAtualizados[
          registrosAtualizados.length - 1
        ] =
          registro;


        localStorage.setItem(
          "deycon_registros_v2",
          JSON.stringify(
            registrosAtualizados
          )
        );

      }

    }

    catch (erroLocal) {

      console.warn(
        "Não foi possível atualizar o backup local com o ID da API.",
        erroLocal
      );

    }


    /* =====================================================
       SUCESSO
    ===================================================== */

    mostrarMensagem(

      `✓ Registro salvo no Google Sheets! ${
        resultadoAPI.idRegistro
          ? "ID: " +
            resultadoAPI.idRegistro
          : ""
      }`,

      "sucesso"

    );


    mostrarAvisoValidade();


    window.registroAguardandoOk =
      true;

  }


  /* =======================================================
     ERRO DE COMUNICAÇÃO
  ======================================================= */

  catch (erro) {

    console.error(
      "ERRO AO ENVIAR PARA A API:",
      erro
    );


    mostrarMensagem(

      "⚠ O registro ficou salvo neste dispositivo, mas não foi confirmado no Google Sheets. Verifique sua conexão e tente novamente.",

      "erro"

    );


    /* =====================================================
       MARCAR COMO NÃO SINCRONIZADO
    ===================================================== */

    try {

      const registrosAtuais =
        JSON.parse(
          localStorage.getItem(
            "deycon_registros_v2"
          ) ||
          "[]"
        );


      if (
        registrosAtuais.length > 0
      ) {

        registrosAtuais[
          registrosAtuais.length - 1
        ].sincronizado =
          false;


        registrosAtuais[
          registrosAtuais.length - 1
        ].erroSincronizacao =
          erro.message ||
          String(erro);


        localStorage.setItem(
          "deycon_registros_v2",
          JSON.stringify(
            registrosAtuais
          )
        );

      }

    }

    catch (erroLocal) {

      console.warn(
        "Não foi possível atualizar o status do backup local.",
        erroLocal
      );

    }

  }


  /* =======================================================
     RESTAURAR BOTÃO
  ======================================================= */

  finally {

    if (botao) {

      botao.disabled =
        false;


      botao.innerHTML =
        textoOriginal;

    }

  }

}


/* =========================================================
   LIMPAR FORMULÁRIO
========================================================= */

function limparFormulario() {

  cnpj.value =
    "";


  cliente.value =
    "";


  areaProdutos.innerHTML =
    "";


  adicionarProduto();


  atualizarProcesso(
    1
  );

}


/* =========================================================
   MENSAGEM
========================================================= */

function mostrarMensagem(
  texto,
  tipo
) {

  if (!mensagemBox) {

    alert(
      texto
    );

    return;

  }


  mensagemBox.textContent =
    texto;


  mensagemBox.className =
    `mensagem ${tipo}`;


  setTimeout(
    () => {

      mensagemBox.textContent =
        "";


      mensagemBox.className =
        "mensagem";

    },
    5000
  );

}


/* =========================================================
   PROCESSO VISUAL
========================================================= */

function atualizarProcesso(
  etapa
) {

  const itens =
    document.querySelectorAll(
      ".processo-item"
    );


  itens.forEach(
    item => {

      item.classList.remove(
        "ativo"
      );

    }
  );


  if (
    etapa <= 1
  ) {

    itens[0]
      ?.classList
      .add(
        "ativo"
      );

  }


  else if (
    etapa === 2
  ) {

    itens[0]
      ?.classList
      .add(
        "ativo"
      );


    itens[1]
      ?.classList
      .add(
        "ativo"
      );

  }


  else {

    itens.forEach(
      item => {

        item.classList.add(
          "ativo"
        );

      }
    );

  }

}


/* =========================================================
   PRODUTO INICIAL
========================================================= */

adicionarProduto();


/* =========================================================
   PROCESSO INICIAL
========================================================= */

atualizarProcesso(
  1
);


/* =========================================================
   AVISO DE VALIDADES — V8
========================================================= */

function mostrarAvisoValidade() {

  const aviso =
    document.getElementById(
      "aviso-validade"
    );


  if (!aviso) {
    return;
  }


  aviso.classList.add(
    "visivel"
  );

}


function fecharAvisoValidade() {

  const aviso =
    document.getElementById(
      "aviso-validade"
    );


  aviso?.classList.remove(
    "visivel"
  );


  if (
    window.registroAguardandoOk
  ) {

    window.registroAguardandoOk =
      false;


    limparFormulario();

  }

}