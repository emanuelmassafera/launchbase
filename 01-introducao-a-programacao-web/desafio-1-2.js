// Crie um programa que armazena dados da empresa Rocketseat dentro de um objeto chamado empresa

const empresa = {
    nome: 'Rocketseat',
    cor: 'Roxo',
    foco: 'Programação',
    endereco: {
        rua: 'Rua Guilherme Gembala',
        numero: 260
    }
};

console.log(`A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}.`);

// Crie um programa com um objeto para armazenar dados de um programador como nome, idade e tecnologias que trabalha

const programador = {
    nome: 'Emanuel',
    idade: 21,
    tecnologias: [
        {nome: 'JavaScript', especialidade: 'Web/Mobile'},
        {nome: 'C++', especialidade: 'Desktop'},
        {nome: 'Pyhton', especialidade: 'Data Science'}
    ]
};

console.log(`O programador ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}.`);