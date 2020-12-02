"use strict";

import Form from './form.js';
export default class PencilForm extends Form {
    constructor(form , bus) {
        super(form, bus);
        this.allPencilData = {};
        this.setupUi();
    }

    setupUi() {
        super.setupUi(`
            <div class="inputsDiv">
               <label>
                    <input type="text" name="strokeWidth" maxLength="6" value=1 />
                    <span>Thick</span>
                </label>

                 <label class="color">
                    <span>line Color</span>
                    <input type="color" name="lineColor"/>
                </label>
            </div>
        `);
        this.allPencilData.strokeWidth = this.form.querySelector('[name="strokeWidth"]');
        this.allPencilData.lineColor = this.form.querySelector('[name="lineColor"]');
        this.createEvents('pencil' , this.allPencilData , 1);
        this.unsubscribeUpdateProperties = this.bus.subscribe('updatePropertiesPencil',this.updatePropertiesPencil);
    }

    unsubscribePreFormFunctions() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesPencil = (pencil) => {
        this.allPencilData.strokeWidth.value = pencil.getAttributeNS(null, 'stroke-width');
    }
}