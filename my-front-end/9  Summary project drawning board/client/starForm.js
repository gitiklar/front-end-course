"use strict";

import Form from './form.js';
import {bus} from './index.js';

export default class StarForm extends Form {
    constructor() {
        super('Star');
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
        this.allStarData['stroke-width'] = this.form.querySelector('[name="strokeWidth"]');
        this.allStarData['stroke'] = this.form.querySelector('[name="lineColor"]');
        this.allStarData['fill'] = this.form.querySelector('[name="fillColor"]');
        this.allStarData['fill'].previousElementSibling.style.color = 'black';
        this.createEvents(this.allStarData);
        this.unsubscribeUpdateProperties = bus.subscribe('updatePropertiesStar',this.updatePropertiesStar);
    }

    unsubscribeFunctionForPreFormBeforeNewForm() {
        this.unsubscribeUpdateProperties();
    }
    
    updatePropertiesStar = (star) => {
        this.allStarData.centerX.value = star.centerX;
        this.allStarData.centerY.value = star.centerY;
        this.allStarData.width.value = star.starWidth;
        this.allStarData.height.value = star.starHeight;
        this.allStarData['stroke-width'].value = star.strokeWidth;
    }
}