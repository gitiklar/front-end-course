"use strict";

import Form from './form.js';
import {bus} from './index.js';

export default class LineForm extends Form {
    constructor() {
        super('Line');
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
       
        this.allLineData['x1'] = this.form.querySelector('[name="startX"]');
        this.allLineData['y1'] = this.form.querySelector('[name="startY"]');
        this.allLineData['x2'] = this.form.querySelector('[name="endX"]');
        this.allLineData['y2'] = this.form.querySelector('[name="endY"]');
        this.allLineData['stroke-width'] = this.form.querySelector('[name="strokeWidth"]');
        this.allLineData['stroke'] = this.form.querySelector('[name="lineColor"]');
        this.createEvents(this.allLineData);
        this.unsubscribeUpdateProperties = bus.subscribe('updatePropertiesLine',this.updatePropertiesLine);
    }

    unsubscribeFunctionForPreFormBeforeNewForm() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesLine = (line) => {
        this.allLineData['x1'].value = line.getAttributeNS(null, 'x1');
        this.allLineData['y1'].value = line.getAttributeNS(null, 'y1');
        this.allLineData['x2'].value = line.getAttributeNS(null, 'x2');
        this.allLineData['y2'].value = line.getAttributeNS(null, 'y2');
        this.allLineData['stroke-width'].value = line.getAttributeNS(null, 'stroke-width');
    }
}