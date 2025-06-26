const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let grupos = [];
    if (checkbox[0].checked) grupos.push(letrasMaiusculas);
    if (checkbox[1].checked) grupos.push(letrasMinusculas);
    if (checkbox[2].checked) grupos.push(numeros);
    if (checkbox[3].checked) grupos.push(simbolos);

    let alfabeto = grupos.join('');
    if (alfabeto.length === 0) {
        campoSenha.value = '';
        classificaSenha(0);
        desabilitaBotaoCopiar(true);
        return;
    }

    let senhaArray = [];
    // Garante pelo menos um caractere de cada grupo selecionado
    for (let grupo of grupos) {
        senhaArray.push(grupo[Math.floor(Math.random() * grupo.length)]);
    }
    // Preenche o restante da senha
    for (let i = senhaArray.length; i < tamanhoSenha; i++) {
        senhaArray.push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
    }
    // Embaralha a senha
    senhaArray = embaralhaArray(senhaArray);

    const senha = senhaArray.slice(0, tamanhoSenha).join('');
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
    desabilitaBotaoCopiar(!senha);
}

function embaralhaArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoAlfabeto > 0 ? tamanhoSenha * Math.log2(tamanhoAlfabeto) : 0;
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    if (tamanhoAlfabeto === 0) {
        valorEntropia.textContent = "Selecione pelo menos um tipo de caractere.";
    } else {
        valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
    }
}

function desabilitaBotaoCopiar(desabilitar) {
    const btnCopiar = document.getElementById('copiar-senha');
    if (btnCopiar) {
        btnCopiar.disabled = desabilitar;
        btnCopiar.setAttribute('aria-disabled', desabilitar ? 'true' : 'false');
        btnCopiar.classList.toggle('desabilitado', desabilitar);
    }
}
