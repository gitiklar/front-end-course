"use strict";

import LineForm from './lineForm.js';
import SqureForm from './squreForm.js';
import CircleForm from './circleForm.js';
import StarForm from './starForm.js';
import PencilForm from './pencilForm.js';
import TextForm from './textForm.js';
import ImageForm from './imageForm.js';

export default class AsideRight {
    constructor(asideRightElement, bus) {
        this.asideRightElement = asideRightElement;
        this.bus =bus;
        this.currentForm;
        this.setupUi();
    }

    setupUi() {
        this.asideRightElement.innerHTML = `
            <h3 class="h3">Properties</h3>
            <form class="formProperties" onsubmit='return false'>
                <div id="allSixSaveAndLoadButtons" class="allSixSaveAndLoadButtons">
                    <button type="button" class="btn">Save as img</button>
                    <input type="file" id="inputGroupFile" multiple accept="image/*">
                    <label class="btn" for="inputGroupFile">Open an img</label>  
                    <button type="button" class="btn save">Save</button>
                    <button type="button" class="btn load">Load</button> 
                    <button type="button" class="btn share">Share me</button>
                    <button type="button" class="btn join">Join to a painting</button>
                </div>
            </form>
        `;
        if(this.unsubscribeCreateEventsAndMore) this.unsubscribeCreateEventsAndMore();
        this.unsubscribeCreateEventsAndMore = this.bus.subscribe('createEventsAndMore', this.createEventsAndMore);
        this.createEventsAndMore();
    }

    createEventsAndMore = ()=> {
        this.form = this.asideRightElement.querySelector('.formProperties');
        this.saveAsImgBtnClick = this.form.querySelector('button:nth-child(1)');
        this.saveToProgramBtnClick = this.form.querySelector('.save');
        this.loadFromProgramBtnClick = this.form.querySelector('.load');
        this.shareBtnClick = this.form.querySelector('.share');
        this.joinBtnClick = this.form.querySelector('.join');
        this.loadAnImgBtnClick = this.form.querySelector('#inputGroupFile');
        this.form.addEventListener('click',(event)=>{
            if(event.target === this.saveAsImgBtnClick) {
                this.bus.emit('saveAsImgBtnClick');
            }
            if(event.target === this.saveToProgramBtnClick) {
                this.bus.emit('saveToProgramBtnClick' , 'Save');
                this.disableAll();
            }
            if(event.target === this.loadFromProgramBtnClick) {
                this.bus.emit('loadFromProgramBtnClick');
                this.disableAll();
            }
            if(event.target === this.shareBtnClick) {
                this.bus.emit('shareBtnClick' , 'Shared');
                this.disableAll();
            }
            if(event.target === this.joinBtnClick) {
                this.bus.emit('joinBtnClick');
                this.disableAll();
            }
            event.stopImmediatePropagation();
        });

        this.loadAnImgBtnClick.addEventListener('change', (event)=>{
            this.bus.emit('loadAnImgBtnClick',event);
            event.stopImmediatePropagation();
        });
        if(this.unsubscribeDialogClose) this.unsubscribeDialogClose();
        this.unsubscribeDialogClose = this.bus.subscribe('dialogClose', ()=>{
            this.saveAsImgBtnClick.disabled = false;
            this.saveToProgramBtnClick.disabled = false;
            this.loadFromProgramBtnClick.disabled = false;
            this.loadAnImgBtnClick.disabled = false; 
            this.shareBtnClick.disabled = false;
            this.joinBtnClick.disabled = false;       
        });

        if(this.unsubscribeShowProperties) return;
        this.unsubscribeShowProperties = this.bus.subscribe('showProperties',this.showProperties);
    }

    disableAll() {
        this.saveAsImgBtnClick.disabled = true;
        this.saveToProgramBtnClick.disabled = true;
        this.loadFromProgramBtnClick.disabled = true;
        this.loadAnImgBtnClick.disabled = true;
        this.shareBtnClick.disabled = true;
        this.joinBtnClick.disabled = true;
    }

    showProperties = (shape) => {
        this.setupUi();
        if(this.currentForm) {
            this.currentForm.unsubscribePreFormFunctions();
        }
        switch(shape) {
            case 'line': 
                        this.currentForm = new LineForm(this.form , this.bus);
                        break;
            case 'squre': 
                        this.currentForm = new SqureForm(this.form , this.bus);
                        break;
            case 'circle': 
                        this.currentForm = new CircleForm(this.form , this.bus);
                        break;
            case 'star': 
                        this.currentForm = new StarForm(this.form , this.bus);
                        break;
            case 'pencil': 
                        this.currentForm = new PencilForm(this.form , this.bus);
                        break;
            case 'text': 
                        this.currentForm = new TextForm(this.form , this.bus);
                        break; 
            case 'image': 
                        this.currentForm = new ImageForm(this.form , this.bus);
                        break;
        }
    }
}