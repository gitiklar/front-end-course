"use strict";
import {bus} from './index.js';

export default class PaintingsToJoinList {
    constructor(el , allPaintingsToJoinList) {
        this.el = el;
        this.allPaintingsToJoinList = allPaintingsToJoinList;
        this.setupUi();
    }

    setupUi()  {
        this.el.innerHTML = `
            <h4>Join</h4>
            <div class="paintingsJoinList paintingsSaveList list-group"></div>
            <button class="btn cancel">Cancel</button>
        `;
        const listContainer = this.el.querySelector('.paintingsJoinList');
        let list = '';
        for(let name of this.allPaintingsToJoinList) {
            list+= `<div class="paintingsNameAndDeleteButtonContainer"><a class="list-group-item list-group-item-action" href="#list-item">${name}</a></div>`;
        }
        listContainer.style.overflow = "scroll";
        if(list) {
            listContainer.style.overflow = "auto";
        }
        listContainer.innerHTML = list;
        this.el.classList.add('animate__animated','animate__bounceInDown');
        this.el.addEventListener('click', (event)=>{
            if(event.target.tagName === 'A') {
                bus.emit('joinToPaintingSelected', event.target.innerHTML);
                this.el.remove();
                bus.emit('dialogIsClosedSoBtnsCanBeEnable')
            }
            if(event.target.innerHTML === 'Cancel') {
                this.el.remove();
                bus.emit('dialogIsClosedSoBtnsCanBeEnable');
            }
        });
    }
}