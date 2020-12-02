
//ES5
/*
function Cat() {
    Anymal.call(this);
    this.color = 'white';
    this.food = 'mouse';
}

Cat.prototype = Object.create(Anymal.prototype);

Cat.prototype.go = function(speed) {
    this.speed = speed;
}

Cat.prototype.birthday = function() {
    this.age++;
}
*/

//ES6
class Cat extends Anymal{
    constructor() {
        super();
        this.color = 'white';
        this.food = 'mouse';
    }
    
    go(speed) {
        this.speed = speed;
    }

    birthday() {
        this.age++;
    }
}

cat1 = new Cat();
cat1.go(20);
cat2 = new Cat();
cat2.go(50);


if(cat1.isFasterThan(cat2)) {
    console.log(`cat1 is faster`);
}
else {
    console.log(`cat2 is faster`);
}

cat1.birthday();
cat1.birthday();
cat1.birthday();
cat1.birthday();

cat2.birthday();
cat2.birthday();
cat2.birthday();

if(cat1.isBiggerThan(cat2)) {
    console.log(`cat1 is Bigger`);
}
else {
    console.log(`cat2 is Bigger`);
}
