# 📘 Documentação Técnica – Projeto: Crawler e Buscador de Páginas HTML


Crawler e motor de busca simples para páginas HTML sobre filmes de ficção científica. Projeto acadêmico que simula o funcionamento de um buscador com critérios de ranqueamento baseados em autoridade de links, ocorrência de palavras-chave e penalização por autoreferência.

---

## 📂 Estrutura do Projeto

- `pages/` – Contém as 5 páginas HTML com links entre si.
- `crawler.js` – Script para varredura das páginas e extração dos links e conteúdo.
- `search.js` – Implementação do motor de busca com critérios de ranqueamento.
- `results/` – Dados processados e salvos localmente.
- `index.html` – Interface simples para realizar buscas e visualizar resultados.

---

## 🔗 Mapeamento de Links Entre Páginas

| Página               | Links Recebidos de                      | Qtd. |
|----------------------|------------------------------------------|------|
| `blade_runner.html`  | Blade Runner (auto), Interestelar, Matrix, Mochileiro | 4 |
| `duna.html`          | Matrix                                  | 1 |
| `matrix.html`        | Blade Runner, Interestelar, Mochileiro   | 3 |
| `interestellar.html` | Blade Runner, Duna, Matrix, Mochileiro   | 4 |
| `mochileiro.html`    | Blade Runner, Duna, Matrix               | 3 |

---

## ⚙️ Funcionamento do Crawler

1. Inicia por uma página de entrada
2. Baixa e analisa o conteúdo da página
3. Extrai links para outras páginas
4. Continua o processo recursivamente, evitando repetições
5. Salva os dados em memória ou arquivo

## 📊 Critérios de Ranqueamento

O sistema de busca ranqueia os resultados com base nos seguintes critérios:

| Critério                         | Pontuação                  |
|----------------------------------|----------------------------|
| 🔗 Link recebido                 | +10 pontos por link       |
| 🔍 Ocorrência do termo buscado   | +10 pontos por ocorrência |
| ⚠️ Autorreferência               | -15 pontos                |

---

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

| Critério               | Detalhes                         | Pontuação         |
|------------------------|----------------------------------|-------------------|
| 🔗 Links recebidos     | 4 links × 10 pontos              | +40 pontos        |
| 🔍 Ocorrência do termo | 1 ocorrência × 10 pontos         | +10 pontos        |
| ⚠️ Autorreferência     | Penalização                      | -15 pontos        |
| **🎯 Total**           |                                  | **35 pontos**     |

---

Outro exemplo: `matrix.html`

- Recebeu **3 links**
- Possui **3 ocorrências** do termo
- **Não possui** autoreferência

### 📝 Cálculo:

| Critério               | Detalhes                         | Pontuação         |
|------------------------|----------------------------------|-------------------|
| 🔗 Links recebidos     | 3 × 10                           | +30 pontos        |
| 🔍 Ocorrência do termo | 3 × 10                           | +30 pontos        |
| ⚠️ Autorreferência     | Nenhuma                          | 0 pontos          |
| **🎯 Total**           |                                  | **60 pontos**     |

> ⚠️ **Observação:**  
> Todo o processo de coleta (crawler) e busca (search) é realizado via **terminal**, utilizando scripts Node.js. Os comandos devem ser executados na linha de comando após a instalação das dependências com `npm install`.  
> É possível estender o projeto para uma interface web, mas esta versão foi projetada para ser usada via **CLI (Command Line Interface)**.
