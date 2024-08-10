document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const txtAlerta = document.getElementById('texto-de-alerta');
    const botao1 = document.getElementById('botao1');
    const botao2 = document.getElementById('botao2');
    const botaoLimpar = document.getElementById('botao__limpar');
    const specialCharacters = /[À-ÿA-Z]/g;

    desativarBotoes();
    botaoLimpar.classList.add('button__escondido');
    inputField.addEventListener('input', verificadorEntrada);

    function verificadorEntrada() {
        const valorEntrada = inputField.value;

        if (specialCharacters.test(valorEntrada)) {
            txtAlerta.classList.add('texto_alerta');
            desativarBotoes();
            botaoLimpar.classList.remove('button__escondido');
        } else if (valorEntrada === '') {
            desativarBotoes();
            botaoLimpar.classList.add('button__escondido');
        } else {
            txtAlerta.classList.remove('texto_alerta');
            ativarBotoes();
            botaoLimpar.classList.remove('button__escondido');
        }
    }

    function ativarBotoes() {
        //botao1.disabled = false;
        //botao2.disabled = false;
        botao1.classList.remove('button__desativado');
        botao2.classList.remove('button__desativado');
    }

    function desativarBotoes() {
        //botao1.disabled = true;
        //botao2.disabled = true;
        botao1.classList.add('button__desativado');
        botao2.classList.add('button__desativado');
    }

    // Função para limpar o campo de entrada
    function limparEntrada() {
        inputField.value = "";
        verificadorEntrada();
    }

    // Função para colar texto do clipboard
    function colarClipboard() {
        navigator.clipboard.readText().then((clipText) => {
            inputField.value = clipText;
            verificadorEntrada();
        });
    }

    function normalizarEntrada() {
        inputField.value = inputField.value
            .normalize('NFD')              // Normaliza para forma decompositiva
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .toLowerCase();               // Converte para minúsculas
        verificadorEntrada();
    }

    function redirecionar(func_tipo) {
        localStorage.setItem('text', inputField.value);
        localStorage.setItem('acionamento', func_tipo);
        window.location.href = 'result.html';
    };

    // Expondo funções globalmente se necessário
    window.limparEntrada = limparEntrada;
    window.colarClipboard = colarClipboard;
    window.normalizarEntrada = normalizarEntrada;
    window.redirecionar = redirecionar;
});

