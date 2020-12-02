"use strict";
class CurrentLengthPanel {
    constructor(el , bus) {
        this.el = el;
        this.bus = bus;
        this.setUpUi();
        this.unsubscribeOnLoad = this.bus.subscribe('onload',this.updateValue);
        this.unsubscribeInput = this.bus.subscribe('input',this.updateValue);
    }

    setUpUi() {
        this.el.innerHTML = `
            <p class="panel">Current length panel : <span class="value">0</span></p>
        `;
        this.value = this.el.querySelector('.value');
        this.el.querySelector('.panel').addEventListener('click', this.emitPanelClick);
    }

    updateValue = (currentLength, maxLength, classForDivForTextArea)=> {
       if(this.el.parentElement.className === classForDivForTextArea) {
              this.value.textContent = currentLength;
       } 
    }

    emitPanelClick = ()=> {
        this.unsubscribeOnLoad();
        this.unsubscribeInput();
        this.bus.emit('panelClick');
    }
}