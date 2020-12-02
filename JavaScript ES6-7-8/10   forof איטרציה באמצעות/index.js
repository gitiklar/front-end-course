const arr = [10 ,20 , 30, 40 , 60 , 50];

let results = 0;
for(let i=0; i<arr.length ; i++) {
    results+=arr[i];
}
console.log(results);

let results2 = 0;
arr.forEach((val , index)=>{
    results2+=val;
});
console.log(results2);

let results3 = 0;
for(let num of arr) {
    results3+=num;
}
console.log(results3);

const divs = document.querySelectorAll('div');
for(div of divs) {
    div.textContent = 'Ouch!';
}


console.log('generations:');

function *someNumbers() {
    yield 10;
    yield 20;
    yield 30;
    for(let i =0; i<2; i++) {
        yield 5;
    }
    yield 70;
}

for(let num of someNumbers()) {
    console.log(num);
}

g = someNumbers()
g.next()
//{value: 10, done: false}
g.next()
//{value: 20, done: false}
g.next()
//{value: 30, done: false}
g.next()
//{value: 5, done: false}
g.next()
//{value: 5, done: false}
g.next()
//{value: 70, done: false}
g.next()
//{value: undefined, done: true}
g.next()
//{value: undefined, done: true}
