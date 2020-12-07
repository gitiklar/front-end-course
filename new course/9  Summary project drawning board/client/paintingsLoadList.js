"use strict";
import {bus} from './index.js';

export default class PaintingsLoadList {
    constructor(el , allSaveDataPaintings) {
        this.el = el;
        this.allSaveDataPaintings = allSaveDataPaintings;
        this.setupUi();
    }

    setupUi()  {
        this.el.innerHTML = `
            <h4>Load</h4>
            <div class="paintingsSaveList list-group"></div>
            <button class="btn cancel">Cancel</button>
        `;
        const listContainer = this.el.querySelector('.paintingsSaveList');
        let list = '';
        for(let name of Object.keys(this.allSaveDataPaintings)) {
            list+= `<div class="paintingNameAndDeleteButtonContainer"><a class="list-group-item list-group-item-action" href="#list-item">${name}</a> <button class="btn">Delete</button></div>`;
        }
        listContainer.style.overflow = "scroll";
        if(list) {
            listContainer.style.overflow = "auto";
        }
        listContainer.innerHTML = list;
        this.el.classList.add('animate__animated','animate__bounceInDown');
        this.el.addEventListener('click', (event)=>{
            if(event.target.tagName === 'A') {
                bus.emit('paintingSelectedFromLocalStorage', event.target.innerHTML);
                this.el.remove();
                bus.emit('dialogIsClosedSoBtnsCanBeEnable')
            }
            if(event.target.innerHTML === 'Cancel') {
                this.el.remove();
                bus.emit('dialogIsClosedSoBtnsCanBeEnable');
            }
            if(event.target.innerHTML === 'Delete') {
                bus.emit('removeMeFromPaintingsListDataToLocalStorage', event.target.previousElementSibling.innerHTML);
                event.target.parentElement.remove();
            }
        });
    }
}