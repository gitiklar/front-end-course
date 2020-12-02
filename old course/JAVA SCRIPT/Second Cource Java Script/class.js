console.clear();


//Short
class Car {
    constructor(color, fill) {
        this.color=color;
        this.speed=0;
        this.fill=fill;
    }
    
    drive(speed) {
        this.speed = speed;
    }
    
    isFasterThan(other) {
        return this.speed> other.speed;
    }
}


//Long
/*

function Car(color) {
    this.color = color;
    this.speed = 0;
}

Car.prototype.drive = function(speed) {
    this.speed = speed;
};

Car.prototype.isFasterThan = function (other) {
    return this.speed>other.speed;
};
*/




const c1 = new Car('red','aa');
const c2 = new Car('red','bb');

c1.drive(30);
c2.drive(20);

if (c1.isFasterThan(c2)) {
    console.log(c1.speed);
}





class Card {
    constructor(color, shape, fill, amount) {
        this.color = color;
        this.shape = shape;
        this.fill = fill;
        this.amount = amount;
    }
    
    isTheSameColor(other) {
        return this.color===other.color;
    }
    
    isTheSameShape(other) {
        return this.shape===other.shape;
    }
    
    isTheSameFill(other) {
        return this.fill===other.fill;
    }
    
    isTheSameAmount(other) {
        return this.amount===other.amount;
    }    
}

const card1 = new Card('red','squre','empty',3);
const card2 = new Card('blue','squre','empty',2);


console.log(card1.color);

console.log(card1.isTheSameColor(card2));
console.log(card1.isTheSameShape(card2));
console.log(card1.isTheSameFill(card2));
console.log(card1.isTheSameAmount(card2));


























