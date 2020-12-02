"use strict";

export default class ImagesToJoinList {
    constructor(el , bus , allImagesToJoinList) {
        this.el = el;
        this.bus = bus;
        this.allImagesToJoinList = allImagesToJoinList;
        this.setupUi();
    }

    setupUi()  {
        this.el.innerHTML = `
            <h4>Join</h4>
            <div class="imagesJoinList imagesSaveList list-group"></div>
            <button class="btn cancel">Cancel</button>
        `;
        const listContainer = this.el.querySelector('.imagesJoinList');
        let list = '';
        for(let name of this.allImagesToJoinList) {
            list+= `<div class="imageNameAndDeleteButtonContainer"><a class="list-group-item list-group-item-action" href="#list-item">${name}</a></div>`;
        }
        listContainer.style.overflow = "scroll";
        if(list) {
            listContainer.style.overflow = "auto";
        }
        listContainer.innerHTML = list;
        this.el.classList.add('animate__animated','animate__bounceInDown');
        this.el.addEventListener('click', (event)=>{
            if(event.target.tagName === 'A') {
                this.bus.emit('joinImageChose', event.target.innerHTML);
                this.el.remove();
                this.bus.emit('dialogClose')
            }
            if(event.target.innerHTML === 'Cancel') {
                this.el.remove();
                this.bus.emit('dialogClose');
            }
        });
    }
}