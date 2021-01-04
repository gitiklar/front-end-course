"use strict";
class TextArea {
    constructor(el , bus , maxLength , classForDivForTextArea) {
        this.el = el;
        this.bus = bus;
        this.maxLength = maxLength;
        this.classForDivForTextArea = classForDivForTextArea;
        this.setupUi(el);
        this.currentPanel = new CurrentLengthPanel(this.divForPanel, this.bus , this.classForDivForTextArea);
        this.unsubscribeReplacePanel = this.bus.subscribe('panelClick',this.replacePanel);
    }

    setupUi() {
        this.el.innerHTML += `
            <div class = "divForPanel"></div>
            <textarea maxlength="${this.maxLength}" class="textArea"></textarea>
        `;
        this.divForPanel = this.el.querySelector(`.${this.classForDivForTextArea} .divForPanel`);
        this.textArea = this.el.querySelector(`.${this.classForDivForTextArea} .textArea`);
        this.textArea.addEventListener('input', ()=>{this.bus.emit('input', this.textArea.value.length, this.maxLength, this.classForDivForTextArea);});
    }

    replacePanel = ()=> {
       if(event.path[2].className === this.classForDivForTextArea) {
            if(this.currentPanel.constructor.name === "CurrentLengthPanel") {
                this.currentPanel = new RemaningCharactersPanel(this.divForPanel, this.bus , this.classForDivForTextArea);
                this.bus.emit('onload',this.textArea.value.length, this.maxLength,this.classForDivForTextArea)
        }
        else {
            this.currentPanel = new CurrentLengthPanel(this.divForPanel, this.bus, this.classForDivForTextArea);
            this.bus.emit('onload',this.textArea.value.length, this.maxLength,this.classForDivForTextArea)
        }
       }
    }
}