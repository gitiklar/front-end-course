function log(msg) {
    p_log.innerHTML+=msg+'<br/>'
}

//Long
/*
function Person (name) {
    this.name = name;
    this.age = 1;
}

Person.prototype.hello = function() {
    log(`My name is ${this.name} and I am ${this.age} years old`);
}

Person.prototype.growUp = function () {
    this.age++;
}
*/

//Short

class Person {
    constructor(name) {
        this.name = name;
        this.age = 1;
    }
    
    hello() {
        log(`My name is ${this.name} and I am ${this.age} years old`);
    }
    
    growUp() {
        this.age++;
    }
}


const p1 = new Person('Mike');
const p2 = new Person('Jim');

p1.hello();

p1.growUp();

p1.hello();

p2.hello();