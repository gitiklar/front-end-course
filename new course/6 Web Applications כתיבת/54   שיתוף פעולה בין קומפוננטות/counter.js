class Counter {
  constructor(el, bus) {
      this.val = 0
      this.setUpUi(el);
      this.bus = bus;
  }

  setUpUi(el) {
      el.innerHTML = `
          <button>Click to inc</button>
          <p class="count"></p>
      `;
      this.button = 
      el.querySelector('button').addEventListener('click',this.inc);
      this.count = el.querySelector('.count');
      this.updateUi();
  }

  inc = ()=> {
      this.val++;
      this.bus.activate('value',this.val);
      this.updateUi();
  }

  updateUi() {
      this.count.textContent = this.val;
  }
}