import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { crawler, sitesVisitados } from './crawler.js';
import { contarReferencias, buscarTermo } from './search.js';
import { saveJson } from './saveJson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

let paginaInicial = 'pages/blade_runner.html';
let pastaBase = __dirname;

console.log('Iniciando o crawling...');
crawler(paginaInicial, pastaBase);
console.log("\nCrawling concluído. Páginas visitadas:", sitesVisitados.size);

console.log("\nContando referências...");
let referencias = contarReferencias();

let buscasRealizadas = {};

app.get('/buscar', (req, res) => {
    const termo = req.query.inputBuscador?.trim().toLowerCase();

    if (!termo) {
        return res.json({ termo, resultados: [] });
    }

    const resultadosDaBusca = buscarTermo(termo);

    buscasRealizadas[termo] = resultadosDaBusca.length > 0
        ? resultadosDaBusca
        : [`Nenhum resultado encontrado para "${termo}".`];

    console.log(`Busca realizada: ${termo}`);

    res.json({
        termo,
        resultados: buscasRealizadas[termo]
    });
});

app.post('/salvar-json', (req, res) => {
    console.log("Recebida requisição para salvar JSON.");
    try {
        const dados = {
            paginasVisitadas: Array.from(sitesVisitados),
            referencias,
            buscas: buscasRealizadas
        };
        saveJson(dados);
        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao salvar os dados:', err);
        res.json({ success: false });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
