"use strict";
class TextArea {
    constructor(divForPanelAndTextArea , bus , maxLength ) {
        this.divForPanelAndTextArea = divForPanelAndTextArea;
        this.bus = bus;
        this.maxLength = maxLength;
        this.setupUi();
        this.currentPanel = new CurrentLengthPanel(this.divForPanel, this.bus);
        this.bus.subscribe('panelClick',this.replacePanel);
    }

    setupUi() {
        this.divForPanelAndTextArea.innerHTML= `
            <div class = "${this.divForPanelAndTextArea.className}"></div>
            <textarea maxlength="${this.maxLength}" class="textArea"></textarea>
        `;
        this.divForPanel = this.divForPanelAndTextArea.querySelector(`.${this.divForPanelAndTextArea.className}`);
        this.textArea = this.divForPanelAndTextArea.querySelector(`.textArea`);
        this.textArea.addEventListener('input', ()=>{
        this.bus.emit('input', this.divForPanelAndTextArea.className);});
    }

    replacePanel = ()=> {
        if(event.target.parentElement) {
            if(event.target.parentElement.className === this.divForPanelAndTextArea.className) {
                if(this.currentPanel.constructor.name === "CurrentLengthPanel") {
                    this.currentPanel = new RemaningCharactersPanel(this.divForPanel, this.bus);
                    this.bus.emit('load', this.divForPanelAndTextArea.className);
            }
            else {
                this.currentPanel = new CurrentLengthPanel(this.divForPanel, this.bus);
                this.bus.emit('load', this.divForPanelAndTextArea.className);
            }
           }
        }
    }
}