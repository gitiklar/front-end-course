function Summer() {
    this.sumNumbers = 0;
}

Summer.prototype.add = function(number) {
    this.sumNumbers+=number;
}

Summer.prototype.getCurrentSum = function() {
    return this.sumNumbers;
}

function log(num) {
    console.log(num);
}

const s1 = new Summer();
const s2 = new Summer();

s1.add(10);
s1.add(20);

s2.add(30);

s2.add(5);

// prints 30
log(s1.getCurrentSum());

// prints 35
log(s2.getCurrentSum());