// Crie um programa que armazena um array de usuários (objetos), cada usuário tem um nome e suas tecnologias

const usuarios = [
    {
        nome: 'Emanuel',
        tecnologias: ['JavaScript', 'Html', 'CSS']
    },
    {
        nome: 'Pedro',
        tecnologias: ['Java', 'SQL']
    },
    {
        nome: 'Thiago',
        tecnologias: ['Python', 'C', 'C++']
    }
];

for (let i = 0; i < usuarios.length; i++) {
    console.log(`${usuarios[i].nome} trabalha com ${usuarios[i].tecnologias.join(', ')}.`)
}

// Crie uma função que recebe os dados de um objeto de usuário e retorna SE o usuário trabalha com CSS ou não. Essa função deve retornar um boolean true/false

function checaCSS(usuario) {
    for (let i = 0; i < usuario.tecnologias.length; i++) {
        if (usuario.tecnologias[i] === 'CSS') {
            return true;
        }
    }

    return false;
}

for (let i = 0; i < usuarios.length; i++) {
    if (checaCSS(usuarios[i])) {
        console.log(`O usuário ${usuarios[i].nome} trabalha com CSS.`);
    }
}

// Crie um programa que calcula a soma de receitas e despesas de pessoas e no fim retorna o saldo

const pessoas = [
    {
        nome: "Salvio",
        receitas: [115.3, 48.7, 98.3, 14.5],
        despesas: [85.3, 13.5, 19.9]
    },
    {
        nome: "Marcio",
        receitas: [24.6, 214.3, 45.3],
        despesas: [185.3, 12.1, 120.0]
    },
    {
        nome: "Lucia",
        receitas: [9.8, 120.3, 340.2, 45.3],
        despesas: [450.2, 29.9]
    }
]

function somaNumeros(array) {
    let soma = 0;

    for (let i = 0; i < array.length; i++) {
        soma += array[i];
    }

    return soma;
}

function calculaSaldo(receitas, despesas) {
    return somaNumeros(receitas) - somaNumeros(despesas);
}

for (let i = 0; i < pessoas.length; i++) {
    let saldo = calculaSaldo(pessoas[i].receitas, pessoas[i].despesas);

    if (saldo > 0) {
        console.log(`${pessoas[i].nome} tem um saldo POSITIVO de ${saldo.toFixed(2)}.`)
    } else {
        console.log(`${pessoas[i].nome} tem um saldo NEGATIVO de ${saldo.toFixed(2)}.`)
    }
}