"use strict";

import Form from './form.js';
export default class SqureForm extends Form {
    constructor(form , bus) {
        super(form, bus);
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
        this.allSqureData.startX = this.form.querySelector('[name="startX"]');
        this.allSqureData.startY = this.form.querySelector('[name="startY"]');
        this.allSqureData.width = this.form.querySelector('[name="width"]');
        this.allSqureData.height = this.form.querySelector('[name="height"]');
        this.allSqureData.strokeWidth = this.form.querySelector('[name="strokeWidth"]');
        this.allSqureData.lineColor = this.form.querySelector('[name="lineColor"]');
        this.allSqureData.fillColor = this.form.querySelector('[name="fillColor"]');
        this.allSqureData.fillColor.previousElementSibling.style.color = 'black';
        this.createEvents('squre' , this.allSqureData , 2);
        this.unsubscribeUpdateProperties = this.bus.subscribe('updatePropertiesSqure',this.updatePropertiesSqure);
    }

    unsubscribePreFormFunctions() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesSqure = (squre) => {
        this.allSqureData.startX.value = squre.getAttributeNS(null, 'x');
        this.allSqureData.startY.value = squre.getAttributeNS(null, 'y');
        this.allSqureData.width.value = squre.getAttributeNS(null, 'width');
        this.allSqureData.height.value = squre.getAttributeNS(null, 'height');
        this.allSqureData.strokeWidth.value = squre.getAttributeNS(null, 'stroke-width');
    }
}