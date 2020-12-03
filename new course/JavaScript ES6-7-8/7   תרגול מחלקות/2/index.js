class Car {
    constructor(color , speed) {
        this.color = color;
        this.speed = speed;
    }
}


class Race {
    constructor(...cars) {
        this.cars = cars;
    }

    add(car) {
        this.cars.push(car);
    }

    getWinner() {
        const winnerCar = this.cars.reduce((car1 , car2)=>car1.speed>car2.speed? car1:car2);
        console.log(`And the winner is... ${winnerCar.color}`);
    }
}

const c1 = new Car('blue', 20);
const c2 = new Car('green', 30);
const c3 = new Car('red', 24);

const race = new Race(c1, c2);
race.add(c3);

// prints: And the winner is... green
console.log(race.getWinner());