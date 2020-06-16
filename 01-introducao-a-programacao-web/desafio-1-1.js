// Crie um programa para calcular o IMC e nível de obesidade de uma pessoa

const nome = 'Emanuel';
const peso = 70;
const altura = 1.65;
const sexo = 'Masculino';

const imc = peso / (altura * altura);

if (imc >= 30) {
    console.log(`${nome}, você está acima do peso.`);
} else {
    console.log(`${nome}, você não está acima do peso.`);
}

// Crie um programa para calcular a aposentadoria de uma pessoa

const nome2 = 'Antônio';
const sexo2 = 'M';
const idade = 65;
const contribuicao = 30

if (sexo2 == 'M') {
    if (contribuicao >= 35 && (idade + contribuicao) >= 95) {
        console.log(`${nome2}, você já pode se aposentar.`);
    } else {
        console.log(`${nome2}, você ainda não pode se aposentar.`);
    }
} else if (sexo2 == 'F') {
    if (contribuicao >= 30 && (idade + contribuicao) >= 85) {
        console.log(`${nome2}, você já pode se aposentar.`);
    } else {
        console.log(`${nome2}, você ainda não pode se aposentar.`);
    }
}