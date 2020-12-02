"use strict";

export default class ImagesLoadList {
    constructor(el , bus , allSaveDataImages) {
        this.el = el;
        this.bus = bus;
        this.allSaveDataImages = allSaveDataImages;
        this.setupUi();
    }

    setupUi()  {
        this.el.innerHTML = `
            <h4>Load</h4>
            <div class="imagesSaveList list-group"></div>
            <button class="btn cancel">Cancel</button>
        `;
        const listContainer = this.el.querySelector('.imagesSaveList');
        let list = '';
        for(let name of Object.keys(this.allSaveDataImages)) {
            list+= `<div class="imageNameAndDeleteButtonContainer"><a class="list-group-item list-group-item-action" href="#list-item">${name}</a> <button class="btn">Delete</button></div>`;
        }
        listContainer.style.overflow = "scroll";
        if(list) {
            listContainer.style.overflow = "auto";
        }
        listContainer.innerHTML = list;
        this.el.classList.add('animate__animated','animate__bounceInDown');
        this.el.addEventListener('click', (event)=>{
            if(event.target.tagName === 'A') {
                this.bus.emit('imageChose', event.target.innerHTML);
                this.el.remove();
                this.bus.emit('dialogClose')
            }
            if(event.target.innerHTML === 'Cancel') {
                this.el.remove();
                this.bus.emit('dialogClose');
            }
            if(event.target.innerHTML === 'Delete') {
                this.bus.emit('removeMeFromImagesList', event.target.previousElementSibling.innerHTML);
                event.target.parentElement.remove();
            }
            });
    }
}