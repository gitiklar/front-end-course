"use strict";

import Form from './form.js';
import {bus} from './index.js';

export default class SqureForm extends Form {
    constructor() {
        super('Squre');
        this.allSqureData = {};
        this.setupUi();
    }

    setupUi() {
        super.setupUi(`
            <div class="inputsDiv">
                <label>
                    <input type="text" name="startX" maxLength="6"/>
                    <span>Start X</span> 
                </label>
                
                <label>
                    <input type="text" name="startY" maxLength="6"/>
                    <span>Start Y</span>
                </label>
                
                <label>
                    <input type="text" name="width" maxLength="6"/>
                    <span>Width</span>
                </label>
                
                <label>
                    <input type="text" name="height" maxLength="6"/>
                    <span>Height</span>
                </label>

                <label>
                    <input type="text" name="strokeWidth" maxLength="6" value=1 />
                    <span>Thick</span>
                </label>
                
                <label class="color">
                    <span>line Color</span>
                    <input type="color" name="lineColor"/>
                </label>

                <label class="color">
                    <span>fill Color</span>
                    <input type="color" name="fillColor"/>
                </label>
            </div>
        `);
        this.allSqureData['x'] = this.form.querySelector('[name="startX"]');
        this.allSqureData['y'] = this.form.querySelector('[name="startY"]');
        this.allSqureData['width'] = this.form.querySelector('[name="width"]');
        this.allSqureData['height'] = this.form.querySelector('[name="height"]');
        this.allSqureData['stroke-width'] = this.form.querySelector('[name="strokeWidth"]');
        this.allSqureData['stroke'] = this.form.querySelector('[name="lineColor"]');
        this.allSqureData['fill'] = this.form.querySelector('[name="fillColor"]');
        this.allSqureData['fill'].previousElementSibling.style.color = 'black';
        this.createEvents(this.allSqureData);
        this.unsubscribeUpdateProperties = bus.subscribe('updatePropertiesSqure',this.updatePropertiesSqure);
    }

    unsubscribeFunctionForPreFormBeforeNewForm() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesSqure = (squre) => {
        this.allSqureData['x'].value = squre.getAttributeNS(null, 'x');
        this.allSqureData['y'].value = squre.getAttributeNS(null, 'y');
        this.allSqureData['width'].value = squre.getAttributeNS(null, 'width');
        this.allSqureData['height'].value = squre.getAttributeNS(null, 'height');
        this.allSqureData['stroke-width'].value = squre.getAttributeNS(null, 'stroke-width');
    }
}