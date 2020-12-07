import {service} from './index.js';
import {bus} from './index.js';

 export default class PaintingSaveOrSharedDialog {
    constructor(el , currentProgramName , saveOrShared) {
        this.saveOrShared = saveOrShared;
        this.el = el;
        this.currentProgramName = currentProgramName;
        this.closeDialog = true;
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
        this.inputName = this.el.querySelector('input');
        this.el.classList.add('animate__animated','animate__bounceInDown');
        this.el.addEventListener('click' , this.checkClickOnDialog.bind(this));
        bus.subscribe('dontCloseDialog', ()=>{this.closeDialog = false;});
        bus.subscribe('closeDialog', ()=>{this.closeDialog = true;});
    }

    async checkClickOnDialog(event) {
        if(event.target.tagName === 'BUTTON') {
            if(event.target.innerHTML === `${this.saveOrShared}`) {
                if(this.inputName.value) {
                    if(this.saveOrShared === 'Save') {
                        bus.emit(`${this.saveOrShared}PaintingName`, this.inputName.value);
                    } else {
                        bus.emit(`${this.saveOrShared}PaintingName`, this.inputName.value , await service.loadAllPaintingsNames());
                    }
                    if(this.closeDialog) {
                        this.el.remove();
                        bus.emit('dialogIsClosedSoBtnsCanBeEnable');
                    }
                }
            }
            if(event.target.innerHTML === "Cancel") {
                this.el.remove();
                bus.emit('dialogIsClosedSoBtnsCanBeEnable');
            }
        }
    }
}