import { paginas } from './crawler.js';

/**
 * @description Função que conta as referências de cada página, ou seja, quantas vezes ela é referenciada por outras páginas.
*/
export function contarReferencias() {
    for (const [origem, info] of Object.entries(paginas)) { // Para cada página visitada 
        info.links.forEach(destino => {  // Para cada link encontrado na página
            if (paginas[destino]) {      // Verifica se o link é uma página válida
                paginas[destino].referencias++;  // Incrementa o contador de referências da página de destino
            }
        });
    }
}
/**
 * @description Função que busca um termo nas páginas visitadas e exibe os resultados em uma tabela.
 * @param {string} termo - Termo a ser buscado nas páginas.
 * @returns {Array} - Array com os resultados da busca formatado para o JSON.
 */
export function buscarTermo(termo) {
    termo = termo.toLowerCase(); // Converte o termo para minúsculas para comparação case-insensitive

    let resultados = Object.entries(paginas).map(([caminho, info]) => { // Mapeia as páginas visitadas para um array de resultados
        // Converte o conteúdo da página para minúsculas  
        let textoBruto = info.conteudoPagina.toLowerCase();
        // Conta as ocorrências do termo na página, usando regex para garantir que seja uma palavra inteira e não parte de outra palavra
        // Exemplo: "ficção" não deve contar como ocorrência de "ficção científica"
        // O regex \b indica uma borda de palavra, ou seja, o termo deve estar isolado por espaços ou pontuação
        let ocorrencias = (textoBruto.match(new RegExp(`\\b${termo}\\b`, 'g')) || []).length;;
        // Verifica se a página se auto-referencia
        let autoReferencia = info.links.filter(link => link === caminho).length;

        // Calcula a pontuação da página com base nas referências, ocorrências e auto-referência
        let pontuacao = (info.referencias * 10) + (ocorrencias * 5) - (autoReferencia * 15);

        return { caminho, referencia: info.referencias, ocorrencias, autoReferencia, pontuacao };
    });

    // Ordena os resultados com base na pontuação, referências, ocorrências e auto-referência, em ordem decrescente
    resultados.sort((a, b) => {
        if (b.pontuacao !== a.pontuacao) return b.pontuacao - a.pontuacao;
        if (b.referencia !== a.referencia) return b.referencia - a.referencia;
        if (b.ocorrencias !== a.ocorrencias) return a.ocorrencias - b.ocorrencias;
        if (a.autoReferencia !== b.autoReferencia) return;
        return a.caminho.localeCompare(b.caminho); // Desempata por ordem alfabética
    });

    // Variável para armazenar os resultados formatados para exibição
    console.log(`\nResultados da busca por "${termo}":`);
    let resultadosParaExibicao = resultados
        .filter(resultado => resultado.ocorrencias !== 0) // Filtra os resultados para mostrar apenas aqueles que têm ocorrências do termo
        .map(resultado => ({
            Página: resultado.caminho,
            Ocorrências: resultado.ocorrencias + ' * 5 = ' + resultado.ocorrencias * 5,
            'Links recebidos': resultado.referencia + ' * 10 = ' + resultado.referencia * 10,
            'Auto-Referência': resultado.autoReferencia + ' * -15 = ' + resultado.autoReferencia * -15,
            Pontos: resultado.pontuacao
        }));

    // Exibe os resultados em uma tabela no console
    if (resultadosParaExibicao.length > 0) {
        console.table(resultadosParaExibicao);
    } else {
        console.log("Nenhuma página encontrada com este termo ou pontuação relevante.");
    }

    // Retorna os dados brutos já calculados para o JSON, filtrando apenas os que têm relevância
    return resultados
        .filter(resultado => resultado.ocorrencias !== 0) // Filtra os resultados para mostrar apenas aqueles que têm ocorrências do termo
        .map(resultado => ({
            Páginas: resultado.caminho,
            Ocorrências: resultado.ocorrencias,
            Refências: resultado.referencia,
            AutoReferência: resultado.autoReferencia,
            Pontos: resultado.pontuacao
        }));
}