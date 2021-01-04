class AutoBind {
    /*
    constructor() {
        this.inc = this.inc.bind(this);
    }
*/
    constructor() {
        const methodList = this.getMethods();
        this.autoBindMethods(methodList);
      }
    
      getMethods() {
        const childClassPrototype = this.constructor.prototype;
        // get all the names of the properties child class and filter the list
        // that it won't contain the constructor string value
        const childProperties = Object.getOwnPropertyNames(childClassPrototype)
        .filter(item => item !== 'constructor');
        // return all the method name list
        return childProperties;
      }
    
      autoBindMethods(methodList) {
        methodList.forEach(methodName => {
          this[methodName] = this[methodName].bind(this);
        });
      }
}

class Counter extends AutoBind {
    constructor(btn) {
      super();
      this.btn = btn;
      this.btn.textContent = '0';
      btn.addEventListener('click', this.inc);
    }
    
    inc() {
      this.btn.textContent++;
    }
  }
  
  const c = new Counter(document.querySelector('button'));