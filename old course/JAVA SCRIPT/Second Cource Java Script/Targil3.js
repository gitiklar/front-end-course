function log(msg) {
  p_log.innerHTML += msg + '<br />';
}

function Car(color, speed) {
  this.color = color;
  this.speed = (speed || 0);
}

Car.prototype.drive = function(speed) {
  this.speed = speed;
};

Car.prototype.isFasterThan = function(other) {
  return this.speed > other.speed;
};

var c1 = new Car('red');
var c2 = new Car('blue', 50);
var c3 = new Car('black');
let c4 = new Car('yellow',200);

class Race {
    constructor () {
        this.cars = [];
    }
    
    addCars (...arg) {
        arg.forEach((a)=>this.cars.push(a));
    }
    
    winner() {
        return this.cars.reduce((a,b)=>a.speed>b.speed?a:b);
    }
}

var race = new Race();
race.addCars(c1, c2, c3);

c1.drive(20);
c3.drive(100);

race.addCars(c4);

var winningCar = race.winner();
log('And the winner is: ' + winningCar.color);