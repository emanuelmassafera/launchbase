// Crie um programa para realizar operações bancárias na conta de um usuário

const user = {
    name: 'Julia',
    transactions: [],
    balance: 0
};

function createTransaction(transaction) {
    user.transactions.push(transaction);
    
    if (transaction.type == 'credit') {
        user.balance += transaction.value;
    } else if (transaction.type == 'debit') {
        user.balance -= transaction.value;
    }
}

function getHigherTransactionByType(type) {
    let max = 0;
    let index = -1;

    for (let i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].type == type && user.transactions[i].value > max) {
            max = user.transactions[i].value
            index = i;
        }
    }

    if (index != -1) {
        return user.transactions[index];
    } else {
        console.log('There is no transaction with this type.')
    }
}

function getAverageTransactionValue() {
    let sum = 0;

    for (let transaction of user.transactions) {
        sum += transaction.value;
    }

    return sum / user.transactions.length;
}

function getTransactionsCount() {
    let credit = 0;
    let debit = 0;

    for (let transaction of user.transactions) {
        if (transaction.type == 'credit') {
            credit += 1;
        } else if (transaction.type == 'debit') {
            debit += 1;
        }
    }

    let ans = {
        credit: credit,
        debit: debit
    }

    return ans;
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(user.balance);

console.log(getHigherTransactionByType("credit"));
console.log(getHigherTransactionByType("debit")); 

console.log(getAverageTransactionValue());

console.log(getTransactionsCount());