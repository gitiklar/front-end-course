
class Person {
    constructor(name) {
      this.name = name;
    }
  
    hello() {
      console.log('Hello: ' + this.name);
    }
  }

  class User extends Person {
    constructor(uid, name) {
      super(name);
      this.uid = uid;
    }
  
    hello() {
          // calls the original hello function
          super.hello();
          console.log('My user id is: ' + this.uid);
      }
  
    isAdmin() {
      return this.uid === 0;
    }
  }



  class Counter {
    constructor(btn , panel) {
      this.val = 0;
      this.panel = panel;
      btn.addEventListener('click', this.inc);
    }
  
    inc = ()=> {
      this.panel.textContent = ++this.val;
    }
  }

  const btn = document.querySelector('#inc');
  const panel = document.querySelector('.panel');
  const counter = new Counter(btn , panel);