class TextArea {
    constructor(el, bus) {
        this.el = el;
        this.bus = bus;
        this.setupUi(); 
    }

    setupUi() {
        this.el.innerHTML= `
        <textarea rows="5"></textarea>
        `;
        this.textArea = this.el.querySelector('textarea');
        this.setSubscribeOrEmit();
    }

    setSubscribeOrEmit() {
        this.bus.subscribe('writeToTextArea', this.writeToTextArea);
        this.bus.subscribe('getValue', this.getValue);
        this.bus.subscribe('clear', this.clearTextArea);
    }

    getValue=() =>{
        this.bus.emit('saveValue', this.textArea.value);
        this.clearTextArea();
    }

    clearTextArea=()=> {
        this.textArea.value = '';
    }

    writeToTextArea = (data) =>{
        this.textArea.value = data;
    }
}