// ES5
/*
function Vehicle() {
    this.speed = 0;
}

Vehicle.prototype.isFasterThan = function(other) {
    return this.speed > other.speed;
};

function Car(color) {
    Vehicle.call(this);
    this.color = color;
}

Car.prototype = Object.create(Vehicle.prototype);

Car.prototype.drive = function(speed) {
    this.speed = speed;
};

*/

//ES6

class Vehicle {
    constructor() {
        this.speed = 0;
    }
    
    isFasterThan(other) {
        return this.speed > other.speed;
    }
}

class Car extends Vehicle {
    constructor(color) {
        super();
        this.color = color;
    }
    
    drive(speed) {
        this.speed = speed;
    }
}

const c1 = new Car('red');
const c2 = new Car('blue');

c1.drive(50);
c2.drive(60);

if(c1.isFasterThan(c2)) {
    console.log('c1 is faster');
}
else {
    console.log('c2 is faster');
}