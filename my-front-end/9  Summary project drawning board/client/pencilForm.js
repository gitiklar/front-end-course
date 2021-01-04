"use strict";

import Form from './form.js';
import {bus} from './index.js';

export default class PencilForm extends Form {
    constructor() {
        super('Pencil');
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
        this.allPencilData['stroke-width'] = this.form.querySelector('[name="strokeWidth"]');
        this.allPencilData['stroke'] = this.form.querySelector('[name="lineColor"]');
        this.createEvents(this.allPencilData);
        this.unsubscribeUpdateProperties = bus.subscribe('updatePropertiesPencil',this.updatePropertiesPencil);
    }

    unsubscribeFunctionForPreFormBeforeNewForm() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesPencil = (pencil) => {
        this.allPencilData['stroke-width'].value = pencil.getAttributeNS(null, 'stroke-width');
    }
}