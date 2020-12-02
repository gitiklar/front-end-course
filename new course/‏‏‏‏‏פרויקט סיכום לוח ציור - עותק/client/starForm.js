"use strict";

import Form from './form.js';
export default class StarForm extends Form {
    constructor(form , bus) {
        super(form, bus);
        this.allStarData = {};
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
        this.allStarData.centerX = this.form.querySelector('[name="centerX"]');
        this.allStarData.centerY = this.form.querySelector('[name="centerY"]');
        this.allStarData.width = this.form.querySelector('[name="width"]');
        this.allStarData.height = this.form.querySelector('[name="height"]');
        this.allStarData.strokeWidth = this.form.querySelector('[name="strokeWidth"]');
        this.allStarData.lineColor = this.form.querySelector('[name="lineColor"]');
        this.allStarData.fillColor = this.form.querySelector('[name="fillColor"]');
        this.allStarData.fillColor.previousElementSibling.style.color = 'black';
        this.createEvents('star' , this.allStarData , 2);
        this.unsubscribeUpdateProperties = this.bus.subscribe('updatePropertiesStar',this.updatePropertiesStar);
    }

    unsubscribePreFormFunctions() {
        this.unsubscribeUpdateProperties();
    }
    
    updatePropertiesStar = (star) => {
        this.allStarData.centerX.value = star.centerX;
        this.allStarData.centerY.value = star.centerY;
        this.allStarData.width.value = star.starWidth;
        this.allStarData.height.value = star.starHeight;
        this.allStarData.strokeWidth.value = star.strokeWidth;
    }
}