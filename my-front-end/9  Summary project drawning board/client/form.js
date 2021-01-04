"use strict";
import {bus} from './index.js';
import {asideRight} from './index.js';

export default class Form {
    constructor(shapeName) {
        this.form = asideRight.form;
        this.basicInnerForm = asideRight.basicInnerForm;
        this.shapeName = shapeName;
    }

    setupUi(innerForm) {
        this.form.innerHTML = innerForm + this.basicInnerForm;
        this.btnsContainer = this.form.querySelector('.allSixSaveAndLoadButtons');
        const calcHeight = `${this.form.clientHeight - this.form.querySelector('.inputsDiv').clientHeight}px`;
        this.btnsContainer.style.height = calcHeight;
    }

    createEvents(allShapeData) {
        this.form.querySelector('div').addEventListener('input', (event)=>{this.inputEvent(event , allShapeData)});
        this.form.querySelector('div').addEventListener('focusin', this.focusInColorPicker);
        allShapeData['fill'] && bus.emit('initialColorsValueTotheLatestColors',allShapeData['stroke'] , allShapeData['fill']);
        !allShapeData['fill'] && allShapeData['stroke'] && bus.emit('initialColorsValueTotheLatestColors',allShapeData['stroke']);
        this.textStyleAddOrRemove();
    }

    textStyleAddOrRemove() {
        if(this.shapeName==='Text') {
            this.form.classList.add('textCSS');
            this.btnsContainer.style.height = `${this.form.clientHeight - this.form.querySelector('.inputsDiv').clientHeight}px`;
        } else {
            if(this.form.classList.contains('textCSS')) {
                this.form.classList.remove('textCSS');
            }
        }
    }

    inputEvent = (event , allShapeData) => {
        const targetType = event.target.getAttribute('type');
        if(targetType==="color" || this.InputIsValid(event)) {
            bus.emit('formInput', this.shapeName , allShapeData);
            targetType==="color" && (event.target.previousElementSibling.style.background = event.target.value);
        }
    }

    focusInColorPicker = (event) => {
        if(event.target.getAttribute('type')==="color") {
            bus.emit('focusInColorPicker');
        }
    }

    InputIsValid(event) {
        let value = event.target.value;
        if(isNaN(Number(event.target.value))) {
            event.target.value = value.substring(0, event.target.selectionStart-1) + value.substring(event.target.selectionStart);
            value = event.target.value;
        }
        if(this.shapeName==='Text' && event.target.getAttribute('name') === 'strokeWidth') {
            if(Number(value> 4)) {
                event.target.value = 4;
                value = event.target.value;
            }
        } else {
            if(Number(value> 9999)) {
                event.target.value = value.slice(0,4);
                value = event.target.value;
            }
        }

        if(value) {
            return true;
        }
        event.target.value = 0;
        return false;
    }
}