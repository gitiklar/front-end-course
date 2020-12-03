const foo = 10;
const bar = 20;
const hello = ()=>{console.log('hello');};

const obj = {
    foo,
    bar,
    hello,
    [Math.random()]:'random number',
    [Math.min(2,5)]: '2 less than 5',
    bye() {
        console.log('bye bye');
    }
}