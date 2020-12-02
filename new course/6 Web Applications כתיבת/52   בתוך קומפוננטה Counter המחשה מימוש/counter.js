class Counter {
    constructor(el) {
        this.val = 0;
        el.innerHTML = `
            <button>Click To Inc</button>
            <p class = "log"></p>
        `;
        this.log = el.querySelector('.log');
        el.querySelector('button').addEventListener('click',this.inc);
    }
     
    inc = () => {
        this.val++;
        this.log.innerHTML = this.val;
    }
}

for(let i=0;i<10;i++) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const c1 = new Counter(div);
}
