//ES5
/*
function Anymal () {
    this.speed = 0;
    this.age = 0;
}

Anymal.prototype.isFasterThan = function (otherAnymal) {
    return this.speed > otherAnymal.speed;
};

Anymal.prototype.isBiggerThan = function (otherAnymal) {
    return this.age > otherAnymal.age;
}
*/

//ES6
class Anymal {
    constructor() {
        this.speed = 0;
        this.age = 0
    }
    
    isFasterThan(otherAnymal) {
            return this.speed > otherAnymal.speed;
    }
    
    isBiggerThan(otherAnymal) {
        return this.age > otherAnymal.age;
    }
}