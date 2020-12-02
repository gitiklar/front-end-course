"use strict";

export default class Form {
    constructor(form , bus) {
        this.form = form;
        this.bus = bus;
    }

    setupUi(innerForm) {
        this.form.innerHTML = innerForm + this.form.innerHTML;
        this.bus.emit('createEventsAndMore');
        this.btnsContainer = this.form.querySelector('.allSixSaveAndLoadButtons');
        const calcHeight = `${this.form.clientHeight - this.form.querySelector('.inputsDiv').clientHeight}px`;
        this.btnsContainer.style.height = calcHeight;
    }

    createEvents(shapeName , allShapeData , countOfColors) {
        this.form.querySelector('div').addEventListener('input',(event)=> {
            if(event.target.getAttribute('type')==="color") {
                event.target.previousElementSibling.style.background = event.target.value;
            }
            if(event.target.getAttribute('type')==="color" || this.InputIsValid(event , shapeName)) {
                this.bus.emit('input', `${shapeName}Form` , allShapeData);
            }
        });
        this.form.querySelector('div').addEventListener('focusin',(event)=>{
            if(event.target.getAttribute('type')==="color") {
                this.bus.emit('focusInColorPicker');
            }
        });
        if(countOfColors === 1) {
            this.bus.emit('updateMyColors',allShapeData.lineColor);
        } else if(countOfColors === 2) {
            this.bus.emit('updateMyColors',allShapeData.lineColor , allShapeData.fillColor);
        }

        if(shapeName==='text') {
            this.form.classList.add('textCSS');
            this.btnsContainer.style.height = `${this.form.clientHeight - this.form.querySelector('.inputsDiv').clientHeight}px`;
        } else {
            if(this.form.classList.contains('textCSS')) {
                this.form.classList.remove('textCSS');
            }
        }
    }

    InputIsValid(event , shapeName) {
        let value = event.target.value;
        if(isNaN(Number(event.target.value))) {
            event.target.value = value.substring(0, event.target.selectionStart-1) + value.substring(event.target.selectionStart);
            value = event.target.value;
        }
        if(shapeName==='text' && event.target.getAttribute('name') === 'strokeWidth') {
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