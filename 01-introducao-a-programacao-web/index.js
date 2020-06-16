const name = "Emanuel";

console.log(name);

// -------------------------------------

// Array de objetos
const classA = [
    {
        name: 'Emanuel',
        grade: 10
    },
    {
        name: 'Flávio',
        grade: 9.8
    },
    {
        name: 'Pedro',
        grade: 2
    },
    {
        name: 'Lucas',
        grade: 10
    }
];

const classB = [
    {
        name: 'Ana',
        grade: 5
    },
    {
        name: 'José',
        grade: 7
    },
    {
        name: 'Rafael',
        grade: 3
    }
];

function calculateAverage(students) {
    let sum = 0;

    for (let i = 0; i < students.length; i++) {
        sum += students[i].grade;
    }

    return sum / students.length;
}

function sendMessage(average, turma) {
    if (average > 5) {
        console.log(`The average of the class ${turma} is ${average}. Congratulations, the average is greather than 5!`);
    } else {
        console.log(`The average of the class ${turma} is less than 5! :(`);
    }
}

function markAsFlunked(student) {
    student.flunked = false;

    if (student.grade < 5) {
        student.flunked = true;
    }
}

function sendFlunkedMessage(student) {
    if (student.flunked) {
        console.log(`The student ${student.name} is flunked!`);
    }
}

function flunkedStudents(students) {
    for (let student of students) {
        markAsFlunked(student);
        sendFlunkedMessage(student);
    }
}

const averageA = calculateAverage(classA);
const averageB = calculateAverage(classB);

sendMessage(averageA, 'A');
sendMessage(averageB, 'B');

flunkedStudents(classA);
flunkedStudents(classB);

console.table(classA);
console.table(classB);

// -------------------------------------

const age = 17;

if (age > 18) {
    console.log('Let in');
} else {
    console.log('Block entry');
}

if (age === 17) {
    console.log("Come back when you're 18...");
}