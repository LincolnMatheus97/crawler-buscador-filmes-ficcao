import path from 'path';
import { fileURLToPath } from 'url';
import { question } from 'readline-sync';
import { crawler, sitesVisitados } from "./crawler.js";
import { contarReferencias, buscarTermo } from "./search.js";
import { saveJson } from './saveJson.js';

// Substituição para __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {

    // Caminho do arquivo HTML inicial a ser lido
    let paginaInicial = 'pages/blade_runner.html';
    // __dirname é uma variável global do Node.js que contém o caminho do diretório atual
    let pastaBase = __dirname;

    console.log("Iniciando crawling...");
    crawler(paginaInicial, pastaBase); // Inicia o crawler a partir da página inicial

    console.log("\nCrawling concluído. Páginas visitadas:", sitesVisitados.size); // Exibe o número de páginas visitadas

    console.log("\nContando referências...");
    contarReferencias(); // Conta as referências de cada página
 
    let todasAsBuscas = {}; // Objeto para armazenar os resultados de todas as buscas

    console.log("\nIniciando buscas...");

    while (true) {
        // Solicita o termo ao usuário
        let termo = question("Digite o termo a ser buscado (ou aperte ENTER para encerrar): ").trim();
    
        // Verifica se o usuário não digitou nada
        if (termo === '') {
            console.log("Nenhum termo digitado. Encerrando o programa.");
            break;
        }
    
        // Converte o termo para minúsculas para comparação case-insensitive
        termo = termo.toLowerCase();
    
        // Executa a busca pelo termo
        let resultadosDaBusca = buscarTermo(termo);
    
        // Verifica se há resultados para o termo buscado
        if (resultadosDaBusca && resultadosDaBusca.length !== 0) {
            todasAsBuscas[termo] = resultadosDaBusca;
        } else {
            console.log(`Nenhum resultado encontrado para "${termo}".`);
        }
    }
    

    saveJson(todasAsBuscas)

    console.log("\nProcesso concluído.");
}

main();