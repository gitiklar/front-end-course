"use strict";

import Form from './form.js';
import {bus} from './index.js';

export default class CircleForm extends Form {
    constructor() {
        super('Circle');
        this.allCircleData = {};
        this.setupUi();
    }

    setupUi() {
        super.setupUi(`
            <div class="inputsDiv">
                <label>
                    <input type="text" name="centerX" maxLength="6"/>
                    <span>Center X</span> 
                </label>
                
                <label>
                    <input type="text" name="centerY" maxLength="6"/>
                    <span>Center Y</span>
                </label>
                
                <label>
                    <input type="text" name="radiusX" maxLength="6"/>
                    <span>Radius X</span>
                </label>
                
                <label>
                    <input type="text" name="radiusY" maxLength="6"/>
                    <span>Radius Y</span>
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
        this.allCircleData['cx'] = this.form.querySelector('[name="centerX"]');
        this.allCircleData['cy'] = this.form.querySelector('[name="centerY"]');
        this.allCircleData['rx'] = this.form.querySelector('[name="radiusX"]');
        this.allCircleData['ry'] = this.form.querySelector('[name="radiusY"]');
        this.allCircleData['stroke-width'] = this.form.querySelector('[name="strokeWidth"]');
        this.allCircleData['stroke'] = this.form.querySelector('[name="lineColor"]');
        this.allCircleData['fill'] = this.form.querySelector('[name="fillColor"]');
        this.allCircleData['fill'].previousElementSibling.style.color = 'black';
        this.createEvents(this.allCircleData);
        this.unsubscribeUpdateProperties = bus.subscribe('updatePropertiesCircle',this.updatePropertiesCircle);
    }

    unsubscribeFunctionForPreFormBeforeNewForm() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesCircle = (circle) => {
        this.allCircleData['cx'].value = circle.getAttributeNS(null, 'cx');
        this.allCircleData['cy'].value = circle.getAttributeNS(null, 'cy');
        this.allCircleData['rx'].value = circle.getAttributeNS(null, 'rx');
        this.allCircleData['ry'].value = circle.getAttributeNS(null, 'ry');
        this.allCircleData['stroke-width'].value = circle.getAttributeNS(null, 'stroke-width');
    }
}