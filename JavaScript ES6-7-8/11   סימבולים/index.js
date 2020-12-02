class MyStuff {
    [Symbol.toPrimitive] (hint) {
        if(hint === 'number') {
            return 4;
        } else if(hint === 'string'){
            return 'stuff programmers have';
        } else {
            return 7;
        }
    }

    *[Symbol.iterator]() {
        yield 'coffee';
        yield 'laptop';
        yield 'keyboard';
        yield 'cool hat';
    }
}

const stuff = new MyStuff();

for(let item of stuff) {
    console.log(item);
}



class Car {
    constructor(speed) {
        this.speed = speed;
    }

    [Symbol.toPrimitive](hint) {
        if(hint === 'number') {
            return this.speed;
        } else if(hint === 'string') {
            return `this speed is: ${this.speed}`;
        } else {
            return this.speed;
        }
    }

    *[Symbol.iterator]() {
        yield this.speed;
        yield this.speed+1;
        yield this.speed+2;
    }
}

const c1 = new Car(50);
const c2 = new Car(70);

for (let item of c1) {
    console.log(item);
}

// alerts: "I am a car driving at 20 km/h";
alert(c1);

// prints: 70 to the console
console.log(c1 + c2);

// fastest is now 50
const fastest = Math.max(c1, c2);
console.log(fastest);