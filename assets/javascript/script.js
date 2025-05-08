
const inputPesquisar = document.getElementById('input-buscador');
const icone = document.getElementById('icone-pesquisa');


let modoCloseAtivo = false;

inputPesquisar.addEventListener('focus', () => {
    
    icone.style.backgroundImage = 'url(/assets/css/imgs/close.png)';
    modoCloseAtivo = true;
})



inputPesquisar.addEventListener('click', () => {
    if(modoCloseAtivo && inputPesquisar.value !== ''){
        inputPesquisar.value = '';

        icone.style.backgroundImage = 'url(/assets/css/imgs/search3.png)';
        modoCloseAtivo = false;
    }
})


inputPesquisar.addEventListener('blur',() => {
    if (inputPesquisar.value.trim() === '') {
        icone.style.backgroundImage = "url('/assets/css/imgs/search3.png')"
        modoCloseAtivo = false
    }
})