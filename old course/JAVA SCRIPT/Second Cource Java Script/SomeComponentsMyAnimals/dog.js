//ES5
/*
function Dog() {
    Anymal.call(this);
    this.color = 'brown';
    this.food = 'cat';
}

Dog.prototype = Object.create(Anymal.prototype);

Dog.prototype.go = function(speed) {
    this.speed = speed;
}

Dog.prototype.birthday = function() {
    this.age++;
}
*/

//ES6
class Dog extends Anymal{
    constructor() {
        super();
        this.color = 'brown';
        this.food = 'cat';
    }
    
    go(speed) {
        this.speed = speed;
    }
    
    birthday() {
        this.age++;
    }
}

dog1 = new Dog();
dog1.go(50);
dog2 = new Dog();
dog2.go(20);


if(dog1.isFasterThan(dog2)) {
    console.log(`dog1 is faster`);
}
else {
    console.log(`dog2 is faster`);
}

dog1.birthday();
dog1.birthday();
dog1.birthday();

dog2.birthday();
dog2.birthday();
dog2.birthday();
dog2.birthday();

if(dog1.isBiggerThan(dog2)) {
    console.log(`dog1 is Bigger`);
}
else {
    console.log(`dog2 is Bigger`);
}
