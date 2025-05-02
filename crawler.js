
const axios = require('axios'); //biblioteca para fazer as requisicoes http (abaixar as paginas)
const cheerio = require('cheerio'); // carrega o html retornado e permite selecionar os elementos



const dadosPaginas = [];

async function crawlerPagina(urlPagina) { // definindo uma funcao assincrona
    try {
        const resposta = await axios.get(urlPagina); // axios.get faz a requisicao http e buscar o conteudo da pagina; await esperar a resposta chegar
        const $ = cheerio.load(resposta.data); // transforma o html em um objeto que pode ser manipulado; a variavel $ permite buscar os elementos do html,como $('a') e $('p')
        
        const links = [];
        $('a').each( (i, elemento) => { // $('a') pega todos os elementos <a>, e each itera sobre cada <a>
            const texto = $(elemento).text();
        })

    }catch (erro) {
        console.error('erro ao acessar pagina: ',erro.messege);
    }
}


crawlerPagina('https://github.com/natyyHy/crawler-buscador-filmes-ficcao/blob/c7c2e269f16835effbfd35a9452dcce3dcf8130d/pages/blade_runner.html')