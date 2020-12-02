"use strict";
class CurrentLengthPanel extends Panel {
    constructor(divForPanel , bus) {
        super(divForPanel , bus);
        this.setUpUi();
    }

    setUpUi() {
        super.setUpUi(`<p class="panel">Current length panel : <span class="value">0</span></p>`);
    }

    getValue() {
        return this.divForPanel.nextElementSibling.value.length;
    }
}