const axios = require("axios");
const cheerio = require("cheerio");

const paginasVisitadas = [];

async function crawlPagina(urlPadrao, urlAtual, paginasVisitadas) {
  try {
    const urlCompleta =
      urlPadrao + (urlAtual.startsWith("/") ? urlAtual.slice(1) : urlAtual);

    if (paginasVisitadas.includes(urlCompleta)) {
      console.log(`Já visitado: ${urlCompleta}`);
      return;
    }

    paginasVisitadas.push(urlCompleta);

    console.log("Visitando:", urlCompleta);

    const resposta = await axios.get(urlCompleta);
    const $ = cheerio.load(resposta.data);
    const links = [];

    $("a").each((i, elemento) => {
      const texto = $(elemento).text().trim();
      const href = $(elemento).attr("href");
      if (href) {
        links.push({ texto, href });
      }
    });

    console.log(`Links encontrados em ${urlCompleta}:`, links);

    for (const link of links) {
      const linkCompleto = link.href.startsWith("http")
        ? link.href
        : urlPadrao + link.href;

      await crawlPagina(
        urlPadrao,
        linkCompleto.replace(urlPadrao, ""),
        paginasVisitadas
      );
    }
  } catch (erro) {
    console.error("Erro ao acessar a página:", erro.message);
  }

  console.log("Páginas visitadas:", paginasVisitadas);
}

crawlPagina(
  "http://127.0.0.1:5500/pages/",
  "blade_runner.html",
  paginasVisitadas
);
