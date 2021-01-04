class Form {
    constructor(el, bus) {
        this.el = el;
        this.bus = bus;
        this.setupUi();
    }

    setupUi() {
        this.el.innerHTML = `
            <label>Task:
            <input class ="text" type="text">
            </label>
            <button>Add to tasks</button>
        `;
        this.input = this.el.querySelector('input');
        this.el.addEventListener('submit',()=> {
            event.preventDefault();
            if(this.input.value) {
                this.bus.emit('submit', this.input.value);
                this.input.value = '';
            }
        });
    }
}