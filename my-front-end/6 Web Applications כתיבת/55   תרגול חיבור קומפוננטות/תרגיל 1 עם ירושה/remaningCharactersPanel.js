"use strict";
class RemaningCharactersPanel extends Panel {
    constructor(divForPanel , bus) {
        super(divForPanel , bus);
        this.setUpUi();
    }

    setUpUi() {
        super.setUpUi(`<p class="${this.divForPanel.className}">Remaning characters panel : <span class="value"></span></p>`);
    }
    
    getValue () {
        return Number(this.divForPanel.nextElementSibling.getAttribute('maxlength')) - this.divForPanel.nextElementSibling.value.length;
    }
}