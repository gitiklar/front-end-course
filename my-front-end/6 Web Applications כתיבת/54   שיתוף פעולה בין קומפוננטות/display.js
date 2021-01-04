class Display {
    constructor(el, bus) {
        this.setUpUi(el);
        this.bus = bus;
        this.maxValue = 0;
        this.count = 0;
        this.unsubscribeValue = this.bus.subscribe('value',this.checkNewValue);
        this.updateMaxValue();
    }

    setUpUi(el) {
        el.innerHTML = `
            <p>And the maximum value is: <span class="maxValue"></span></p>
        `;
        this.span = el.querySelector('.maxValue');
    }

    checkNewValue = (newVal) => {
        this.count++;
        if( this.count >3) {
            this.unsubscribeValue();
        }
        if(newVal>this.maxValue) {
            this.maxValue = newVal;
            this.updateMaxValue();
        }
    }

    updateMaxValue() {
        this.span.textContent = this.maxValue;
    }
}
































/*
class Display {
    constructor(el) {
        this.setupUi(el);
    }
     
    setupUi(el) {
        el.innerHTML = `
            <p>And the maximum value is: <span class="maxvalue"></span></p>
        `;
        this.panel = el.querySelector('.maxvalue');
    }
}

*/