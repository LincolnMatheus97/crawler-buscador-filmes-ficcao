import fs from "fs";

export const saveJson = (dados) => {
  try {
    fs.writeFileSync("date.json", JSON.stringify(dados, null, 4));
    console.log("Dados salvos com sucesso!");
  } catch (err) {
    console.error(`Erro ao salvar o arquivo: ${err}`);
  }
};
