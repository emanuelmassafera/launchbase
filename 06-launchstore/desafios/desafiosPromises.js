function double(number) {

    return new Promise(function(resolve, reject) {

        setTimeout(resolve, Math.floor(Math.random() * 100));
    }).then(function() {
        console.log(number * 2);
    });    
}

async function getDoubles() {
    const a = await double(1);
    const b = await double(2);
    const c = await double(3);
    const d = await double(4);
    const e = await double(5);
}

//getDoubles();


function doubleAndSum(number, sum) {

    return new Promise(function (resolve, reject) {

        setTimeout(resolve, Math.floor(Math.random() * 100));
    }).then(function() {
        return number*2 + sum;
    })
}

async function getDoublesAndSums() {
    let a = await doubleAndSum(1,1);
    console.log(a); // 3

    a = await doubleAndSum(1,a);
    console.log(a); // 5

    a = await doubleAndSum(1,a);
    console.log(a); // 7

    a = await doubleAndSum(1,a);
    console.log(a); // 9
}

getDoublesAndSums();