
const axios = require('axios'); //biblioteca para fazer as requisicoes http (abaixar as paginas)
const cheerio = require('cheerio'); // carrega o html retornado e permite selecionar os elementos



const paginasVisitadas = new Set();

async function crawlerPagina(urlPadrao,urlAtual) { // definindo uma funcao assincrona

    const urlCompleta = new URL(urlPadrao, urlAtual).href;
    if(paginasVisitadas.has(urlCompleta)){ // se pagina ja foi visitada, parar a funçao
        return;
    }
    
    try {

        const resposta = await axios.get(urlCompleta); // axios.get faz a requisicao http e buscar o conteudo da pagina; await esperar a resposta chegar
        const $ = cheerio.load(resposta.data); // transforma o html em um objeto que pode ser manipulado; a variavel $ permite buscar os elementos do html,como $('a') e $('p')
        const links = [];

        $('a').each( (i,elemento) => { // $('a') pega todos os elementos <a>, e each itera sobre cada <a>
            const texto = $(elemento).text(); //pegar texto que esta dentro do link
            const href = $(elemento).attr('href');
            if(href){ // se houver link, coloca-lo no meu array
                links.push(href);
            }
        })

        paginasVisitadas.push(urlCompleta)

        //funcao recursiva para verificar as outras paginas
        for(const url of links){
            console.log(url)
            crawlerPagina(urlPadrao,url);
        }
        
    }catch (erro) {
        console.error('erro ao acessar pagina: ',erro.messege);
    }
}


crawlerPagina('http://127.0.0.1:5500/pages','blade_runner.html');
