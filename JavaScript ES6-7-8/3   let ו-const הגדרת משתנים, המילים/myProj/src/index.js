var funcs = {};

function demo() {
    for(/*var*/let i=0;i<10;i++) {
        funcs[i] = function() {
            console.log(i);
        }
    }
}
demo();

const arr = Object.freeze([5,6,7]);

const arr2 = [5,6,7];

