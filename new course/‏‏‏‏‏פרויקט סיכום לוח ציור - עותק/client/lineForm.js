"use strict";

import Form from './form.js';
export default class LineForm extends Form {
    constructor(form , bus) {
        super(form, bus);
        this.allLineData = {};
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
                <input type="text" name="startY"  maxLength="6"/>
                <span>Start Y</span>
            </label>
            
            <label>
                <input type="text" name="endX"  maxLength="6"/>
                <span>End X</span>
            </label>
            
            <label>
                <input type="text" name="endY"  maxLength="6"/>
                <span>End Y</span>
            </label>    

            <label>
                <input type="text" name="strokeWidth" maxLength="6" value=1 />
                <span>Thick</span>
            </label>
            
            <label class="color">
                <span>Line Color</span>
                <input type="color" name="lineColor"/>
            </label>
        </div>
        `);
       
        this.allLineData.startX = this.form.querySelector('[name="startX"]');
        this.allLineData.startY = this.form.querySelector('[name="startY"]');
        this.allLineData.endX = this.form.querySelector('[name="endX"]');
        this.allLineData.endY = this.form.querySelector('[name="endY"]');
        this.allLineData.strokeWidth = this.form.querySelector('[name="strokeWidth"]');
        this.allLineData.lineColor = this.form.querySelector('[name="lineColor"]');
        this.createEvents('line' , this.allLineData , 1);
        this.unsubscribeUpdateProperties = this.bus.subscribe('updatePropertiesLine',this.updatePropertiesLine);
    }

    unsubscribePreFormFunctions() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesLine = (line) => {
        this.allLineData.startX.value = line.getAttributeNS(null, 'x1');
        this.allLineData.startY.value = line.getAttributeNS(null, 'y1');
        this.allLineData.endX.value = line.getAttributeNS(null, 'x2');
        this.allLineData.endY.value = line.getAttributeNS(null, 'y2');
        this.allLineData.strokeWidth.value = line.getAttributeNS(null, 'stroke-width');
    }
}