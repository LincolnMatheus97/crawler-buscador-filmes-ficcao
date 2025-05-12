import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

// Armazena as páginas visitadas --> { "conteudoPagina": html, "links": [linksEncontrados], "referencias": 0 }
export const paginas = {};

// Armazena os sites visitados para evitar loops infinitos, o Set é mais eficiente que um array para isso. Ele não permite duplicatas.
export const sitesVisitados = new Set();

/**
 * @description Função recursiva que percorre os arquivos HTML, armazena o conteúdo e os links encontrados.
 * @param {string} caminhoArquivo - Caminho do arquivo HTML a ser lido.
 * @param {string} pastaBase - Caminho base onde os arquivos estão localizados.
 * @returns
 */
export function crawler(caminhoArquivo, pastaBase) {
  if (sitesVisitados.has(caminhoArquivo)) return; // Verifica se o arquivo já foi visitado
  sitesVisitados.add(caminhoArquivo); // Adiciona o arquivo ao Set de sites visitados

  // Cria o caminho completo do arquivo
  const caminhoCompleto = path.join(pastaBase, caminhoArquivo);
  let html; // Variável para armazenar o conteúdo do arquivo HTML
  try {
    html = fs.readFileSync(caminhoCompleto, "utf-8"); // Lê o arquivo HTML
  } catch (error) {
    console.log(`Erro ao ler ${caminhoArquivo}:`, error.message);
    return;
  }

  const $ = cheerio.load(html); // Carrega o conteúdo HTML no Cheerio para manipulação
  console.log(`Visitando: ${caminhoArquivo}`);
  const linksEncontrados = []; // Array para armazenar os links encontrados na página

  // Para cada link encontrado na página, normaliza o caminho e adiciona ao array de links encontrados
  $("a").each((i, link) => {
    const href = $(link).attr("href"); // Obtém o atributo href do link
    if (href && href.endsWith(".html")) {
      // Verifica se o link é um arquivo HTML
      let alvo = href; // Inicializa o alvo com o href do link
      if (!href.startsWith("pages/")) {
        // Se o href não começa com 'pages/', adiciona 'pages/' ao início do caminho
        alvo = `pages/${href}`; // Adiciona 'pages/' ao início do caminho
      }
      alvo = path.normalize(alvo).replace(/\\/g, "/"); // Normaliza o caminho para usar barras normais (/) em vez de barras invertidas (\) no Windows

      linksEncontrados.push(alvo); // Adiciona o link ao array de links encontrados
    }
  });

  // Armazena o conteúdo da página e os links encontrados no objeto paginas
  paginas[caminhoArquivo] = {
    conteudoPagina: html,
    links: linksEncontrados,
    referencias: 0,
  };

  for (const proxLink of linksEncontrados) { // Para cada link encontrado, chama a função crawler recursivamente
    crawler(proxLink, pastaBase);
  }
}
