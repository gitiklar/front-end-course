"use strict";

import Form from './form.js';
export default class TextForm extends Form {
    constructor(form , bus) {
        super(form, bus);
        this.allTextData = {};
        this.setupUi();
    }

    setupUi() {
        super.setupUi(`
            <div class="inputsDiv">
                <label>
                    <input type="text" name="startX" maxLength="6"/>
                    <span>Start X</span> 
                </label>
                
                <label>
                    <input type="text" name="startY" maxLength="6"/>
                    <span>Start Y</span>
                </label>
                
                <label>
                    <input type="text" name="width" maxLength="6"/>
                    <span>Width</span>
                </label>
                
                <label>
                    <input type="text" name="height" maxLength="6"/>
                    <span>Height</span>
                </label>

                <label>
                    <input type="text" name="strokeWidth" maxLength="6" value=0 />
                    <span>Thick</span>
                </label>
                
                <label>
                    <input type="text" name="fontSize" maxLength="6"/>
                    <span>Font size</span>
                </label>
                <div class="dropdown">
                    <a class="fontSelector btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Font family
                    </a>
                    <div class="dropdown-menu fontSelector" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#">Rubik</a>
                        <a class="dropdown-item" href="#">Roboto</a>
                        <a class="dropdown-item" href="#">Noto Sans JP</a>
                        <a class="dropdown-item" href="#">Lato</a>
                        <a class="dropdown-item" href="#">Montserrat</a>
                        <a class="dropdown-item" href="#">Poppins</a>
                        <a class="dropdown-item" href="#">Secular One</a>
                        <a class="dropdown-item" href="#">Roboto Slab</a>
                        <a class="dropdown-item" href="#">Varela Round</a>
                        <a class="dropdown-item" href="#">Miriam Libre</a>
                        <a class="dropdown-item" href="#">Josefin Sans</a>
                        <a class="dropdown-item" href="#">Anton</a>
                        <a class="dropdown-item" href="#">Courier Prime</a>
                        <a class="dropdown-item" href="#">Lobster</a>
                        <a class="dropdown-item" href="#">Fjalla One</a>
                        <a class="dropdown-item" href="#">Indie Flower</a>
                        <a class="dropdown-item" href="#">Abril Fatface</a>
                        <a class="dropdown-item" href="#">Fredoka One</a>
                        <a class="dropdown-item" href="#">Permanent Marker</a>
                        <a class="dropdown-item" href="#">Orbitron</a>
                        <a class="dropdown-item" href="#">Concert One</a>
                        <a class="dropdown-item" href="#">Gloria Hallelujah</a>
                        <a class="dropdown-item" href="#">Carter One</a>
                        <a class="dropdown-item" href="#">Monoton</a>
                        <a class="dropdown-item" href="#">Sigmar One</a>
                        <a class="dropdown-item" href="#">Varela Round</a>
                    </div>
                </div>
                <label class="color">
                    <span>line Color</span>
                    <input type="color" name="lineColor"/>
                </label>

                <label class="color">
                    <span>fill Color</span>
                    <input type="color" name="fillColor"/>
                </label>
            </div>
        `);
        this.allTextData.startX = this.form.querySelector('[name="startX"]');
        this.allTextData.startY = this.form.querySelector('[name="startY"]');
        this.allTextData.width = this.form.querySelector('[name="width"]');
        this.allTextData.height = this.form.querySelector('[name="height"]');
        this.allTextData.strokeWidth = this.form.querySelector('[name="strokeWidth"]');
        this.allTextData.fontSize = this.form.querySelector('[name="fontSize"]');
        this.allTextData.lineColor = this.form.querySelector('[name="lineColor"]');
        this.allTextData.fillColor = this.form.querySelector('[name="fillColor"]');
        this.allTextData.fillColor.previousElementSibling.style.color = 'black';
        this.createEvents('text' , this.allTextData , 2);
        this.unsubscribeUpdateProperties = this.bus.subscribe('updatePropertiesText',this.updatePropertiesText);
        this.dropDown = this.form.querySelector('.dropdown');
        this.dropDownMenu = this.form.querySelector('.dropdown-menu');
        this.dropDown.addEventListener('click' , (event)=>{
            if(this.dropDownMenu.classList.contains('display')) {
                this.dropDownMenu.classList.remove('display');
                this.bus.emit('fontSelected' , event, event.target);
            } else {
                this.dropDownMenu.classList.add('display');
            }
        });
    }

    unsubscribePreFormFunctions() {
        this.unsubscribeUpdateProperties();
    }

    updatePropertiesText = (rect , text) => {
        this.allTextData.startX.value = rect.getAttributeNS(null, 'x');
        this.allTextData.startY.value = rect.getAttributeNS(null, 'y');
        this.allTextData.width.value = rect.getAttributeNS(null, 'width');
        this.allTextData.height.value = rect.getAttributeNS(null, 'height');
        const curText = text? text.getAttributeNS(null, 'font-size'):'';
        this.allTextData.fontSize.value = curText?curText.substring(0,curText.length-2):'';
        this.allTextData.strokeWidth.value = rect.getAttributeNS(null, 'stroke-width');
    }
}