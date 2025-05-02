
const axios = require('axios'); //biblioteca para fazer as requisicoes http (abaixar as paginas)
const cheerio = require('cheerio'); // carrega o html retornado e permite selecionar os elementos



const dadosPaginas = [];

async function crawlerPagina(urlPagina) { // definindo uma funcao assincrona
    try {
        const resposta = await axios.get(urlPagina); // axios.get faz a requisicao http e buscar o conteudo da pagina; await esperar a resposta chegar
        console.log(resposta.data) 
        const $ = cheerio.load(resposta.data);
        

    }catch (erro) {
        console.error('erro ao acessar pagina: ',erro.messege);
    }
}
