"use strict";
class RemaningCharactersPanel {
    constructor(el , bus) {
        this.el = el;
        this.bus = bus;
        this.setUpUi(el);
        this.unsubscribeOnLoad = this.bus.subscribe('onload',this.updateValue);
        this.unsubscribeInput = this.bus.subscribe('input',this.updateValue);
    }

    setUpUi(el) {
        el.innerHTML = `
            <p class="panel">Remaning characters panel : <span class="value"></span></p>
        `;
        this.value = el.querySelector('.value');
        el.querySelector('p').addEventListener('click',this.emitClick);
    }

    updateValue = (currentLength, maxLength , classForDivForTextArea)=> {
         if(this.el.parentElement.className === classForDivForTextArea) {
            this.value.textContent = maxLength - currentLength;
       } 
    }
    
    emitClick = () => {
        this.unsubscribeOnLoad();
        this.unsubscribeInput();
        this.bus.emit('panelClick');
    }
}