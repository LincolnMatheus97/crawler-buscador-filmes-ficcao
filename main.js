import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { question } from 'readline-sync';
import { crawler, sitesVisitados } from "./crawler.js";
import { contarReferencias, buscarTermo } from "./search.js";

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
    let termo = question("Digite o termo a ser buscado (ou aperte ENTER para encerrar): ");
    if (termo === '') { // Verifica se o usuário não digitou nada
        console.log("Nenhum termo digitado. Encerrando o programa.");
        return;
    }
    termo.toLowerCase(); // Converte o termo para minúsculas para comparação case-insensitive

    while (termo !== '') { // Loop para permitir múltiplas buscas
        let resultadosDaBusca = buscarTermo(termo);

        if (resultadosDaBusca && resultadosDaBusca.length !== 0) { // Verifica se há resultados para o termo buscado
            todasAsBuscas[termo] = resultadosDaBusca;
        }

        termo = question("Digite o termo a ser buscado (ou aperte ENTER para encerrar): ");
        if (termo === '') { // Verifica se o usuário não digitou nada
            console.log("Nenhum termo digitado. Encerrando o programa.");
            break;
        }
        termo.toLowerCase();

    }

    //  Verifica se há resultados de busca para salvar
    if (Object.keys(todasAsBuscas).length > 0) { 
        let caminhoArquivoJSON = path.join(__dirname, 'resultados_busca.json'); // Caminho do arquivo JSON onde os resultados serão salvos

        // Salva os resultados de todas as buscas em um arquivo JSON
        fs.writeFileSync(caminhoArquivoJSON, JSON.stringify(todasAsBuscas, null, 2)); 
        console.log(`\nResultados de todas as buscas salvos em ${caminhoArquivoJSON}`);
    } else {
        console.log('\nNenhum resultado de busca para salvar em JSON.');
    }

    console.log("\nProcesso concluído.");
}

main();