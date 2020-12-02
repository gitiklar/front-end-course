const btns = document.querySelectorAll('.btn');
const p = document.querySelector('p');

function Counter(btn) {
    this.num=0;
    btn.addEventListener('click',this.inc.bind(this))
}

Counter.prototype.inc = function () {
  debugger;
    this.num++;
    p.textContent= p.innerHTML+' ' + this.num;
}

for(let i=0;i<btns.length;i++) {
    c = new Counter(btns[i]);
}












//Without p Long
/*
function Counter(btn) {
    this.val = 0;
    btn.addEventListener('click',this.inc.bind(this));
}

Counter.prototype.inc = function() {
    this.val++;
    console.log(this.val);
}
*/

//Without p Short
/*
class Counter {
    constructor(btn) {
        this.val=0;
        btn.addEventListener('click',this.inc.bind(this))
    }
    
    inc() {
        this.val++
        console.log(this.val);
    }
}

for(let i=0;i<btns.length;i++) {
    const c = new Counter(btns[i]);
}
*/


