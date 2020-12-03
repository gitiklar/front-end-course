function Person(name) {
    this.name = name;
}

Person.prototype.hello = function() {
    console.log(`Hello ${this.name}`);
    setTimeout(()=>console.log(`Hello ${this.name}`), 500);
}

const p = new Person('Giti');
p.hello();

const f = (x)=>x*x;
//const f = (x)=>{return x*x};
