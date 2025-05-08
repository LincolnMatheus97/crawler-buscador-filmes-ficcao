document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const termo = document.getElementById('input-buscador').value.trim();

    if (!termo) {
        return;
    }

    try {
        const response = await fetch(`/buscar?inputBuscador=${encodeURIComponent(termo)}`);
        const data = await response.json();

        if (data.resultados && data.resultados.length > 0) {
            data.resultados.forEach(result => {
                console.log(result);
            });
        } else {
            console.log(`Nenhum resultado encontrado para "${data.termo}".`);
        }
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
});

document.getElementById('save-json').addEventListener('click', async function () {
    try {
        const response = await fetch('/salvar-json', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            console.log('Dados salvos com sucesso!');
        } else {
            console.log('Falha ao salvar os dados.');
        }
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
    }
});