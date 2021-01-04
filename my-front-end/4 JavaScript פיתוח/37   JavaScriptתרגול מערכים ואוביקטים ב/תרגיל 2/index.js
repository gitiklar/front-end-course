"use strict";

function Car(name,color,speed) {
    this.name = name;
    this.color = color;
    this.speed = speed;
}

Car.prototype.speedUpdate = function(speed) {
    this.speed = speed;
}

function getFastestCar(cars) {
    return cars.reduce((accumulator,currentCar)=>{
        return accumulator.speed>currentCar.speed? accumulator:currentCar;
    })
}

const cars = [new Car('c1' , 'red' , 40),
            new Car('c2' , 'blue' , 50),
            new Car('c3' , 'green' , 70),
            new Car('b1' , 'yellow' , 100),
            new Car('b2' , 'red' , 120),
            new Car('b3' , 'blue' , 30),
            new Car('a1' , 'green' , 68),
            new Car('a2' , 'yellow' , 75),
            new Car('a3' , 'red' , 89),
            new Car('d1' , 'blue' , 37),
            new Car('d2' , 'green' , 18),
            new Car('d3' , 'yellow' , 90),
];

cars.splice(4,1);
cars.push(new Car('w1' , 'orang' , 105));
console.log((getFastestCar(cars)).name);