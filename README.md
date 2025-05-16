# 📘 Documentação Técnica – Projeto: Crawler e Buscador de Páginas HTML

Crawler e motor de busca simples para páginas HTML sobre filmes de ficção científica. Projeto acadêmico que simula o funcionamento de um buscador com critérios de ranqueamento baseados em autoridade de links, ocorrência de palavras-chave e penalização por autoreferência.

---

## 👨‍💻 Integrantes

- **Lincoln Matheus**  
- **Lucas Morais**  
- **Natiele Graziely**  
- **Thalisson Moura**

---

## 📂 Estrutura do Projeto

- `pages/` – Contém as 5 páginas HTML com links entre si.
- `crawler.js` – Script para varredura das páginas e extração dos links e conteúdo.
- `search.js` – Implementação do motor de busca com critérios de ranqueamento.
- `results/` – Dados processados e salvos localmente.
- `index.html` – Interface simples para realizar buscas e visualizar resultados.
- `assets/` – Contém arquivos estáticos da interface (CSS, JS e imagens).
- `node_modules/` – Pasta gerada automaticamente com as dependências instaladas via `npm`.
- `server.js` – Script do servidor local usando Express.
- `package.json` – Arquivo de configuração do projeto Node.js (dependências e scripts).
---

## 🔗 Mapeamento de Links Entre Páginas

| Página               | Links Recebidos de                                    | Qtd. |
| -------------------- | ----------------------------------------------------- | ---- |
| `blade_runner.html`  | Blade Runner (auto), Interestelar, Matrix, Mochileiro | 4    |
| `duna.html`          | Matrix                                                | 1    |
| `matrix.html`        | Blade Runner, Interestelar, Mochileiro                | 3    |
| `interestellar.html` | Blade Runner, Duna, Matrix, Mochileiro                | 4    |
| `mochileiro.html`    | Blade Runner, Duna, Matrix                            | 3    |

---

## ⚙️ Funcionamento do Crawler

1. Inicia por uma página de entrada
2. Baixa e analisa o conteúdo da página
3. Extrai links para outras páginas
4. Continua o processo recursivamente, evitando repetições
5. Salva os dados em memória ou arquivo

## 📊 Critérios de Ranqueamento

O sistema de busca ranqueia os resultados com base nos seguintes critérios:

| Critério                       | Pontuação                 |
| ------------------------------ | ------------------------- |
| 🔗 Link recebido               | +10 pontos por link       |
| 🔍 Ocorrência do termo buscado | +10 pontos por ocorrência |
| ⚠️ Autorreferência             | -15 pontos                |

---

## 📦 Bibliotecas Utilizadas

A seguir, as principais bibliotecas e módulos usados no projeto:

- **[Axios](https://www.npmjs.com/package/axios)**  
  Usada para realizar requisições HTTP. Mesmo com páginas locais, o Axios pode simular o comportamento de uma requisição à web, útil para estrutura modular e escalável.

- **[Cheerio](https://www.npmjs.com/package/cheerio)**  
  Biblioteca que permite manipular e extrair dados de documentos HTML de forma semelhante ao jQuery. Essencial para identificar links e trechos de texto durante o crawling.

- **[Express](https://www.npmjs.com/package/express)**  
  Framework para Node.js que facilita a criação de servidores web. Foi utilizado para rodar o servidor local e servir a interface web de busca ao usuário.

- **[fs (File System)](https://nodejs.org/api/fs.html)**  
  Módulo nativo do Node.js para leitura e escrita de arquivos no sistema. Usado para salvar e acessar os dados extraídos das páginas HTML, como os resultados do crawler.

- **[Node.js (Core)](https://nodejs.org/)**  
  Ambiente de execução JavaScript no servidor. Toda a lógica do crawler, do motor de busca e do servidor Express foi implementada em Node.js.


### ⚖️ Critérios de Desempate

Caso duas ou mais páginas obtenham a mesma pontuação total, a ordenação dos resultados será determinada pelos seguintes critérios, nesta ordem:

1. ✅ **Maior número de links recebidos**
2. 🔎 **Maior número de ocorrências do termo buscado**
3. 🚫 **Ausência de autoreferência**

---

## 🧮 Exemplo de Cálculo de Ranqueamento

Suponha uma busca pelo termo **"Matrix"**. A página `blade_runner.html` possui as seguintes características:

- Recebeu **4 links** de outras páginas
- Possui **1 ocorrência** do termo "Matrix" no conteúdo
- Possui **autorreferência** (um link apontando para ela mesma)

### 📝 Cálculo:

| Critério               | Detalhes                 | Pontuação     |
| ---------------------- | ------------------------ | ------------- |
| 🔗 Links recebidos     | 4 links × 10 pontos      | +40 pontos    |
| 🔍 Ocorrência do termo | 1 ocorrência × 10 pontos | +10 pontos    |
| ⚠️ Autorreferência     | Penalização              | -15 pontos    |
| **🎯 Total**           |                          | **35 pontos** |

---

Outro exemplo: `matrix.html`

- Recebeu **3 links**
- Possui **3 ocorrências** do termo
- **Não possui** autoreferência

### 📝 Cálculo:

| Critério               | Detalhes | Pontuação     |
| ---------------------- | -------- | ------------- |
| 🔗 Links recebidos     | 3 × 10   | +30 pontos    |
| 🔍 Ocorrência do termo | 3 × 10   | +30 pontos    |
| ⚠️ Autorreferência     | Nenhuma  | 0 pontos      |
| **🎯 Total**           |          | **60 pontos** |

> ⚠️ **Observação:**  
> Embora o processamento de coleta (crawler) e indexação ainda seja feito via **scripts Node.js** executados pelo terminal, esta versão do projeto **inclui uma interface web funcional**, permitindo que as buscas sejam realizadas diretamente pelo navegador.  
> Os resultados da busca são exibidos de forma dinâmica na interface web, tornando a experiência mais intuitiva e acessível ao usuário.

### Passos para rodar o projeto:

1. Instale as dependências do projeto:

```
npm install
```

2. Instale o Axios (para fazer requisições HTTP):

```
npm install axios
```

3. Instale o Cheerio (para manipulação do HTML):

```
npm install cheerio
```

4. Insatle o Express(Para rodar o servidor local):

```
npm install express
```

5. Rodar o servidor local com o comando node:

```
node server.js
```

6. Acesse pelo navegador:

```
http://localhost:3000
```

## 🎥 Demonstração do Projeto

Confira a demonstração do funcionamento do nosso crawler e motor de busca no vídeo produzido por um dos integrantes do grupo:

[![Demonstração do Projeto](https://img.youtube.com/vi/mQsCs9Qo3HE/0.jpg)](https://youtu.be/mQsCs9Qo3HE)
