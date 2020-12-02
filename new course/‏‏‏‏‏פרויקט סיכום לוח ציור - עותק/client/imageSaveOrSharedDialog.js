import {service} from './index.js';
 export default class ImageSaveOrSharedDialog {
    constructor(el , bus , currentProgramName , saveOrShared) {
        this.saveOrShared = saveOrShared;
        this.el = el;
        this.bus = bus;
        this.currentProgramName = currentProgramName;
        this.setupUi();
    }

    setupUi()  {
        this.el.innerHTML = `
            <h4>File name:</h4>
            <div>
                <input type = "text"/ value = "${this.currentProgramName}">
            </div>
            <button class="btn">${this.saveOrShared}</button>
            <button class="btn">Cancel</button>
        `;
        this.close = true;
        this.bus.subscribe('DoNotClose', ()=>{this.close = false;});
        this.bus.subscribe('close', ()=>{this.close = true;});
        this.inputName = this.el.querySelector('input');
        this.el.classList.add('animate__animated','animate__bounceInDown');
        this.el.addEventListener('click' , this.checkClickOnDialog.bind(this));
    }

    async checkClickOnDialog(event) {
        if(event.target.tagName === 'BUTTON') {
            if(event.target.innerHTML === `${this.saveOrShared}`) {
                if(this.inputName.value) {
                    if(this.saveOrShared === 'Save') {
                        this.bus.emit(`${this.saveOrShared}ImageName`, this.inputName.value);
                    } else {
                        this.bus.emit(`${this.saveOrShared}ImageName`, this.inputName.value , await service.loadAllPaintingsNames());
                    }
                    if(this.close) {
                        this.el.remove();
                        this.bus.emit('dialogClose');
                    }
                }
            }
            if(event.target.innerHTML === "Cancel") {
                this.el.remove();
                this.bus.emit('dialogClose');
            }
        }
    }
}