"use strict";

import Form from './form.js';
import {bus} from './index.js';

export default class ImageForm extends Form {
    constructor() {
        super('Image');
        this.allImageData = {};
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
            </div>
        `);
        this.allImageData['x'] = this.form.querySelector('[name="startX"]');
        this.allImageData['y'] = this.form.querySelector('[name="startY"]');
        this.allImageData['width'] = this.form.querySelector('[name="width"]');
        this.allImageData['height'] = this.form.querySelector('[name="height"]');
        this.createEvents(this.allImageData);
        this.unsubscribeUpdateProperties = bus.subscribe('updatePropertiesImage',this.updatePropertiesImage);
    }

    unsubscribeFunctionForPreFormBeforeNewForm() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesImage = (image) => {
        this.allImageData['x'].value = image.getAttributeNS(null, 'x');
        this.allImageData['y'].value = image.getAttributeNS(null, 'y');
        this.allImageData['width'].value = image.getAttributeNS(null, 'width');
        this.allImageData['height'].value = image.getAttributeNS(null, 'height');
    }
}