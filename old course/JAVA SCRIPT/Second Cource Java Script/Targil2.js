function log (msg) {
    p_log.innerHTML +=msg +'<br/>';
}
//Long
/*
function Summer() {
    this.sum = 0;
}

Summer.prototype.add = function(num) {
    this.sum+=num;
}

Summer.prototype.getCurrentSum = function() {
    return this.sum;
}
*/

//Short

class Summer {
    constructor() {
        this.sum = 0;
    }
    
    add(num) {
        this.sum+=num;
    }
    
    getCurrentSum() {
        return this.sum;
    }
}

const s1 = new Summer();
const s2 = new Summer();

s1.add(10);
s1.add(20);
s2.add(30);
s2.add(5);

log(s1.getCurrentSum());

log(s2.getCurrentSum());