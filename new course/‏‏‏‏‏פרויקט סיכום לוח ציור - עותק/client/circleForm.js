"use strict";

import Form from './form.js';
export default class CircleForm extends Form {
    constructor(form , bus) {
        super(form, bus);
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
        this.allCircleData.centerX = this.form.querySelector('[name="centerX"]');
        this.allCircleData.centerY = this.form.querySelector('[name="centerY"]');
        this.allCircleData.rx = this.form.querySelector('[name="radiusX"]');
        this.allCircleData.ry = this.form.querySelector('[name="radiusY"]');
        this.allCircleData.strokeWidth = this.form.querySelector('[name="strokeWidth"]');
        this.allCircleData.lineColor = this.form.querySelector('[name="lineColor"]');
        this.allCircleData.fillColor = this.form.querySelector('[name="fillColor"]');
        this.allCircleData.fillColor.previousElementSibling.style.color = 'black';
        this.createEvents('circle' , this.allCircleData , 2);
        this.unsubscribeUpdateProperties = this.bus.subscribe('updatePropertiesCircle',this.updatePropertiesCircle);
    }

    unsubscribePreFormFunctions() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesCircle = (circle) => {
        this.allCircleData.centerX.value = circle.getAttributeNS(null, 'cx');
        this.allCircleData.centerY.value = circle.getAttributeNS(null, 'cy');
        this.allCircleData.rx.value = circle.getAttributeNS(null, 'rx');
        this.allCircleData.ry.value = circle.getAttributeNS(null, 'ry');
        this.allCircleData.strokeWidth.value = circle.getAttributeNS(null, 'stroke-width');
    }
}