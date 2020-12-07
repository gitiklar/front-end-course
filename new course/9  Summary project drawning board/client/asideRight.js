"use strict";

import LineForm from './lineForm.js';
import SqureForm from './squreForm.js';
import CircleForm from './circleForm.js';
import StarForm from './starForm.js';
import PencilForm from './pencilForm.js';
import TextForm from './textForm.js';
import ImageForm from './imageForm.js';
import {bus} from './index.js';

export default class AsideRight {
    constructor(asideRightElement) {
        this.asideRightElement = asideRightElement;
        this.currentForm = null;
        this.setupUi();
    }

    setupUi() {
        this.basicInnerForm = `
            <div id="allSixSaveAndLoadButtons" class="allSixSaveAndLoadButtons">
                <button type="button" class="btn">Save as img</button>
                <input type="file" id="inputGroupFile" multiple accept="image/*">
                <label class="btn" for="inputGroupFile">Open an img</label>  
                <button type="button" class="btn save">Save</button>
                <button type="button" class="btn load">Load</button> 
                <button type="button" class="btn share">Share me</button>
                <button type="button" class="btn join">Join to a painting</button>
            </div>
        `;
        this.asideRightElement.innerHTML = `
            <h3 class="h3">Properties</h3>
            <form class="formProperties" onsubmit='return false'>
                ${this.basicInnerForm}
            </form>
        `;
        this.createEventsToBasicForm();
    }

    createEventsToBasicForm = ()=> {
        this.form = this.asideRightElement.querySelector('.formProperties');
        this.saveAsImgBtnClick = this.form.querySelector('button:nth-child(1)');
        this.saveToProgramBtnClick = this.form.querySelector('.save');
        this.loadFromProgramBtnClick = this.form.querySelector('.load');
        this.shareMeBtnClick = this.form.querySelector('.share');
        this.joinBtnClick = this.form.querySelector('.join');
        this.loadAnImgBtnClick = this.form.querySelector('#inputGroupFile');
        this.form.addEventListener('click', this.checkBasicFormClick);
        this.loadAnImgBtnClick.addEventListener('change', this.loadAnImgBtnClickFunction);
        this.unsubscribeDialogClose && this.unsubscribeDialogClose();
        this.unsubscribeDialogClose = bus.subscribe('dialogIsClosedSoBtnsCanBeEnable', this.enableAllBtns);
        if(this.unsubscribeCreateNewFormForCurrentShape) return;
        this.unsubscribeCreateNewFormForCurrentShape = bus.subscribe('newFormForCurrentShape' , this.createNewFormForCurrentShape);
    }

    loadAnImgBtnClickFunction = (event) => {
        bus.emit('loadAnImgBtnClick', event);
        event.stopImmediatePropagation();
    }

    checkBasicFormClick = (event) => {
        if(event.target === this.saveAsImgBtnClick) {
            bus.emit('saveAsImgBtnClick');
        }
        if(event.target === this.saveToProgramBtnClick) {
            bus.emit('saveToProgramBtnClick' , 'Save');
            this.disableAllBtns();
        }
        if(event.target === this.loadFromProgramBtnClick) {
            bus.emit('loadFromProgramBtnClick');
            this.disableAllBtns();
        }
        if(event.target === this.shareMeBtnClick) {
            bus.emit('shareMeBtnClick' , 'Shared');
            this.disableAllBtns();
        }
        if(event.target === this.joinBtnClick) {
            bus.emit('joinBtnClick');
            this.disableAllBtns();
        }
        event.stopImmediatePropagation();
    }

    enableAllBtns = () => {
        this.saveAsImgBtnClick.disabled = false;
        this.saveToProgramBtnClick.disabled = false;
        this.loadFromProgramBtnClick.disabled = false;
        this.loadAnImgBtnClick.disabled = false; 
        this.shareMeBtnClick.disabled = false;
        this.joinBtnClick.disabled = false;  
    }

    disableAllBtns() {
        this.saveAsImgBtnClick.disabled = true;
        this.saveToProgramBtnClick.disabled = true;
        this.loadFromProgramBtnClick.disabled = true;
        this.loadAnImgBtnClick.disabled = true;
        this.shareMeBtnClick.disabled = true;
        this.joinBtnClick.disabled = true;
    }

    createEventsAgainToBasicFormAfterTheDomHasChanged() {
        this.createEventsToBasicForm();
    }

    createNewFormForCurrentShape = (shape) => {
        this.currentForm && this.currentForm.unsubscribeFunctionForPreFormBeforeNewForm();
        switch(shape) {
            case 'line': 
                        this.currentForm = new LineForm();
                        break;
            case 'squre': 
                        this.currentForm = new SqureForm();
                        break;
            case 'circle': 
                        this.currentForm = new CircleForm();
                        break;
            case 'star': 
                        this.currentForm = new StarForm();
                        break;
            case 'pencil': 
                        this.currentForm = new PencilForm();
                        break;
            case 'text': 
                        this.currentForm = new TextForm();
                        break; 
            case 'image': 
                        this.currentForm = new ImageForm();
                        break;
        }
        this.createEventsAgainToBasicFormAfterTheDomHasChanged();
    }
}