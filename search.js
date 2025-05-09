import { paginas } from './crawler.js';

/**
 * @description Função que conta as referências de cada página, ou seja, quantas vezes ela é referenciada por outras páginas.
*/
export function contarReferencias() {
    for (const info of Object.values(paginas)) { // Para cada página visitada
        info.links.forEach(destino => {         // Para cada link encontrado na página
            if (paginas[destino]) {             // Verifica se o link é uma página válida
                paginas[destino].referencias++; // Incrementa o contador de referências da página de destino
            }
        });
    }
}
/**
 * @description Função que busca um termo nas páginas visitadas e exibe os resultados em uma tabela.
 * @param {string} termo - Termo a ser buscado nas páginas.
 * @returns {Array} - Array com os resultados da busca formatado para o JSON.
 */
// Função para contar ocorrências de um termo isolado em um texto
function contarOcorrencias(texto, termo) {
    const regex = new RegExp(`\\b${termo}\\b`, 'g');
    return (texto.match(regex) || []).length;
}

// Função para calcular pontuação com base em critérios definidos
function calcularPontuacao(referencias, ocorrencias, autoReferencia) {
    return (referencias * 10) + (ocorrencias * 5) - (autoReferencia * 15);
}

// Função que processa uma única página e retorna o resultado para ela
function processarPagina(caminho, info, termo) {
    const textoBruto = info.conteudoPagina.toLowerCase();
    const ocorrencias = contarOcorrencias(textoBruto, termo); // Conta ocorrências do termo
    const autoReferencia = info.links.filter(link => link === caminho).length; // Conta auto-referências
    const pontuacao = calcularPontuacao(info.referencias, ocorrencias, autoReferencia); // Calcula pontuação

    return { caminho, referencia: info.referencias, ocorrencias, autoReferencia, pontuacao };
}

// Função para ordenar os resultados de forma personalizada
function ordenarResultados(resultados) {
    return resultados.sort((a, b) => {
        if (b.pontuacao !== a.pontuacao) return b.pontuacao - a.pontuacao;
        if (b.referencia !== a.referencia) return b.referencia - a.referencia;
        if (b.ocorrencias !== a.ocorrencias) return a.ocorrencias - b.ocorrencias;
        if (a.autoReferencia !== b.autoReferencia) return a.autoReferencia - b.autoReferencia;
        return a.caminho.localeCompare(b.caminho); // Desempate alfabético
    });
}

// Função para exibir os resultados de forma formatada no console
function exibirResultadosConsole(termo, resultados) {
    console.log(`\nResultados da busca por "${termo}":`);
    const resultadosParaExibicao = resultados
        .filter(r => r.ocorrencias !== 0) // Mostra apenas se houve ocorrências
        .map(r => ({
            Página: r.caminho,
            Ocorrências: `${r.ocorrencias} * 5 = ${r.ocorrencias * 5}`,
            'Links recebidos': `${r.referencia} * 10 = ${r.referencia * 10}`,
            'Auto-Referência': `${r.autoReferencia} * -15 = ${r.autoReferencia * -15}`,
            Pontos: r.pontuacao
        }));

    if (resultadosParaExibicao.length > 0) {
        console.table(resultadosParaExibicao);
    } else {
        console.log(`Nenhum resultado encontrado para "${termo}".`);
    }
}

// Função principal que realiza a busca e retorna os dados relevantes
export function buscarTermo(termo) {
    termo = termo.toLowerCase(); // Converte o termo para minúsculas para busca case-insensitive

    // Processa todas as páginas e gera os resultados
    let resultados = Object.entries(paginas).map(
        ([caminho, info]) => processarPagina(caminho, info, termo)
    );

    // Ordena os resultados conforme critérios de relevância
    resultados = ordenarResultados(resultados);

    // Exibe no console em formato de tabela
    exibirResultadosConsole(termo, resultados);

    // Retorna os dados formatados para salvar em JSON, apenas os relevantes
    return resultados
        .filter(r => r.ocorrencias !== 0)
        .map(r => ({
            Página: r.caminho,
            Ocorrências: r.ocorrencias,
            Referências: r.referencia,
            AutoReferência: r.autoReferencia,
            Pontos: r.pontuacao
        }));
}
