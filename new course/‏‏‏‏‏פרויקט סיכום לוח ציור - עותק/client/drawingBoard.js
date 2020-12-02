"use strict";

import Cmenu from './cmenu.js';
import ImagesLoadList from './imagesLoadList.js';
import ImageSaveOrSharedDialog from './imageSaveOrSharedDialog.js';
import {service} from './index.js';
import {} from 'https://cdnjs.cloudflare.com/ajax/libs/save-svg-as-png/1.4.17/saveSvgAsPng.js';
import ImagesToJoinList from './imagesToJoinList.js';

export default class DrawingBoard {
    constructor(drawingBoardElement, bus) {
        this.drawingBoardElement = drawingBoardElement;
        this.bus = bus;
        this.propertiesOfCurrentChooseShapeToPaint = {
            shapeName: '',
            strokeWidth: 1,
            lineColor: '#000000',
            fillColor: '#ffffff',
        };
        this.mouseMoveWithMouseDownOnSvgElement = false;
        this.mouseIsDownOnSvgElement = false;
        this.shiftIsDown = false;
        this.currentCoordinations = {};
        this.starData = {};
        this.focusInColorPicker = false;
        this.enableUpdateFormShape = false;
        this.xmlns = "http://www.w3.org/2000/svg";
        this.drawingObjectToLocalStorage = {};
        this.currentProgramName = '';
        this.allSaveDataImages = localStorage.getItem('allSaveDataImages')? JSON.parse(localStorage.getItem('allSaveDataImages')) : {};
        this.createImageElement = this.createImageElement.bind(this)
        this.setupUi();
    }
    
    setupUi() {
        this.drawingBoardElement.innerHTML = `
        <svg class="svgMain" xmlns="http://www.w3.org/2000/svg">
            <rect class="svgContainer" stroke="#000000" stroke-width="0" fill="#fff" class="squre" x="0" y="0"></rect>
            <svg class="svgMain svgMainCenter" xmlns="http://www.w3.org/2000/svg"></svg>
        </svg>`;
        this.svg = this.drawingBoardElement.querySelector('.svgMainCenter');
        this.svgContainer = this.drawingBoardElement.querySelector('.svgContainer');
        this.svgContainer.setAttributeNS(null , 'width', this.drawingBoardElement.clientWidth);
        this.svgContainer.setAttributeNS(null , 'height', this.drawingBoardElement.clientHeight);  
        this.subscribes();
        this.events();
    }

    events() {
        window.addEventListener('resize', ()=>{
            this.svgContainer.setAttributeNS(null , 'width', this.drawingBoardElement.clientWidth);
            this.svgContainer.setAttributeNS(null , 'height', this.drawingBoardElement.clientHeight);
        });

        this.drawingBoardElement.querySelector('.svgMain').addEventListener("dragenter", this.dragenter, false);
        this.drawingBoardElement.querySelector('.svgMain').addEventListener("dragover", this.dragover, false);
        this.drawingBoardElement.querySelector('.svgMain').addEventListener("drop", this.drop.bind(this), false);

        this.drawingBoardElement.addEventListener('mousedown',(event)=>{
            if(event.target.tagName ==='tspan') return;
            if(this.contextMenu) this.contextMenu.remove();
            if(((!this.focusInColorPicker && event.target.tagName !== 'LI' && this.propertiesOfCurrentChooseShapeToPaint.shapeName)) || (!this.focusInColorPicker && event.target.tagName !== 'LI' && !event.target.classList.contains('svgContainer'))) {
                if(event.target === this.svgContainer || event.target.tagName === "svg") {
                    this.mouseIsDownOnSvgElement = true;
                    this.mouseMoveWithMouseDownOnSvgElement = false;
                    this.removeCurrentFocusCreateCoordinationsAndCreateShape(event);
                } else {
                            if(!this.eventTargetIsCurrentFocusRectangleOrPoints(event.target)) {
                                if(event.target.className.baseVal !== 'text' || event.target.className.baseVal === 'text' && event.target.nextElementSibling.nextElementSibling !== this.focusContainer) {
                                    this.focusTheShape(event);
                                }
                                this.createCurrentCoordinationsFocusRectangle(event);
                            } else if(event.target.tagName === 'circle') {
                                this.mouseIsDownOnPoint = true;
                                this.newClick = true;
                                this.currentPointClass = event.target.className.baseVal;
                            } 
                            this.transform = this.currentElement.style.transform;
                        }
            }

            if(this.currentFocusRectangleAndPoints && (event.target === this.svgContainer || event.target.tagName === "svg")) {
                this.removeFocuseContainer();
                this.currentFocusRectangleAndPoints = '';
                this.enableUpdateFormShape = false;
            }
        });
        

        this.drawingBoardElement.addEventListener('mousemove', (event)=>{
            let moveWithDown = false;
            if(this.mouseIsDownOnSvgElement) {
                moveWithDown = true;
                this.mouseMoveWithMouseDownOnSvgElement = true;
                this.startToPaint(event);
            }
            if(this.mouseIsDownOnFocusShapeOrOnRectangleFocusShape) {
                moveWithDown = true;
                this.moveTheFocusShape(event);
            }
            if(this.mouseIsDownOnPoint) {
                moveWithDown = true;
                this.startToPaint(event);
            }
            if(this.needUpdateServerWithMyChanges && moveWithDown) {
                this.updateServerOfMyData();
            }
        });

        document.addEventListener('mouseup',()=>{
            if(this.mouseIsDownOnSvgElement) {
                this.checkIfShouldRemoveElement();
                if(this.mouseMoveWithMouseDownOnSvgElement === true) {
                    this.createFocusRectangleAndPoints();
                    if(this.propertiesOfCurrentChooseShapeToPaint.shapeName === 'text') {
                        this.createText();
                    }
                }
            }
            this.mouseIsDownOnSvgElement = false;
            this.mouseIsDownOnFocusShapeOrOnRectangleFocusShape = false;
            this.mouseIsDownOnPoint = false;
            this.focusInColorPicker = false;
            this.updateMyChangeToServerIfNeeded();
        });

        
        document.addEventListener('keyup',(event)=>{
            if(event.key === 'Shift') {
                this.shiftIsDown = false;
            }
        });

        this.drawingBoardElement.addEventListener('contextmenu', (event)=>{
            event.preventDefault();
            if(!this.currentFocusRectangleAndPoints && !this.cutOrCopyElement) return;
            if(this.contextMenu) this.contextMenu.remove();
            const ul = document.createElement('ul');
            this.contextMenu = new Cmenu(ul, this.bus , event);
            this.drawingBoardElement.appendChild(ul);
            this.updateMyChangeToServerIfNeeded();
        });

        document.addEventListener('dblclick',(event)=>{
            if(event.target.tagName === 'INPUT') {
                this.styleSelection = document.createElement('style');
                this.styleSelection.innerHTML = `
                                        ::selection {
                                            background: #000;
                                        }
                `
                document.head.appendChild(this.styleSelection);
            }
        });

        document.addEventListener('mousedown',()=>{
            this.styleSelection ? this.styleSelection.innerHTML = '':'';
            this.updateMyChangeToServerIfNeeded();
        });

        document.addEventListener('keydown',(event)=>{
            if(!this.currentElement) return;
            if(document.activeElement.tagName !== 'INPUT') {
                if(event.key === 'Shift') {
                    this.shiftIsDown = true;
                }
                if (event.ctrlKey && (event.key === 'v' || event.key === 'V' || event.key === 'ה') && this.cutOrCopyElement) {
                    this.spacialKeys = false;
                    this.contextMenuEvent('Paste');
                }
                if(this.currentFocusRectangleAndPoints) {
                    this.spacialKeys = false;
                    if (event.ctrlKey && (event.key === 'x' || event.key === 'X' || event.key === 'ס')) {
                        this.contextMenuEvent('Cut');        
                    }
                    if (event.ctrlKey && (event.key === 'c' || event.key === 'C' || event.key === 'ב')) {
                        this.contextMenuEvent('Copy');
                    }
                    if (event.key === 'Delete') {
                        this.contextMenuEvent('Delete');
                    } 
                    if (event.key === 'Backspace' && !this.currentElement.classList.contains('text')) {
                        this.contextMenuEvent('Delete');
                    }
                    if (event.ctrlKey && (this.shiftIsDown && event.key === 'ArrowUp')) {
                        this.contextMenuEvent('Bring to Front');
                    }
                    if (event.ctrlKey && event.key === 'ArrowUp') {
                        this.contextMenuEvent('Bring Forward');
                    }
                    if (event.ctrlKey && (this.shiftIsDown && event.key === 'ArrowDown')) {
                        this.contextMenuEvent('Send to Back');
                    }
                    if (event.ctrlKey && event.key === 'ArrowDown') {
                        this.contextMenuEvent('Send Backward');        
                    }
                }
                if(this.currentFocusRectangleAndPoints && this.currentElement.className.baseVal === 'text' && !this.spacialKeys && this.validKeyPress(event) && !event.ctrlKey && !(event.key==="Backspace" && this.currentText.children.length === 1)) {
                    this.inputTextEvent(event);
                }
                this.updateMyChangeToServerIfNeeded();
            }            
        });
    }

    subscribes() {
        this.bus.subscribe('createLineForm', ()=> {
            this.propertiesOfCurrentChooseShapeToPaint.shapeName = 'line';
            this.enableUpdateFormShape  = false;
            this.bus.emit('showProperties', 'line'); 
        });
        this.bus.subscribe('createSqureForm', ()=> {
            this.propertiesOfCurrentChooseShapeToPaint.shapeName = 'squre';
            this.enableUpdateFormShape = false;
            this.bus.emit('showProperties', 'squre'); 
        });
        this.bus.subscribe('createCircleForm', ()=> {
            this.propertiesOfCurrentChooseShapeToPaint.shapeName = 'circle'; 
            this.bus.emit('showProperties', 'circle'); 
            this.enableUpdateFormShape = false;
        });
        this.bus.subscribe('createStarForm', ()=> {
            this.propertiesOfCurrentChooseShapeToPaint.shapeName = 'star'; 
            this.enableUpdateFormShape = false;
            this.bus.emit('showProperties', 'star');
        });
        this.bus.subscribe('createPencilForm', ()=> {
            this.propertiesOfCurrentChooseShapeToPaint.shapeName = 'pencil';
            this.enableUpdateFormShape = false;
            this.bus.emit('showProperties', 'pencil');
        });
        this.bus.subscribe('createTextForm', ()=> {
            this.propertiesOfCurrentChooseShapeToPaint.shapeName = 'text'; 
            this.enableUpdateFormShape = false;
            this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = 1;
            this.bus.emit('showProperties', 'text');
        });
        this.bus.subscribe('input' , (formName, ...arg) => {
            this.checkInput(formName, ...arg);
        });
        this.bus.subscribe('updateMyColors', (...colors)=> {
            colors.forEach((color , index) => {
                if(index === 0) {
                    color.value = this.propertiesOfCurrentChooseShapeToPaint.lineColor;
                    color.previousElementSibling.style.background = this.propertiesOfCurrentChooseShapeToPaint.lineColor;
                } else {
                    color.value = this.propertiesOfCurrentChooseShapeToPaint.fillColor;
                    color.previousElementSibling.style.background = this.propertiesOfCurrentChooseShapeToPaint.fillColor;
                }
            });
        });
        this.bus.subscribe('focusInColorPicker',()=>{
            this.focusInColorPicker = true;
        });
        this.bus.subscribe('contextMenuClick', this.contextMenuEvent);
        this.bus.subscribe('saveAsImgBtnClick', this.saveAsImgBtnClickFunction);
        this.bus.subscribe('loadAnImgBtnClick', this.createImageElement);
        this.bus.subscribe('saveToProgramBtnClick', this.saveOrSharedBtnClickFunction);
        this.bus.subscribe('SaveImageName', this.saveOrSharedImageName);
        this.bus.subscribe('loadFromProgramBtnClick', this.loadFromProgramBtnClickFunction);   
        this.bus.subscribe('removeMeFromImagesList', this.removeMeFromImagesList);
        this.bus.subscribe('shareBtnClick', this.saveOrSharedBtnClickFunction);
        this.bus.subscribe('SharedImageName', this.saveOrSharedImageName);
        this.bus.subscribe('joinBtnClick', this.joinToPaintingBtnClickFunction);
        this.bus.subscribe('imageChose' , this.imageChose);
        this.bus.subscribe('joinImageChose' , this.joinImageChose);
        this.bus.subscribe('fontSelected' , (event , targetRowSelected)=>{
            if(this.currentText) {
                if (document && document.fonts) {    
                    setTimeout(function () {           
                        document.fonts.load(`16px ${targetRowSelected.innerHTML}`).then(() => {
                            this.currentText.style.fontFamily = `${targetRowSelected.innerHTML} , sans-serif`;
                            this.updateCurrentText();
                            event.stopImmediatePropagation();
                      } , () => {
                        console.log("This font is not available");
                      }
                      );
                    }.bind(this), 0)
                  }               
            }
        });
        this.bus.subscribe('updateMyCurrentPaintingDataForAnyChanges' , (updateAlsoNow)=>{
            this.needUpdateServerWithMyChanges = true;
            updateAlsoNow && this.updateServerOfMyData();
        });
        this.bus.subscribe('fillMyBoard' , this.fillMyBoard.bind(this));
    }

    updateMyChangeToServerIfNeeded() {
        this.needUpdateServerWithMyChanges && this.updateServerOfMyData();
    }

    updateServerOfMyData() {
        this.cursor && this.cursor.setAttributeNS(null , 'fill' , 'transparent');
        const data = {};
        const innerHTML = this.svg.innerHTML;
        data.innerSvg =innerHTML.replace(innerHTML.substring(this.svg.innerHTML.indexOf('<g') , this.svg.innerHTML.indexOf('</g>')) + '</g>' ,'');
        data.allObjectInformationForFocusElementRectangle = [];
        data.starData = [];
        data.obj = [];
        [...this.svg.children].forEach((el)=> {
            if(el === this.focusContainer) return;
            data.allObjectInformationForFocusElementRectangle.push(el.objectInformationForFocusElementRectangle);
            data.starData.push(JSON.parse(JSON.stringify(el.starData?el.starData:'')));
            data.obj.push(JSON.parse(JSON.stringify(el.obj?el.obj:'')));
        });
        service.updateMySharedPaintingData(this.currentProgramName , data);
    }

    inputTextEvent(event) {
        if(!this.currentText.obj) {
            this.currentText.obj = {
                currentTextData:[event.key],
                currentKey: event.key,
                indexOfCursor: 1,
                currentDeletedLetter: '',
                widthOfCurrentDeletedLetter: 0,
                previousRow: '',
                cursorAtTheBeginningOfLine: false,
                halfCursorWidth: this.cursor.getBBox().width/2,
            }
        } else {
            this.currentText.obj.halfCursorWidth = this.cursor.getBBox().width/2;
            this.currentText.obj["currentKey"] = event.key;
            const filterArray = [...this.currentText.children].filter(el=> Number(el.getAttributeNS(null,'y')) < Number(this.cursor.getAttributeNS(null,'y')));
            this.currentText.obj.previousRow = filterArray[filterArray.length-1];
            this.currentText.obj.cursorAtTheBeginningOfLine = Number(this.cursor.getAttributeNS(null,'x')) <= Number(this.currentElement.getAttributeNS(null , 'x'));
            this.currentText.obj.indexOfCursor = this.calcIndexOfCursor();
            if(this.currentText.obj.currentKey==="Backspace") {
                    this.currentText.obj.currentDeletedLetter = this.currentText.obj.currentTextData[this.currentText.obj.indexOfCursor];
                    this.currentText.obj.widthOfCurrentDeletedLetter = this.getBBoxCurrentString(this.currentText.obj.currentDeletedLetter, this.currentText.querySelector('tspan:first-child'));
                    if(this.currentText.obj.cursorAtTheBeginningOfLine && !this.currentText.obj.previousRow && this.currentText.obj.currentDeletedLetter !== "Enter") return;

                    if(this.currentText.obj.cursorAtTheBeginningOfLine && this.currentText.obj.previousRow)  {
                        this.cursor.setAttributeNS(null ,'x', Number(this.currentElement.getAttributeNS(null , 'x')) - this.currentText.obj.halfCursorWidth + this.getBBoxCurrentString(this.currentText.obj.previousRow.innerHTML , this.currentText.querySelector('tspan:first-child')));
                        this.cursor.setAttributeNS(null ,'y', Number(this.currentText.obj.previousRow.getAttributeNS(null , 'y')));
                        if(this.currentText.obj.currentDeletedLetter === "Enter") {
                            this.currentText.obj.currentTextData.splice(this.currentText.obj.indexOfCursor,1);
                        } else {
                            return;
                        }
                    } else {
                        this.currentText.obj.currentTextData.splice(this.currentText.obj.indexOfCursor,1);
                    }
            } else {
                this.currentText.obj.currentDeletedLetter = '';
                this.currentText.obj.currentTextData.splice(this.currentText.obj.indexOfCursor-1, 0, event.key);
            }
        }
        this.updateTextSpansByDataObj();
        this.updateCursorRatio();
    }

    calcIndexOfCursor() {
        if(this.currentText.obj.currentKey!=="Backspace") return this.currentText.obj.indexOfCursor+1;
        if((this.currentText.obj.cursorAtTheBeginningOfLine && this.currentText.obj.previousRow && this.currentText.obj.currentTextData[this.currentText.obj.indexOfCursor-1] === "Enter") || !(this.currentText.obj.cursorAtTheBeginningOfLine && this.currentText.obj.previousRow))
            return this.currentText.obj.indexOfCursor-1;
        return this.currentText.obj.indexOfCursor;
    }
    
    getCurrentTspanSize(widthOrHeight , tspansText, font) {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext("2d");
        this.context.font = font;
        const sizeObj = {'width':this.context.measureText(tspansText).width, 'height':parseInt(this.context.font)};
        const size = sizeObj[widthOrHeight];
        return size;
    }

    updateTextSpansByDataObj() {
        let tspansText = '';
        let rowNumber = 0;
        this.currentFont = `${this.currentText.getAttributeNS(null, "font-size")} ${this.currentText.style.fontFamily}`;
        this.currentText.obj.currentTextData.forEach((char)=> {
            if(char!=='Enter') {
                if(tspansText) {
                    const tspansTextInnerText  = tspansText.substring(tspansText.lastIndexOf('>')+1 , tspansText.length);
                    if(this.getCurrentTspanSize("width" ,  tspansTextInnerText+char , this.currentFont) < this.focusContainer.querySelector('.focusRectangle').width.baseVal.value) {
                        tspansText+=char;
                    } else {
                        const calcX = Number(this.currentText.getAttributeNS(null,'x'));
                        const calcY = Number(this.currentText.getAttributeNS(null,'y')) + this.getCurrentTspanSize("height" ,  tspansText+char ,this.currentFont)*++rowNumber;
                        tspansText+=`</tspan><tspan x=${calcX} y=${calcY}>${char}`;
                    }
                } else {
                    const calcX = Number(this.currentText.getAttributeNS(null,'x'));
                    const calcY = Number(this.currentText.getAttributeNS(null,'y'));
                    tspansText+= `</tspan><tspan x=${calcX} y=${calcY}>${char}`;
                }
            } else {
                const calcX = Number(this.currentText.getAttributeNS(null,'x'));
                const calcY = Number(this.currentText.getAttributeNS(null,'y')) + this.getCurrentTspanSize("height" ,  tspansText ,this.currentFont)*++rowNumber;
                tspansText+=`</tspan><tspan class="rowAfterEnter" x=${calcX} y=${calcY}>`;
            }
        });
        tspansText+='</tspan>';
        this.currentText.innerHTML = tspansText;
        this.updateCursorAndPutAtTheEndOfSpans();
        if(this.currentText.getBBox().height >= Number(this.currentText.previousElementSibling.getAttributeNS(null,'height'))) {
            this.currentText.previousElementSibling.setAttributeNS(null,'height' , this.currentText.getBBox().height);
            this.bus.emit('showProperties', 'text');
            this.bus.emit(`updatePropertiesText`, this.currentElement , this.currentText);
            this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
            this.createFocusRectangleAndPoints();
        }
        if(this.currentText.children.length === 1) {
            this.currentText.obj = '';
        }
    }

    updateCursorAndPutAtTheEndOfSpans() {
        let calcX = 0;
        let calcY = 0;
        if(!this.cursor) {
            this.cursor = this.currentText.children[this.currentText.children.length-1];
            clearInterval(this.blinker);
            this.blinker = setInterval(function() {
                const CursorColor = (this.cursor.getAttribute('fill') === 'transparent');
                this.cursor.setAttributeNS(null, 'fill', CursorColor?'black':'transparent');
                
            }.bind(this), 600);
        }
        const cursorX = Number(this.cursor.getAttributeNS(null , 'x'));
        const cursorY = Number(this.cursor.getAttributeNS(null , 'y'));
        const currentElementX = Number(this.currentElement.getAttributeNS(null , 'x'));
        const nextRow = [...this.currentText.children].find((tspan)=>Number(tspan.getAttributeNS(null , 'y')) > cursorY);
        const nextRowY = nextRow&&nextRow.getAttributeNS(null ,'y');
        const widthOfCurrentLetter = this.currentText.obj.currentKey!=="Backspace" && this.getBBoxCurrentString(this.currentText.obj.currentKey , this.currentText.querySelector('tspan:first-child'));
        if(this.currentText.obj.currentKey!=="Enter" && this.currentText.obj.currentKey!=="Backspace") {
            calcX = cursorX + widthOfCurrentLetter;
            if(calcX+this.currentText.obj.halfCursorWidth >= currentElementX + Number(this.currentElement.getAttributeNS(null , "width"))) {
                calcX = currentElementX - this.currentText.obj.halfCursorWidth + widthOfCurrentLetter;
                calcY = nextRowY;
            }
        } else if(this.currentText.obj.currentKey==="Enter") {
                    calcX = currentElementX - this.currentText.obj.halfCursorWidth;
                    calcY = nextRowY;
                } else if(this.currentText.obj.currentKey==="Backspace" && this.currentText.obj.currentDeletedLetter!=="Enter") {
                            calcX = cursorX - this.currentText.obj.widthOfCurrentDeletedLetter;
                        } else {
                            if(!this.currentText.obj.previousRow) {
                                calcY = cursorY - this.getCurrentTspanSize("height" ,  "heightTmp" ,this.currentFont);
                            }
                        }
        calcX && this.cursor.setAttributeNS(null , "x" , calcX);
        calcY && this.cursor.setAttributeNS(null , "y" , calcY);
        this.currentText.appendChild(this.cursor);
    }

    updateCurrentText() {
        this.currentText.setAttributeNS(null, "x" , Number(this.currentElement.getAttributeNS(null , "x")));
        this.currentText.setAttributeNS(null, "y" , Number(this.currentElement.getAttributeNS(null , "y")));
        if(this.currentText.obj) {
            this.currentText.obj.halfCursorWidth = this.cursor.getBBox().width/2;
            this.updateTextSpansByDataObj();
            if(this.cursor.currentRatio) {
                this.cursor.setAttributeNS(null , "x" , Number(this.currentText.getAttributeNS(null, "x")) + this.cursor.currentRatio.x);
                this.cursor.setAttributeNS(null , "y" , Number(this.currentText.getAttributeNS(null, "y")) + this.cursor.currentRatio.y);
            }
        } else {
            this.cursor.setAttributeNS(null , "x" , Number(this.currentText.getAttributeNS(null, "x")));
            this.cursor.setAttributeNS(null , "y" , Number(this.currentText.getAttributeNS(null, "y")));
        }
    }

    getBBoxCurrentString(currString , currTspan) {
        const savecurrentTspanInnerHTML = currTspan.innerHTML;
        currTspan.innerHTML = currString;
        const getBbox =  currTspan.getComputedTextLength();
        currTspan.innerHTML = savecurrentTspanInnerHTML;
        return getBbox;
    }

    createCurrentTextEvent() {
        this.currentText.addEventListener('click' , (event)=> {
            this.updateCursorAfterClickOnText(event);
        });
    }

    updateCursorAfterClickOnText(event) {
        if(event.target.tagName === 'tspan' && event.target.parentElement === this.currentText) {
            this.cursor.setAttributeNS(null , "y" , event.target.getAttributeNS(null , "y"));
            let index = 0;
            let currentString = event.target.innerHTML[0];
            let calcX = Number(this.currentElement.getAttributeNS(null , 'x')) - this.currentText.obj.halfCursorWidth + this.getBBoxCurrentString(currentString , event.target);
            while((calcX <= event.offsetX) && event.target.innerHTML[index+1]) {
                currentString+=event.target.innerHTML[++index];
                calcX = Number(this.currentElement.getAttributeNS(null , 'x')) - this.currentText.obj.halfCursorWidth + this.getBBoxCurrentString(currentString , event.target);
            }
            if(calcX >= event.offsetX) {
                currentString = currentString.substring(0 , currentString.length-1);
                calcX = Number(this.currentElement.getAttributeNS(null , 'x')) - this.currentText.obj.halfCursorWidth + this.getBBoxCurrentString(currentString , event.target);
            }
            this.cursor.setAttributeNS(null , "x" , calcX);
            this.updateCursorRatio();
        }

        let countLettersGlobal = 0;
            for(let tspan of this.currentText.children) {
                if(tspan!=this.currentText.querySelector('tspan:last-child')) {
                    let currentLettersOfThisTspan = '';
                    for (let i=0 ; i< tspan.innerHTML.length ; i++) {
                        if(Number(tspan.getAttributeNS(null , "y")) < Number(this.cursor.getAttributeNS(null, "y"))) {
                            countLettersGlobal++;
                        } else {
                            if(Number(tspan.getAttributeNS(null , "y")) === Number(this.cursor.getAttributeNS(null, "y"))) {
                                currentLettersOfThisTspan+=tspan.innerHTML[i];
                                let calcX = Number(this.currentElement.getAttributeNS(null , 'x')) - this.currentText.obj.halfCursorWidth + this.getBBoxCurrentString(currentLettersOfThisTspan , tspan);
                                if(calcX <= Number(this.cursor.getAttributeNS(null, "x"))) {
                                    countLettersGlobal++;
                                }
                            }
                        }
                        
                    }
                    if(tspan.classList.contains('rowAfterEnter') && Number(tspan.getAttributeNS(null , "y")) <= Number(this.cursor.getAttributeNS(null, "y"))) countLettersGlobal++;
                }
            }
        this.currentText.obj.indexOfCursor = countLettersGlobal;
        event.stopImmediatePropagation();
    }

    updateCursorRatio() {
        this.cursor.currentRatio = {
            x: Number(this.cursor.getAttributeNS(null , "x")) - Number(this.currentElement.getAttributeNS(null , "x")),
            y: Number(this.cursor.getAttributeNS(null , "y")) - Number(this.currentElement.getAttributeNS(null , "y")),
        }
    }

    validKeyPress(event) {
        const invalidInput = ['Escape' , 'F1' , 'F2' , 'F3' , 'F4' , 'F5' , 'F6' , 'F7' , 'F8' , 'F9' , 'F10' , 'F11' , 'F12' , 'ScrollLock' , 'Pause', 'Tab' , 'CapsLock' , 'Control' , 'Shift' , 'Meta' , 'Alt' , 'ContextMenu' , 'Insert' , 'Home' , 'PageUp' , 'Delete' , 'End' , 'PageDown' , 'ArrowLeft' , 'ArrowUp' , 'ArrowRight' , 'ArrowDown'];
        if(invalidInput.indexOf(event.key) === -1) {
            return true;
        }
        return false;
    }

    removeFocuseContainer() {
        this.removeEmptyTextIfNeeded();
        this.focusContainer.remove();
    }

    removeEmptyTextIfNeeded() {
        const preElement = this.focusContainer.previousElementSibling;
        if(preElement && preElement.tagName === 'text' && preElement.children.length === 1) {
            preElement.previousElementSibling.remove();
            preElement.remove();
        }
        if(this.cursor&&this.mouseIsDownOnSvgElement) this.cursor.remove();
    }

    dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
      }
        
    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    } 

    drop(e) {
        e.stopPropagation();
        e.preventDefault();
        this.createImageElement(e);
    }

    async createImageElement(e) {
            const files = e.dataTransfer? e.dataTransfer.files: e.target.files;
            for (let i = 0; i < files.length; i++) {
                let imageFileBefore = files[i];
                if (!imageFileBefore.type.startsWith('image/')){ continue }
                const options = {
                  maxSizeMB: 0.05,
                  maxWidthOrHeight: 1000,
                  useWebWorker: true
                }
                try {
                  var imageFile = await imageCompression(imageFileBefore, options);
                } catch (error) {
                  console.log(error);
                }
                
                const imageElement = document.createElementNS(this.xmlns, 'image');
                imageElement.setAttributeNS(null,'x', 0);
                imageElement.setAttributeNS(null,'y', 0);
                imageElement.setAttributeNS(null,'preserveAspectRatio', "none");
                imageElement.classList.add('image');
                imageElement.file = imageFile;
                this.svg.appendChild(imageElement);
                const reader = new FileReader();
                const that = this;
                reader.addEventListener('load', (e)=>{
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = function(){
                        const calc = (200/(img.width/img.height)).toFixed(2);
                        imageElement.setAttributeNS(null,'href', e.target.result);
                        imageElement.setAttributeNS(null,'width', 200);
                        imageElement.setAttributeNS(null,'height', calc);
                        that.currentElement = imageElement;
                        that.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
                        that.createFocusRectangleAndPoints();
                        that.bus.emit('showProperties', 'image');
                        that.bus.emit('updatePropertiesImage', that.currentElement);
                    }
                });
                reader.readAsDataURL(imageFile);
            }
        }

    saveAsImgBtnClickFunction = () => {
        if(this.focusContainer) this.removeFocuseContainer();
        saveSvgAsPng(this.drawingBoardElement.querySelector('.svgMain'), "image.png");
    }

    saveOrSharedImageName = async (paintingName , allImagesToJoinList = null) => {
        if(!allImagesToJoinList) {
            let save = true;
            if(this.allSaveDataImages[paintingName]) {
                save = confirm(`${paintingName} already exists, do you want to replace it?`);
            }
            if(save === true) {
                this.currentProgramName = paintingName;
                this.fillDataObject(paintingName);
                this.saveDataToLocalStorage();
                this.bus.emit('close');
            } else if(save === false) {
                this.bus.emit('DoNotClose');
            }
        } else {
            if(allImagesToJoinList.indexOf(paintingName) > -1) {
                this.bus.emit('DoNotClose');
                alert(`${paintingName} already exists please choose other name`);
            } else {
                this.currentProgramName = paintingName;
                this.bus.emit('close');
                await service.shareMyPainting(paintingName);
            }
        }
    }

    fillDataObject(paintingName) {
        this.focusContainer && this.removeFocuseContainer();
        this.cursor && this.cursor.setAttributeNS(null , 'fill' , 'transparent');
        this.allSaveDataImages[paintingName] = {};
        this.allSaveDataImages[paintingName].innerSvg = this.svg.innerHTML;
        this.allSaveDataImages[paintingName].allObjectInformationForFocusElementRectangle = [];
        this.allSaveDataImages[paintingName].starData = [];
        this.allSaveDataImages[paintingName].obj = [];
        [...this.svg.children].forEach((el)=> {
            this.allSaveDataImages[paintingName].allObjectInformationForFocusElementRectangle.push(el.objectInformationForFocusElementRectangle);
            this.allSaveDataImages[paintingName].starData.push(JSON.parse(JSON.stringify(el.starData?el.starData:'')));
            this.allSaveDataImages[paintingName].obj.push(JSON.parse(JSON.stringify(el.obj?el.obj:'')));
        });
    }
    
    saveDataToLocalStorage() {
        try {
            localStorage.setItem('allSaveDataImages' , JSON.stringify(this.allSaveDataImages));
        }
        catch(e) {
            alert('Disk quota!');
            console.log(e.name);
        }
    }

    saveOrSharedBtnClickFunction = (saveOrShared) => {
        const div = document.createElement('div');
        div.classList.add('saveContainer');
        document.body.insertBefore(div, document.body.querySelector('script'));
        this.imageSaveDialog = new ImageSaveOrSharedDialog(div , this.bus , this.currentProgramName , saveOrShared);
    }

    loadFromProgramBtnClickFunction = () => {
        const div = document.createElement('div');
        div.classList.add('loadContainer');
        document.body.insertBefore(div, document.body.querySelector('script'));
        this.imagesLoadList = new ImagesLoadList(div , this.bus , this.allSaveDataImages);
    }

    joinToPaintingBtnClickFunction = async () => {
        const allImagesToJoinList = await service.loadAllPaintingsNames();
        const div = document.createElement('div');
        div.classList.add('loadContainer');
        document.body.insertBefore(div, document.body.querySelector('script'));
        this.imagesLoadList = new ImagesToJoinList(div , this.bus , allImagesToJoinList);
    }

    removeMeFromImagesList = (imageName) => {
        delete this.allSaveDataImages[imageName];
        this.saveDataToLocalStorage();
    }

    fillMyBoard(data) {
        this.svg.innerHTML = data.innerSvg;
        let index = 0;
        for(let svgElement of this.svg.children) {
            svgElement.objectInformationForFocusElementRectangle = data.allObjectInformationForFocusElementRectangle[index];
            svgElement.starData = data.starData[index];
            svgElement.obj = data.obj[index++];
        }
    }

    imageChose = async (paintingName) => {
        this.fillMyBoard(this.allSaveDataImages[paintingName] , paintingName);
        this.currentProgramName = paintingName;
        await service.removeMyTokenFromServerIfExistInOneOfThePaintings();
    }

    joinImageChose = async (paintingName) => {
        await service.joinToASharedPainting(paintingName);
        const data = await service.loadDataOfRequestedPainting(paintingName);
        this.fillMyBoard(data , paintingName);
        this.currentProgramName = paintingName;
    }

    contextMenuEvent = (itemName)=> {
        this.spacialKeys = true;
        switch(itemName) {
            case 'Cut':
                        this.cutOrCopyElement = '';
                        this.cutOrCopyText = '';
                        if(this.currentElement.className.baseVal === 'text' && this.currentElement.nextElementSibling.children.length === 1) return;
                        if(this.currentElement.className.baseVal === 'text') {
                            this.cutOrCopyText = this.currentElement.nextElementSibling.cloneNode(true);
                            this.cutOrCopyText.obj = JSON.parse(JSON.stringify(this.currentElement.nextElementSibling.obj));
                            this.currentElement.nextElementSibling.remove();
                        }
                        this.cutOrCopyElement = this.currentElement.cloneNode(true);
                        this.cutOrCopyElement.objectInformationForFocusElementRectangle = JSON.parse(JSON.stringify(this.currentElement.objectInformationForFocusElementRectangle));
                        this.cutOrCopyElement.starData = JSON.parse(JSON.stringify(this.currentElement.starData || ''));
                        this.currentElement.remove();
                        this.focusContainer.remove();
                        this.currentFocusRectangleAndPoints = '';
                        this.enableUpdateFormShape = false;
                        break;
            case 'Copy':
                        this.cutOrCopyElement = '';
                        this.cutOrCopyText = '';
                        if(this.currentElement.className.baseVal === 'text' && this.currentElement.nextElementSibling.children.length === 1) return;
                        this.cutOrCopyElement = this.currentElement.cloneNode(true);
                        this.cutOrCopyElement.objectInformationForFocusElementRectangle = JSON.parse(JSON.stringify(this.currentElement.objectInformationForFocusElementRectangle));
                        this.cutOrCopyElement.starData = JSON.parse(JSON.stringify(this.currentElement.starData || ''));
                        if(this.currentElement.className.baseVal === 'text') {
                            this.cutOrCopyText = this.currentElement.nextElementSibling.cloneNode(true);
                            this.cutOrCopyText.obj = JSON.parse(JSON.stringify(this.currentElement.nextElementSibling.obj));
                        }
                        break;            
            case 'Paste':
                        if(!this.cutOrCopyElement) return;
                        this.removeFocuseContainer();
                        this.currentElement = this.cutOrCopyElement.cloneNode(true);
                        this.currentElement.objectInformationForFocusElementRectangle = JSON.parse(JSON.stringify(this.cutOrCopyElement.objectInformationForFocusElementRectangle));
                        this.currentElement.starData = JSON.parse(JSON.stringify(this.cutOrCopyElement.starData || ''));
                        this.svg.appendChild(this.currentElement);
                        if(this.currentElement.className.baseVal === 'text') {
                            const tmpObj = JSON.parse(JSON.stringify(this.cutOrCopyText.obj));
                            this.cutOrCopyText = this.cutOrCopyText.cloneNode(true);
                            this.cutOrCopyText.obj = tmpObj;
                            this.svg.appendChild(this.cutOrCopyText);
                            this.currentText = this.cutOrCopyText;
                            this.updateCurrentText();
                            this.updateCursorForNewFocusText();
                        }
                        this.createFocusRectangleAndPoints();
                        this.currentElement.tagName!=='image' && this.updateCurrentColorToPaint();
                        this.bus.emit('showProperties', `${this.currentElement.className.baseVal}`);
                        if(this.currentElement.className.baseVal !== 'text') {
                            this.bus.emit(`updateProperties${this.currentElement.className.baseVal[0].toUpperCase() + this.currentElement.className.baseVal.slice(1)}`, this.currentElement.starData ? this.currentElement.starData : this.currentElement);
                        } else {
                            this.bus.emit(`updateProperties${this.currentElement.className.baseVal[0].toUpperCase() + this.currentElement.className.baseVal.slice(1)}`, this.currentElement.starData ? this.currentElement.starData : this.currentElement , this.currentText);
                        }
                        break;
            case 'Delete':
                        if(this.currentElement.className.baseVal === 'text') {
                            this.currentElement.nextElementSibling.remove();                        
                        }
                        this.currentElement.remove();
                        this.focusContainer.remove();
                        this.currentFocusRectangleAndPoints = '';
                        this.enableUpdateFormShape = false;
                        break;
            case 'Bring to Front':
                        this.svg.appendChild(this.currentElement);
                        if(this.currentElement.className.baseVal === 'text') {
                            this.svg.appendChild(this.currentText);
                        }
                        this.createFocusRectangleAndPoints();
                        break;
            case 'Bring Forward':
                        const nextEl = this.focusContainer.nextElementSibling;
                        if(nextEl) {
                            if(nextEl.className.baseVal!=='text') {
                                nextEl.after(this.currentElement);
                            } else {
                                nextEl.nextElementSibling.after(this.currentElement);
                            }
                        }
                        if(this.currentElement.className.baseVal === 'text') {
                            this.currentElement.after(this.currentText);
                        }
                        this.createFocusRectangleAndPoints();
                        break;
            case 'Send to Back':
                        this.svg.insertBefore(this.currentElement , this.svg.firstChild);
                        if(this.currentElement.className.baseVal === 'text') {
                            this.currentElement.after(this.currentText);
                        }
                        this.createFocusRectangleAndPoints();
                        break;
            case 'Send Backward':
                        const PreEl = this.currentElement.previousElementSibling;
                        if(PreEl) {
                            if(PreEl.tagName!=='text') {
                                this.svg.insertBefore(this.currentElement ,PreEl);
                            } else {
                                this.svg.insertBefore(this.currentElement ,PreEl.previousElementSibling);
                            }
                        }
                        if(this.currentElement.className.baseVal === 'text') {
                            this.currentElement.after(this.currentText);
                        }
                        this.createFocusRectangleAndPoints();
                        break;
        }
    }

    checkIfShouldRemoveElement() {
        if((this.currentElement && this.mouseMoveWithMouseDownOnSvgElement === false) && !this.focusInColorPicker) {
                this.currentElement.remove();
        }
    }

    updateCurrentColorToPaint() {
        this.propertiesOfCurrentChooseShapeToPaint.lineColor = this.currentElement.getAttributeNS(null , 'stroke');
        if(this.currentElement.getAttributeNS(null , 'fill') !== "none") {
            this.propertiesOfCurrentChooseShapeToPaint.fillColor = this.currentElement.getAttributeNS(null , 'fill');
        }
    }

    focusTheShape(event) {
        this.currentElement = event.target;
        this.currentElement.tagName!=='image' && this.updateCurrentColorToPaint();
        this.currentElement.className.baseVal === 'text' && (this.currentText = this.currentElement.nextElementSibling);
        this.bus.emit('showProperties', `${this.currentElement.className.baseVal}`);
        if(!this.currentElement.className.baseVal === 'text') {
            this.bus.emit(`updateProperties${this.currentElement.className.baseVal[0].toUpperCase()+this.currentElement.className.baseVal.slice(1)}`, this.currentElement.starData? this.currentElement.starData : this.currentElement);
        } else {
            this.bus.emit(`updateProperties${this.currentElement.className.baseVal[0].toUpperCase()+this.currentElement.className.baseVal.slice(1)}`, this.currentElement.starData? this.currentElement.starData : this.currentElement , this.currentText);
        }
        this.createFocusRectangleAndPoints(true);
    }

    createFocusRectangleAndPoints(mouseIsDown) {
        this.enableUpdateFormShape = true;
        this.currentFocusRectangleAndPoints && this.removeFocuseContainer();
        this.focusContainer = document.createElementNS(this.xmlns , 'g');
        this.focusContainer.classList.add('focusContainer');
        this.currentElement.nextElementSibling? this.currentElement.nextElementSibling.tagName!=='text' ? this.currentElement.after(this.focusContainer) : this.currentElement.nextElementSibling.after(this.focusContainer) : this.currentElement.after(this.focusContainer);
        this.currentFocusRectangleAndPoints = [];
        this.currentFocusRectangle = document.createElementNS(this.xmlns, 'rect');
        this.currentFocusRectangle.setAttributeNS(null, 'stroke' , "#4F80FF");
        this.currentFocusRectangle.setAttributeNS(null, 'stroke-width' , "1");
        this.currentFocusRectangle.classList.add('focusRectangle');
        this.currentFocusRectangle.style.fill = this.currentElement.className.baseVal!=='text' ? "transparent" : "none";
        this.focusContainer.appendChild(this.currentFocusRectangle);
        this.currentFocusRectangleAndPoints.push(this.currentFocusRectangle);
        this.pointClasses = {
            '1': 'selectorGripResize_nw',
            '2': 'selectorGripResize_n',
            '3': 'selectorGripResize_ne',
            '4': 'selectorGripResize_w',
            '5': 'selectorGripResize_e',
            '6': 'selectorGripResize_sw',
            '7': 'selectorGripResize_s',
            '8': 'selectorGripResize_se',
        }
        
        for(let i = 0; i <= 2; i++) {
            for(let j = 0; j <= 2; j++) {
                if(i!==1 || j!==1) {
                    const circle = document.createElementNS(this.xmlns , 'circle');
                    circle.setAttributeNS(null , 'r' , 3);
                    circle.setAttributeNS(null , 'fill' , "#4F80FF");
                    this.focusContainer.appendChild(circle);
                    this.currentFocusRectangleAndPoints.push(circle);
                }
            }
        }
        
        for(let key of Object.keys(this.pointClasses)) {
            this.currentFocusRectangleAndPoints[Number(key)].classList.add(this.pointClasses[key]);
            this.currentFocusRectangleAndPoints[Number(key)].style.cursor = this.pointClasses[key].slice(this.pointClasses[key].indexOf('_')+1) + '-resize';
        }
        
        this.updateCurrentFocusRectanglePropertiesByObjectInformationCurrentElement();
        this.updateCurrentFocusPointsBycurrentFocusRectangleElement();
        this.currentFocusRectangle.addEventListener('mousedown' , (event)=>{
            if(event.which === 3) return;
            this.createCurrentCoordinationsFocusRectangle(event);
        });
       
        this.currentFocusRectangle.addEventListener('mouseup',()=>{
            this.mouseIsDownOnFocusShapeOrOnRectangleFocusShape = false;
        });

        if(this.currentElement.className.baseVal === 'text' && this.currentText===this.currentElement.nextElementSibling && mouseIsDown) {
            this.updateCursorForNewFocusText();
            let fontSize = this.currentText.getAttributeNS(null,"font-size").substring(0,this.currentText.getAttributeNS(null,"font-size").length-2);
            if(fontSize > 100) {
                this.cursor.setAttributeNS(null , "font-weight" , 100);
            } else {
                this.cursor.setAttributeNS(null , "font-weight" , 300);
            }
        }
    }
    
    updateCursorForNewFocusText() {
            this.updateCursorAndPutAtTheEndOfSpans();
            this.createCurrentTextEvent();
            this.cursor.setAttributeNS(null ,'y' , this.currentText.children[this.currentText.children.length-2].getAttributeNS(null , 'y'));
            this.cursor.setAttributeNS(null ,'x' ,  Number(this.currentElement.getAttributeNS(null , 'x')) -2 + this.getBBoxCurrentString(this.currentText.children[this.currentText.children.length-2].innerHTML , this.currentText.children[this.currentText.children.length-2]));
            this.currentText.appendChild(this.cursor);
            this.updateCursorRatio();
            this.currentText.obj.indexOfCursor = this.currentText.obj.currentTextData.length;
    }

    updateCurrentFocusRectanglePropertiesByObjectInformationCurrentElement() {
        const thick = Number(this.currentElement.getAttributeNS(null , 'stroke-width'));
        this.currentFocusRectangleAndPoints[0].setAttributeNS(null, 'x' , Number(this.currentElement.objectInformationForFocusElementRectangle.x) - thick/2);
        this.currentFocusRectangleAndPoints[0].setAttributeNS(null, 'y', Number(this.currentElement.objectInformationForFocusElementRectangle.y) - thick/2);
        this.currentFocusRectangleAndPoints[0].setAttributeNS(null, 'width' , Number(this.currentElement.objectInformationForFocusElementRectangle.width) + thick);
        this.currentFocusRectangleAndPoints[0].setAttributeNS(null, 'height' , Number(this.currentElement.objectInformationForFocusElementRectangle.height) + thick);
        if(this.currentElement.style.transform) {
            this.focusContainer.style.transform = this.currentElement.style.transform;
        }
    }
    
    updateCurrentFocusPointsBycurrentFocusRectangleElement() {
        const xFocusRect = Number(this.currentFocusRectangleAndPoints[0].getAttributeNS(null , 'x'));
        const yFocusRect = Number(this.currentFocusRectangleAndPoints[0].getAttributeNS(null , 'y'));
        const widthFocusRect = Number(this.currentFocusRectangleAndPoints[0].getAttributeNS(null , 'width'));
        const heightFocusRect = Number(this.currentFocusRectangleAndPoints[0].getAttributeNS(null , 'height'));
        let index = 1;
        for(let i = 0; i <= 2; i++) {
            for(let j = 0; j <= 2; j++) {
                if(i!==1 || j!==1) {
                    this.currentFocusRectangleAndPoints[index].setAttributeNS(null , 'cx' , xFocusRect + j*(widthFocusRect/2));
                    this.currentFocusRectangleAndPoints[index++].setAttributeNS(null , 'cy' , yFocusRect + i*(heightFocusRect/2));
                }
            }
        }
    }

    removeCurrentFocusCreateCoordinationsAndCreateShape = (event)=> {
        if(this.currentFocusRectangleAndPoints) {
            this.removeFocuseContainer();
            this.currentFocusRectangleAndPoints = '';
            this.enableUpdateFormShape = false;
        }
        this.currentCoordinations.x1 = event.offsetX;
        this.currentCoordinations.y1 = event.offsetY;
        this.svg.appendChild(this.createCurrentElement());
    }

    eventTargetIsCurrentFocusRectangleOrPoints(targetEvent) {
        for(let element of this.currentFocusRectangleAndPoints || "") {
            if(element === targetEvent) return true;
        }
        return false;
    }

    createCurrentCoordinationsFocusRectangle(event) {
        this.currentCoordinations.x1 = event.offsetX;
        this.currentCoordinations.y1 = event.offsetY;
        this.mouseIsDownOnFocusShapeOrOnRectangleFocusShape = true;
        switch(this.currentElement.className.baseVal) {
            case 'line': 
                        Number(this.currentElement.getAttributeNS(null , 'x2')) > Number(this.currentElement.getAttributeNS(null , 'x1')) ? this.x2_more_x1 = true : this.x2_more_x1 = false;
                        Number(this.currentElement.getAttributeNS(null , 'y2')) > Number(this.currentElement.getAttributeNS(null , 'y1')) ? this.y2_more_y1 = true : this.y2_more_y1 = false;
                        this.differenceFocusRectangleX1 = Math.abs(event.offsetX - Number(this.currentElement.getAttributeNS(null , 'x1')));
                        this.differenceFocusRectangleY1 = Math.abs(event.offsetY - Number(this.currentElement.getAttributeNS(null , 'y1')));
                        this.differenceFocusRectangleX2 = Math.abs(event.offsetX - Number(this.currentElement.getAttributeNS(null , 'x2')));
                        this.differenceFocusRectangleY2 = Math.abs(event.offsetY - Number(this.currentElement.getAttributeNS(null , 'y2')));
                        break;
            case 'squre': 
                        this.differenceFocusRectangleX = Math.abs(event.offsetX - Number(this.currentElement.getAttributeNS(null , 'x')));
                        this.differenceFocusRectangleY = Math.abs(event.offsetY - Number(this.currentElement.getAttributeNS(null , 'y')));
                        break;
            case 'circle': 
                        Number(event.offsetX) > Number(this.currentElement.getAttributeNS(null , 'cx')) ? this.offsetX_more_cx = true : this.offsetX_more_cx = false;
                        Number(event.offsetY) > Number(this.currentElement.getAttributeNS(null , 'cy')) ? this.offsetY_more_cy = true : this.offsetY_more_cy = false;
                        this.differenceFocusRectangleCX = Math.abs(event.offsetX - Number(this.currentElement.getAttributeNS(null , 'cx')));
                        this.differenceFocusRectangleCY = Math.abs(event.offsetY - Number(this.currentElement.getAttributeNS(null , 'cy')));
                        break;
            case 'star': 
                        Number(event.offsetX) > this.currentElement.starData.centerX ? this.offsetX_more_cx = true : this.offsetX_more_cx = false;
                        Number(event.offsetY) > this.currentElement.starData.centerY ? this.offsetY_more_cy = true : this.offsetY_more_cy = false;
                        this.differenceFocusRectangleCX = Math.abs(event.offsetX - this.currentElement.starData.centerX);
                        this.differenceFocusRectangleCY = Math.abs(event.offsetY - this.currentElement.starData.centerY);
                        break;
            case 'pencil': 
                        this.offsetXFocusRectangle = event.offsetX;
                        this.offsetYFocusRectangle = event.offsetY;                     
                        break;
            case 'text':
                        this.differenceFocusRectangleX = Math.abs(event.offsetX - Number(this.currentElement.getAttributeNS(null , 'x')));
                        this.differenceFocusRectangleY = Math.abs(event.offsetY - Number(this.currentElement.getAttributeNS(null , 'y')));
                        break;
            case 'image': 
                        this.differenceFocusRectangleX = Math.abs(event.offsetX - Number(this.currentElement.getAttributeNS(null , 'x')));
                        this.differenceFocusRectangleY = Math.abs(event.offsetY - Number(this.currentElement.getAttributeNS(null , 'y')));
                        break;
        }   
    }
    
    createCurrentElement() {
        switch(this.propertiesOfCurrentChooseShapeToPaint.shapeName) {
            case 'line':
                        this.currentElement = document.createElementNS(this.xmlns , "line");
                        this.currentElement.setAttributeNS(null, "stroke" , this.propertiesOfCurrentChooseShapeToPaint.lineColor);
                        this.currentElement.setAttributeNS(null, "stroke-width" , this.propertiesOfCurrentChooseShapeToPaint.strokeWidth);
                        this.currentElement.setAttributeNS(null, "fill" , "none");
                        break;
            case 'squre':
                        this.currentElement = document.createElementNS(this.xmlns , "rect");
                        this.currentElement.setAttributeNS(null, "stroke" , this.propertiesOfCurrentChooseShapeToPaint.lineColor);
                        this.currentElement.setAttributeNS(null, "stroke-width" , this.propertiesOfCurrentChooseShapeToPaint.strokeWidth);
                        this.currentElement.setAttributeNS(null, "fill" , this.propertiesOfCurrentChooseShapeToPaint.fillColor);
                        break;
            case 'circle':
                        this.currentElement = document.createElementNS(this.xmlns , "ellipse");
                        this.currentElement.setAttributeNS(null, "stroke" , this.propertiesOfCurrentChooseShapeToPaint.lineColor);
                        this.currentElement.setAttributeNS(null, "stroke-width" , this.propertiesOfCurrentChooseShapeToPaint.strokeWidth);
                        this.currentElement.setAttributeNS(null, "fill" , this.propertiesOfCurrentChooseShapeToPaint.fillColor);
                        break;
            case 'star':
                        this.currentElement = document.createElementNS(this.xmlns , "path");
                        this.currentElement.setAttributeNS(null, "stroke" , this.propertiesOfCurrentChooseShapeToPaint.lineColor);
                        this.currentElement.setAttributeNS(null, "stroke-width" , this.propertiesOfCurrentChooseShapeToPaint.strokeWidth);
                        this.currentElement.setAttributeNS(null, "fill" , this.propertiesOfCurrentChooseShapeToPaint.fillColor);
                        this.currentElement.starData = {};
                        break;
            case 'pencil':
                        this.currentElement = document.createElementNS(this.xmlns , "path");
                        this.currentElement.setAttributeNS(null, "stroke" , this.propertiesOfCurrentChooseShapeToPaint.lineColor);
                        this.currentElement.setAttributeNS(null, "stroke-width" , this.propertiesOfCurrentChooseShapeToPaint.strokeWidth);
                        this.currentElement.setAttributeNS(null, "fill" , "none");
                        this.pencilPoints = 'M ';
                        break;
            case 'text':
                        this.currentElement = document.createElementNS(this.xmlns , "rect");
                        this.currentElement.setAttributeNS(null, "stroke" , this.propertiesOfCurrentChooseShapeToPaint.lineColor);
                        this.currentElement.setAttributeNS(null, "stroke-width" , this.propertiesOfCurrentChooseShapeToPaint.strokeWidth);
                        this.currentElement.setAttributeNS(null, "fill" , this.propertiesOfCurrentChooseShapeToPaint.fillColor);
                        break;
        }
        this.currentElement.classList.add(this.propertiesOfCurrentChooseShapeToPaint.shapeName);
        return this.currentElement;
    }

    createText() {
        this.currentElement.setAttributeNS(null, "stroke-width" , 0);
        const text = document.createElementNS(this.xmlns , "text");
        text.setAttributeNS(null, "x" , Number(this.currentElement.getAttributeNS(null , "x")));
        text.setAttributeNS(null, "y" , Number(this.currentElement.getAttributeNS(null , "y")));
        text.setAttributeNS(null, "dominant-baseline" , "hanging");
        text.setAttributeNS(null, "text-anchor" , "start");
        text.setAttributeNS(null , "font-size", "25px");
        text.setAttributeNS(null , 'unicode-bidi' , "bidi-override");
        text.style.fontFamily = "Arial, Helvetica, sans-serif";
        text.innerHTML = `
            <tspan pointer-events="none" display='inline' font-family="Lato, sans-serif" fill="transparent" class="textCursor" y="${this.currentElement.getAttributeNS(null , "y")}">|</tspan>
        `;
        this.cursor = text.querySelector('.textCursor');
        this.cursor.setAttributeNS(null , "font-weight" , 300);
        clearInterval(this.blinker);
        this.blinker = setInterval(function() {
            const CursorColor = (this.cursor.getAttribute('fill') === 'transparent');
            this.cursor.setAttributeNS(null, 'fill', CursorColor?'black':'transparent');
            
        }.bind(this), 600);
        this.currentText = text;
        this.createCurrentTextEvent();
        this.svg.insertBefore(text, this.focusContainer);
        this.cursor.setAttributeNS(null , 'x' , Number(this.currentElement.getAttributeNS(null , "x")) - this.cursor.getBBox().width/2);
        this.bus.emit('updatePropertiesText', this.currentElement , this.currentText);
    }

    startToPaint = (event) => {
        this.currentCoordinations.x2 = event.offsetX;
        this.currentCoordinations.y2 = event.offsetY;
        let currentShapeName;
        if(this.mouseIsDownOnPoint) {
            currentShapeName = this.currentElement.className.baseVal;
        } else {
            currentShapeName = this.propertiesOfCurrentChooseShapeToPaint.shapeName;
        }
        switch(currentShapeName) {
            case 'line': 
                        this.paintLine();
                        break;    
            case 'squre': 
                        this.paintSqureOrText('squre');
                        break;
            case 'circle': 
                        this.paintCircle();
                        break;
            case 'star': 
                        this.paintStar();
                        break;
            case 'pencil': 
                        this.paintPencil();
                        break;
            case 'text': 
                        this.paintSqureOrText('text');
                        break;
            case 'image':
                        this.paintImage();
                        break;
        }
        if(this.mouseIsDownOnPoint) {
            this.updateCurrentFocusRectanglePropertiesByObjectInformationCurrentElement();
            this.updateCurrentFocusPointsBycurrentFocusRectangleElement();
        }
    }

    paintLine = () => {
        if(this.mouseIsDownOnPoint) {
            this.movePointLine();
        } else {
            this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x1}`);
            this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y1}`);
            this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`);
            this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`);
            const x1 = this.currentCoordinations.x1;
            const x2 = this.currentCoordinations.x2;
            const y1 = this.currentCoordinations.y1;
            const y2 = this.currentCoordinations.y2;
            const Xdifference = Math.abs(x2 - x1);
            const Ydifference = Math.abs(y2 - y1);
            let widthHeightDifference = Math.abs(Xdifference - Ydifference);
            if(this.shiftIsDown) {
                if((Xdifference < Ydifference) && (Xdifference < widthHeightDifference)) {
                    this.currentElement.setAttributeNS(null , "x2" , x1);
                } else if ((Ydifference < Xdifference) && (Ydifference < widthHeightDifference)) {
                    this.currentElement.setAttributeNS(null , "y2" , y1);
                        } else if((widthHeightDifference < Xdifference) &&(widthHeightDifference < Ydifference)) {
                                    if(y2 > y1) {
                                        this.currentElement.setAttributeNS(null , "y2" , `${y2 + (Xdifference - Ydifference)}`);
                                    } else {
                                        this.currentElement.setAttributeNS(null , "y2" , `${y2 - (Xdifference - Ydifference)}`);
                                    }                          
                                }
            }
        }
        this.bus.emit('showProperties', 'line');
        this.bus.emit('updatePropertiesLine', this.currentElement);
        this.updateLineObjectInformationForFocusElementRectangle();
    }

    movePointLine() {
        if(this.newClick) {
            this.y2MoreY1ForMovingPointsLine = Number(this.currentElement.getAttributeNS(null , "y2")) > Number(this.currentElement.getAttributeNS(null , "y1")) ? true : false;
            this.x2MoreX1ForMovingPointsLine = Number(this.currentElement.getAttributeNS(null , "x2")) > Number(this.currentElement.getAttributeNS(null , "x1")) ? true : false;
            this.newClick = false;
        }
        switch(this.currentPointClass) {
            case this.pointClasses['1'] :
                this.y2MoreY1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y2}`) : this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`);
                this.x2MoreX1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x2}`) : this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`);
                break;
            case this.pointClasses['2'] :
                this.y2MoreY1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y2}`) : this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`);
                break;
            case this.pointClasses['3'] :
                this.y2MoreY1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y2}`) : this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`);
                this.x2MoreX1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`) : this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x2}`);
                break;
            case this.pointClasses['4'] :
                this.x2MoreX1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x2}`) : this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`);                    
                break;
            case this.pointClasses['5'] :
                this.x2MoreX1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`) : this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x2}`);
                break;
            case this.pointClasses['6'] :
                this.y2MoreY1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`) : this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y2}`);
                this.x2MoreX1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x2}`) : this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`);                    
                break;
            case this.pointClasses['7'] :
                this.y2MoreY1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`) : this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y2}`);
                break;
            case this.pointClasses['8'] :
                this.y2MoreY1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "y2" , `${this.currentCoordinations.y2}`) : this.currentElement.setAttributeNS(null , "y1" , `${this.currentCoordinations.y2}`);
                this.x2MoreX1ForMovingPointsLine ? this.currentElement.setAttributeNS(null , "x2" , `${this.currentCoordinations.x2}`) : this.currentElement.setAttributeNS(null , "x1" , `${this.currentCoordinations.x2}`);
                break;
        }
    }
    
    updateLineObjectInformationForFocusElementRectangle() {
        this.currentElement.objectInformationForFocusElementRectangle = {};
        this.currentElement.objectInformationForFocusElementRectangle.x = this.currentElement.getAttributeNS(null , "x2") - this.currentElement.getAttributeNS(null , "x1") > 0 ? this.currentElement.getAttributeNS(null , "x1") : this.currentElement.getAttributeNS(null , "x2");
        this.currentElement.objectInformationForFocusElementRectangle.y = this.currentElement.getAttributeNS(null , "y2") - this.currentElement.getAttributeNS(null , "y1") > 0 ? this.currentElement.getAttributeNS(null , "y1") : this.currentElement.getAttributeNS(null , "y2");
        this.currentElement.objectInformationForFocusElementRectangle.width = Math.abs(this.currentElement.getAttributeNS(null , "x1") - this.currentElement.getAttributeNS(null , "x2"));
        this.currentElement.objectInformationForFocusElementRectangle.height = Math.abs(this.currentElement.getAttributeNS(null , "y1") - this.currentElement.getAttributeNS(null , "y2"));
    }

    paintSqureOrText = (squreOrText) => {
        if(this.mouseIsDownOnPoint) {
            this.movePointSqureOrText(squreOrText);
        } else {
            if(this.currentCoordinations.x2 - this.currentCoordinations.x1 > 0) {
                this.currentElement.setAttributeNS(null , "x" , `${this.currentCoordinations.x1}`);
            } else {
                this.currentElement.setAttributeNS(null , "x" , `${this.currentCoordinations.x2}`);
            }
    
            if(this.currentCoordinations.y2 - this.currentCoordinations.y1 > 0) {
                this.currentElement.setAttributeNS(null , "y" , `${this.currentCoordinations.y1}`);
            } else {
                this.currentElement.setAttributeNS(null , "y" , `${this.currentCoordinations.y2}`);
            }
    
            this.currentElement.setAttributeNS(null , "width"  , `${Math.abs(this.currentCoordinations.x2 - this.currentCoordinations.x1)}`);
            this.currentElement.setAttributeNS(null , "height" , `${Math.abs(this.currentCoordinations.y2 - this.currentCoordinations.y1)}`);
    
            if(this.shiftIsDown) {
                if(this.currentCoordinations.y2 > this.currentCoordinations.y1) {
                    this.currentElement.setAttributeNS(null , "height" , `${Math.abs(this.currentCoordinations.x2 - this.currentCoordinations.x1)}`);                
                } else {
                    this.currentElement.setAttributeNS(null , "width" , `${Math.abs(this.currentCoordinations.y2 - this.currentCoordinations.y1)}`);
                    this.currentElement.setAttributeNS(null , "x" , `${this.currentCoordinations.x1}`);
                    if(this.currentCoordinations.x2 < this.currentCoordinations.x1) {
                        const calcX = this.currentElement.getAttributeNS(null , "x") - this.currentElement.getAttributeNS(null , "width");
                        this.currentElement.setAttributeNS(null , "x" , calcX); 
                    } 
                }
            }
        }
        this.bus.emit('showProperties', squreOrText);
        if(squreOrText === 'text') {
            this.bus.emit(`updateProperties${squreOrText.replace(/^./, str => str.toUpperCase())}`, this.currentElement , this.currentText);
        } else {
            this.bus.emit(`updateProperties${squreOrText.replace(/^./, str => str.toUpperCase())}`, this.currentElement);
        }
        this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
    }

    movePointSqureOrText(squreOrText) {
        if(this.newClick) {
            this.y1BeforeMovingSqureOrTextPoint = Number(this.currentElement.getAttributeNS(null , "y"));
            this.y2BeforeMovingSqureOrTextPoint = Number(this.currentElement.getAttributeNS(null , "y")) + Number(this.currentElement.getAttributeNS(null , "height"));
            this.x1BeforeMovingSqureOrTextPoint = Number(this.currentElement.getAttributeNS(null , "x"));
            this.x2BeforeMovingSqureOrTextPoint = Number(this.currentElement.getAttributeNS(null , "x")) + Number(this.currentElement.getAttributeNS(null , "width"));
            this.newClick = false;
        }
        switch(this.currentPointClass) {
            case this.pointClasses['1'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y2BeforeMovingSqureOrTextPoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y2BeforeMovingSqureOrTextPoint? this.currentCoordinations.y2 : this.y2BeforeMovingSqureOrTextPoint);
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x2BeforeMovingSqureOrTextPoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x2BeforeMovingSqureOrTextPoint? this.currentCoordinations.x2 : this.x2BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['2'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y2BeforeMovingSqureOrTextPoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y2BeforeMovingSqureOrTextPoint? this.currentCoordinations.y2 : this.y2BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['3'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y2BeforeMovingSqureOrTextPoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y2BeforeMovingSqureOrTextPoint? this.currentCoordinations.y2 : this.y2BeforeMovingSqureOrTextPoint);
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x1BeforeMovingSqureOrTextPoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x1BeforeMovingSqureOrTextPoint? this.currentCoordinations.x2 : this.x1BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['4'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x2BeforeMovingSqureOrTextPoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x2BeforeMovingSqureOrTextPoint? this.currentCoordinations.x2 : this.x2BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['5'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x1BeforeMovingSqureOrTextPoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x1BeforeMovingSqureOrTextPoint? this.currentCoordinations.x2 : this.x1BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['6'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x2BeforeMovingSqureOrTextPoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x2BeforeMovingSqureOrTextPoint? this.currentCoordinations.x2 : this.x2BeforeMovingSqureOrTextPoint);
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y1BeforeMovingSqureOrTextPoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y1BeforeMovingSqureOrTextPoint? this.currentCoordinations.y2 : this.y1BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['7'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y1BeforeMovingSqureOrTextPoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y1BeforeMovingSqureOrTextPoint? this.currentCoordinations.y2 : this.y1BeforeMovingSqureOrTextPoint);
                 break;
            case this.pointClasses['8'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x1BeforeMovingSqureOrTextPoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x1BeforeMovingSqureOrTextPoint? this.currentCoordinations.x2 : this.x1BeforeMovingSqureOrTextPoint);
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y1BeforeMovingSqureOrTextPoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y1BeforeMovingSqureOrTextPoint? this.currentCoordinations.y2 : this.y1BeforeMovingSqureOrTextPoint);
                 break;
        }
        if(squreOrText === 'text')  {
            this.updateCurrentText();
            this.updateCursorForNewFocusText();
        }
    }

    updateSqureOrImageOrTextObjectInformationForFocusElementRectangle() {
        this.currentElement.objectInformationForFocusElementRectangle = {};
        this.currentElement.objectInformationForFocusElementRectangle.x = this.currentElement.getAttributeNS(null , "x");
        this.currentElement.objectInformationForFocusElementRectangle.y = this.currentElement.getAttributeNS(null , "y");
        this.currentElement.objectInformationForFocusElementRectangle.width = this.currentElement.getAttributeNS(null , "width");
        this.currentElement.objectInformationForFocusElementRectangle.height = this.currentElement.getAttributeNS(null , "height");
    }

    paintCircle = () => {
        if(this.mouseIsDownOnPoint) {
            this.movePointCircle();
        } else {
            this.currentElement.setAttributeNS(null , "cx" , `${this.currentCoordinations.x2 -(this.currentCoordinations.x2 - this.currentCoordinations.x1)/2}`);
            this.currentElement.setAttributeNS(null , "cy" , `${this.currentCoordinations.y2 -(this.currentCoordinations.y2 - this.currentCoordinations.y1)/2}`);
            this.currentElement.setAttributeNS(null , "rx" , `${Math.abs(this.currentCoordinations.x2 - this.currentCoordinations.x1)/2}`);
            this.currentElement.setAttributeNS(null , "ry" , `${Math.abs(this.currentCoordinations.y2 - this.currentCoordinations.y1)/2}`);
            if(this.shiftIsDown) {
                if(this.currentCoordinations.y2 > this.currentCoordinations.y1) {
                    this.currentElement.setAttributeNS(null, "ry" , `${Math.abs(this.currentCoordinations.x2 - this.currentCoordinations.x1)/2}`);
                    const calcY = this.currentCoordinations.y1 + Number(this.currentElement.getAttributeNS(null , "ry"));
                    this.currentElement.setAttributeNS(null , "cy" , calcY);
                } else {
                    this.currentElement.setAttributeNS(null, "rx" , `${Math.abs(this.currentCoordinations.y2 - this.currentCoordinations.y1)/2}`);
                    let calcX = this.currentCoordinations.x1 + Number(this.currentElement.getAttributeNS(null , "rx"));
                    if(this.currentCoordinations.x2 < this.currentCoordinations.x1) {
                        calcX = this.currentCoordinations.x1 - Number(this.currentElement.getAttributeNS(null , "rx"));
                    }
                    this.currentElement.setAttributeNS(null , "cx" , calcX);
                }
            }
        }
        this.bus.emit('showProperties', 'circle');
        this.bus.emit('updatePropertiesCircle', this.currentElement);
        this.updateCircleObjectInformationForFocusElementRectangle();
    }

    movePointCircle() {
        if(this.newClick) {
            this.y1FixedBeforeMovingcirclePoint = Number(this.currentElement.getAttributeNS(null , "cy")) - Number(this.currentElement.getAttributeNS(null , "ry"));
            this.y2FixedBeforeMovingcirclePoint = Number(this.currentElement.getAttributeNS(null , "cy")) + Number(this.currentElement.getAttributeNS(null , "ry"));
            this.x1FixedBeforeMovingcirclePoint = Number(this.currentElement.getAttributeNS(null , "cx")) - Number(this.currentElement.getAttributeNS(null , "rx"));
            this.x2FixedBeforeMovingcirclePoint = Number(this.currentElement.getAttributeNS(null , "cx")) + Number(this.currentElement.getAttributeNS(null , "rx"));
            this.newClick = false;
        }
        switch(this.currentPointClass) {
            case this.pointClasses['1'] :
                this.currentElement.setAttributeNS(null , "ry" , Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2);
                this.currentElement.setAttributeNS(null , "cy" ,this.currentCoordinations.y2 < this.y2FixedBeforeMovingcirclePoint? this.currentCoordinations.y2 + (Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2) : this.y2FixedBeforeMovingcirclePoint + (Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2));
                this.currentElement.setAttributeNS(null , "rx" , Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2);
                this.currentElement.setAttributeNS(null , "cx" ,this.currentCoordinations.x2 < this.x2FixedBeforeMovingcirclePoint? this.currentCoordinations.x2 + (Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2) : this.x2FixedBeforeMovingcirclePoint + (Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2));
                 break;
            case this.pointClasses['2'] :
                 this.currentElement.setAttributeNS(null , "ry" , Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2);
                 this.currentElement.setAttributeNS(null , "cy" ,this.currentCoordinations.y2 < this.y2FixedBeforeMovingcirclePoint? this.currentCoordinations.y2 + (Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2) : this.y2FixedBeforeMovingcirclePoint + (Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2));
                 break;
            case this.pointClasses['3'] :
                this.currentElement.setAttributeNS(null , "ry" , Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2);
                this.currentElement.setAttributeNS(null , "cy" ,this.currentCoordinations.y2 < this.y2FixedBeforeMovingcirclePoint? this.currentCoordinations.y2 + (Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2) : this.y2FixedBeforeMovingcirclePoint + (Math.abs(this.y2FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2));
                this.currentElement.setAttributeNS(null , "rx" , Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2);
                this.currentElement.setAttributeNS(null , "cx" ,this.currentCoordinations.x2 < this.x1FixedBeforeMovingcirclePoint? this.currentCoordinations.x2 + (Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2) : this.x1FixedBeforeMovingcirclePoint + (Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2));
                 break;
            case this.pointClasses['4'] :
                 this.currentElement.setAttributeNS(null , "rx" , Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2);
                 this.currentElement.setAttributeNS(null , "cx" ,this.currentCoordinations.x2 < this.x2FixedBeforeMovingcirclePoint? this.currentCoordinations.x2 + (Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2) : this.x2FixedBeforeMovingcirclePoint + (Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2));
                 break;
            case this.pointClasses['5'] :
                this.currentElement.setAttributeNS(null , "rx" , Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2);
                this.currentElement.setAttributeNS(null , "cx" ,this.currentCoordinations.x2 < this.x1FixedBeforeMovingcirclePoint? this.currentCoordinations.x2 + (Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2) : this.x1FixedBeforeMovingcirclePoint + (Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2));
                break;
            case this.pointClasses['6'] :
                this.currentElement.setAttributeNS(null , "rx" , Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2);
                this.currentElement.setAttributeNS(null , "cx" ,this.currentCoordinations.x2 < this.x2FixedBeforeMovingcirclePoint? this.currentCoordinations.x2 + (Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2) : this.x2FixedBeforeMovingcirclePoint + (Math.abs(this.x2FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2));
                this.currentElement.setAttributeNS(null , "ry" , Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2);
                this.currentElement.setAttributeNS(null , "cy" ,this.currentCoordinations.y2 < this.y1FixedBeforeMovingcirclePoint? this.currentCoordinations.y2 + (Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2) : this.y1FixedBeforeMovingcirclePoint + (Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2));
                break;
            case this.pointClasses['7'] :
                 this.currentElement.setAttributeNS(null , "ry" , Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2);
                 this.currentElement.setAttributeNS(null , "cy" ,this.currentCoordinations.y2 < this.y1FixedBeforeMovingcirclePoint? this.currentCoordinations.y2 + (Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2) : this.y1FixedBeforeMovingcirclePoint + (Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2));
                break;
            case this.pointClasses['8'] :
                this.currentElement.setAttributeNS(null , "rx" , Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2);
                this.currentElement.setAttributeNS(null , "cx" ,this.currentCoordinations.x2 < this.x1FixedBeforeMovingcirclePoint? this.currentCoordinations.x2 + (Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2) : this.x1FixedBeforeMovingcirclePoint + (Math.abs(this.x1FixedBeforeMovingcirclePoint - this.currentCoordinations.x2)/2));
                this.currentElement.setAttributeNS(null , "ry" , Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2);
                this.currentElement.setAttributeNS(null , "cy" ,this.currentCoordinations.y2 < this.y1FixedBeforeMovingcirclePoint? this.currentCoordinations.y2 + (Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2) : this.y1FixedBeforeMovingcirclePoint + (Math.abs(this.y1FixedBeforeMovingcirclePoint - this.currentCoordinations.y2)/2));

                break;
        }
    }

    updateCircleObjectInformationForFocusElementRectangle() {
        this.currentElement.objectInformationForFocusElementRectangle = {};
        this.currentElement.objectInformationForFocusElementRectangle.x = this.currentElement.getAttributeNS(null , "cx") - this.currentElement.getAttributeNS(null , "rx");
        this.currentElement.objectInformationForFocusElementRectangle.y = this.currentElement.getAttributeNS(null , "cy") - this.currentElement.getAttributeNS(null , "ry");
        this.currentElement.objectInformationForFocusElementRectangle.width = this.currentElement.getAttributeNS(null , "rx")*2;
        this.currentElement.objectInformationForFocusElementRectangle.height = this.currentElement.getAttributeNS(null , "ry")*2;      
    }

    paintStar = (starDataFromForm) => {
        if(this.mouseIsDownOnPoint) {
            this.movePointStar();
        } else {
            if(!starDataFromForm) {
                this.currentElement.starData.starWidth = Math.abs(this.currentCoordinations.x2 - this.currentCoordinations.x1);
                if(!this.shiftIsDown) {
                    this.currentElement.starData.starHeight = Math.abs(this.currentCoordinations.y2 - this.currentCoordinations.y1);
                } else {
                    this.currentElement.starData.starHeight = this.currentElement.starData.starWidth;
                }
                
                if(this.currentCoordinations.y2 - this.currentCoordinations.y1 > 0) {
                    this.currentElement.starData.centerY = this.currentCoordinations.y1 + this.currentElement.starData.starHeight/2;
                } else {
                    this.currentElement.starData.centerY = this.currentCoordinations.y1 - this.currentElement.starData.starHeight/2;
                }
                
                if(this.currentCoordinations.x2 - this.currentCoordinations.x1 > 0) {
                    this.currentElement.starData.centerX = this.currentCoordinations.x1 + this.currentElement.starData.starWidth/2;
                } else {
                    this.currentElement.starData.centerX = this.currentCoordinations.x1 - this.currentElement.starData.starWidth/2;
                }
            } else {
                if(starDataFromForm!="movingFocus") {
                    this.currentElement.starData.starWidth = Number(starDataFromForm.width.value);
                    this.currentElement.starData.starHeight = Number(starDataFromForm.height.value);
                    this.currentElement.starData.centerX = Number(starDataFromForm.centerX.value);
                    this.currentElement.starData.centerY = Number(starDataFromForm.centerY.value);
                }
            }
        }
        
        let innerCirclePoints = 5;
        let innerRadiusX = this.currentElement.starData.starWidth / 5;
        let innerRadiusY = this.currentElement.starData.starHeight / 5;
        let innerOuterRadiusRatio = 2.62;
        let outerRadiusX = innerRadiusX * innerOuterRadiusRatio;
        let outerRadiusY = innerRadiusY * innerOuterRadiusRatio;
        const angle = (Math.PI / innerCirclePoints);
        const angleOffsetToCenterStar = 60;
        const totalPoints = innerCirclePoints * 2;
        let points = 'M ';
        for (let i = 0; i < totalPoints; i++) {
            let isEvenIndex = i % 2 == 0;
            let rx = isEvenIndex ? outerRadiusX : innerRadiusX;
            let ry = isEvenIndex ? outerRadiusY : innerRadiusY;
            let currX = this.currentElement.starData.centerX + Math.cos(i * angle + angleOffsetToCenterStar) * rx;
            let currY = this.currentElement.starData.centerY + Math.sin(i * angle + angleOffsetToCenterStar) * ry;
            points+= currX + ' ' + currY + ' ';
            if(i!==totalPoints-1) {
                points +='L';
            } else {
                points+='z';
            }
         }
        this.currentElement.setAttributeNS(null , "d" , points);
        this.currentElement.starData.strokeWidth = this.propertiesOfCurrentChooseShapeToPaint.strokeWidth;
        this.currentElement.starData.stroke = this.propertiesOfCurrentChooseShapeToPaint.lineColor;
        this.currentElement.starData.fill = this.propertiesOfCurrentChooseShapeToPaint.fillColor;
        if(!starDataFromForm) {
            this.bus.emit('showProperties', 'star');
            this.bus.emit('updatePropertiesStar', this.currentElement.starData);
        }
        this.updatePencilOrStarObjectInformationForFocusElementRectangle();
    }

    movePointStar() {
        if(this.newClick) {
            this.y1FixedBeforeMovingStarPoint = this.currentElement.starData.centerY - this.currentElement.starData.starHeight/2;
            this.y2FixedBeforeMovingStarPoint = this.currentElement.starData.centerY + this.currentElement.starData.starHeight/2;
            this.x1FixedBeforeMovingStarPoint = this.currentElement.starData.centerX - this.currentElement.starData.starWidth/2;
            this.x2FixedBeforeMovingStarPoint = this.currentElement.starData.centerX + this.currentElement.starData.starWidth/2;
            this.newClick = false;
        }
        switch(this.currentPointClass) {
            case this.pointClasses['1'] :
                 this.currentElement.starData.starHeight = Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2);
                 this.currentElement.starData.centerY = this.currentCoordinations.y2 < this.y2FixedBeforeMovingStarPoint ? this.currentCoordinations.y2 + (Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2) : this.y2FixedBeforeMovingStarPoint + (Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2);
                 this.currentElement.starData.starWidth = Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2);
                 this.currentElement.starData.centerX = this.currentCoordinations.x2 < this.x2FixedBeforeMovingStarPoint ? this.currentCoordinations.x2 + (Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2) : this.x2FixedBeforeMovingStarPoint + (Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2);
                 break;
            case this.pointClasses['2'] :
                 this.currentElement.starData.starHeight = Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2);
                 this.currentElement.starData.centerY = this.currentCoordinations.y2 < this.y2FixedBeforeMovingStarPoint ? this.currentCoordinations.y2 + (Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2) : this.y2FixedBeforeMovingStarPoint + (Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2);
                 break;
            case this.pointClasses['3'] :
                 this.currentElement.starData.starWidth = Math.abs(this.x1FixedBeforeMovingStarPoint -this.currentCoordinations.x2);
                 this.currentElement.starData.centerX = this.currentCoordinations.x2 < this.x1FixedBeforeMovingStarPoint ? this.currentCoordinations.x2 + (Math.abs(this.x1FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2) : this.x1FixedBeforeMovingStarPoint + (Math.abs(this.x1FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2);
                 this.currentElement.starData.starHeight = Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2);
                 this.currentElement.starData.centerY = this.currentCoordinations.y2 < this.y2FixedBeforeMovingStarPoint ? this.currentCoordinations.y2 + (Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2) : this.y2FixedBeforeMovingStarPoint + (Math.abs(this.y2FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2);
                 break;
            case this.pointClasses['4'] :
                 this.currentElement.starData.starWidth = Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2);
                 this.currentElement.starData.centerX = this.currentCoordinations.x2 < this.x2FixedBeforeMovingStarPoint ? this.currentCoordinations.x2 + (Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2) : this.x2FixedBeforeMovingStarPoint + (Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2);
                 break;
            case this.pointClasses['5'] :
                 this.currentElement.starData.starWidth = Math.abs(this.x1FixedBeforeMovingStarPoint -this.currentCoordinations.x2);
                 this.currentElement.starData.centerX = this.currentCoordinations.x2 < this.x1FixedBeforeMovingStarPoint ? this.currentCoordinations.x2 + (Math.abs(this.x1FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2) : this.x1FixedBeforeMovingStarPoint + (Math.abs(this.x1FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2);
                 break;
            case this.pointClasses['6'] :
                 this.currentElement.starData.starWidth = Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2);
                 this.currentElement.starData.centerX = this.currentCoordinations.x2 < this.x2FixedBeforeMovingStarPoint ? this.currentCoordinations.x2 + (Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2) : this.x2FixedBeforeMovingStarPoint + (Math.abs(this.x2FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2);
                 this.currentElement.starData.starHeight = Math.abs(this.y1FixedBeforeMovingStarPoint -this.currentCoordinations.y2);
                 this.currentElement.starData.centerY = this.currentCoordinations.y2 < this.y1FixedBeforeMovingStarPoint ? this.currentCoordinations.y2 + (Math.abs(this.y1FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2) : this.y1FixedBeforeMovingStarPoint + (Math.abs(this.y1FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2);
                 break;
            case this.pointClasses['7'] :
                 this.currentElement.starData.starHeight = Math.abs(this.y1FixedBeforeMovingStarPoint -this.currentCoordinations.y2);
                 this.currentElement.starData.centerY = this.currentCoordinations.y2 < this.y1FixedBeforeMovingStarPoint ? this.currentCoordinations.y2 + (Math.abs(this.y1FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2) : this.y1FixedBeforeMovingStarPoint + (Math.abs(this.y1FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2);
                 break;
            case this.pointClasses['8'] :
                 this.currentElement.starData.starHeight = Math.abs(this.y1FixedBeforeMovingStarPoint -this.currentCoordinations.y2);
                 this.currentElement.starData.centerY = this.currentCoordinations.y2 < this.y1FixedBeforeMovingStarPoint ? this.currentCoordinations.y2 + (Math.abs(this.y1FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2) : this.y1FixedBeforeMovingStarPoint + (Math.abs(this.y1FixedBeforeMovingStarPoint - this.currentCoordinations.y2)/2);
                 this.currentElement.starData.starWidth = Math.abs(this.x1FixedBeforeMovingStarPoint -this.currentCoordinations.x2);
                 this.currentElement.starData.centerX = this.currentCoordinations.x2 < this.x1FixedBeforeMovingStarPoint ? this.currentCoordinations.x2 + (Math.abs(this.x1FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2) : this.x1FixedBeforeMovingStarPoint + (Math.abs(this.x1FixedBeforeMovingStarPoint - this.currentCoordinations.x2)/2);
                 break;
        }
    }

    paintPencil = () => {
        let currX = this.currentCoordinations.x2;
        let currY = this.currentCoordinations.y2;
        if(this.pencilPoints!='M ') {
            this.pencilPoints+='L';
        }
        this.pencilPoints+=currX +' ' +currY + ' ';
        this.currentElement.setAttributeNS(null, "d" ,this.pencilPoints);
        this.bus.emit('showProperties', 'pencil');
        this.bus.emit('updatePropertiesPencil', this.currentElement);
        this.updatePencilOrStarObjectInformationForFocusElementRectangle();
    }

    updatePencilOrStarObjectInformationForFocusElementRectangle() {
        const pointsArray = ((this.currentElement.getAttributeNS(null, 'd')).slice(2)).replace(/L/g, '').split(' ');
        pointsArray.pop();
        let maxX = 0;
        let maxY = 0;
        let minX = 1000000000;
        let minY = 1000000000;
        pointsArray.forEach((point, index)=> {
            point = Number(point);
            if(index % 2 === 0) {
                maxX = point > maxX ? point: maxX;
                minX = point < minX ? point: minX;
            } else {
                maxY = point > maxY ? point: maxY;
                minY = point < minY ? point: minY;
            }
        });
        this.currentElement.objectInformationForFocusElementRectangle = {};
        this.currentElement.objectInformationForFocusElementRectangle.x = minX;
        this.currentElement.objectInformationForFocusElementRectangle.y = minY;
        this.currentElement.objectInformationForFocusElementRectangle.width = Math.abs(maxX - minX);
        this.currentElement.objectInformationForFocusElementRectangle.height = Math.abs(maxY - minY);
    }

    paintImage = () => {
        if(this.mouseIsDownOnPoint) {
            this.movePointImage();
        }
        this.bus.emit('showProperties', 'image');
        this.bus.emit('updatePropertiesImage', this.currentElement);
        this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
    }

    movePointImage() {
        if(this.newClick) {
            this.y1BeforeMovingImagePoint = Number(this.currentElement.getAttributeNS(null , "y"));
            this.y2BeforeMovingImagePoint = Number(this.currentElement.getAttributeNS(null , "y")) + Number(this.currentElement.getAttributeNS(null , "height"));
            this.x1BeforeMovingImagePoint = Number(this.currentElement.getAttributeNS(null , "x"));
            this.x2BeforeMovingImagePoint = Number(this.currentElement.getAttributeNS(null , "x")) + Number(this.currentElement.getAttributeNS(null , "width"));
            this.newClick = false;
        }
        switch(this.currentPointClass) {
            case this.pointClasses['1'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y2BeforeMovingImagePoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y2BeforeMovingImagePoint? this.currentCoordinations.y2 : this.y2BeforeMovingImagePoint);
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x2BeforeMovingImagePoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x2BeforeMovingImagePoint? this.currentCoordinations.x2 : this.x2BeforeMovingImagePoint);
                 break;
            case this.pointClasses['2'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y2BeforeMovingImagePoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y2BeforeMovingImagePoint? this.currentCoordinations.y2 : this.y2BeforeMovingImagePoint);
                 break;
            case this.pointClasses['3'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y2BeforeMovingImagePoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y2BeforeMovingImagePoint? this.currentCoordinations.y2 : this.y2BeforeMovingImagePoint);
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x1BeforeMovingImagePoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x1BeforeMovingImagePoint? this.currentCoordinations.x2 : this.x1BeforeMovingImagePoint);
                 break;
            case this.pointClasses['4'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x2BeforeMovingImagePoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x2BeforeMovingImagePoint? this.currentCoordinations.x2 : this.x2BeforeMovingImagePoint);
                 break;
            case this.pointClasses['5'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x1BeforeMovingImagePoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x1BeforeMovingImagePoint? this.currentCoordinations.x2 : this.x1BeforeMovingImagePoint);
                 break;
            case this.pointClasses['6'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x2BeforeMovingImagePoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x2BeforeMovingImagePoint? this.currentCoordinations.x2 : this.x2BeforeMovingImagePoint);
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y1BeforeMovingImagePoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y1BeforeMovingImagePoint? this.currentCoordinations.y2 : this.y1BeforeMovingImagePoint);
                 break;
            case this.pointClasses['7'] :
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y1BeforeMovingImagePoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y1BeforeMovingImagePoint? this.currentCoordinations.y2 : this.y1BeforeMovingImagePoint);
                 break;
            case this.pointClasses['8'] :
                 this.currentElement.setAttributeNS(null , "width" , Math.abs(this.x1BeforeMovingImagePoint - this.currentCoordinations.x2));
                 this.currentElement.setAttributeNS(null , "x" ,this.currentCoordinations.x2 < this.x1BeforeMovingImagePoint? this.currentCoordinations.x2 : this.x1BeforeMovingImagePoint);
                 this.currentElement.setAttributeNS(null , "height" , Math.abs(this.y1BeforeMovingImagePoint - this.currentCoordinations.y2));
                 this.currentElement.setAttributeNS(null , "y" ,this.currentCoordinations.y2 < this.y1BeforeMovingImagePoint? this.currentCoordinations.y2 : this.y1BeforeMovingImagePoint);
                 break;
        }
    }

    checkInput(formName, ...arg) {
        formName = formName.slice(0,formName.indexOf('Form'));
        switch(formName) {
            case 'line':
                this.lineFormInput(...arg);
                break;
            case 'squre':
                this.squreOrTextFormInput(...arg);
                break;
            case 'circle':
                this.circleFormInput(...arg);
                break;
            case 'star':
                this.starFormInput(...arg);
                break;
            case 'pencil':
                this.pencilFormInput(...arg);
                break;
            case 'text':
                this.squreOrTextFormInput(...arg);
                break;
            case 'image':
                this.imageFormInput(...arg);
                break;
        }
        if(this.propertiesOfCurrentChooseShapeToPaint.strokeWidth == 0) {
            this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = 1;
        }
        if(this.enableUpdateFormShape) {
            this.updateCurrentFocusRectanglePropertiesByObjectInformationCurrentElement();
            this.updateCurrentFocusPointsBycurrentFocusRectangleElement();
        }
    }

    lineFormInput(allLineData) {
        if(this.enableUpdateFormShape) {
            this.currentElement.setAttributeNS(null, 'x1', allLineData.startX.value);
            this.currentElement.setAttributeNS(null, 'y1' , allLineData.startY.value);
            this.currentElement.setAttributeNS(null, 'x2' , allLineData.endX.value);
            this.currentElement.setAttributeNS(null, 'y2' , allLineData.endY.value);
            this.currentElement.setAttributeNS(null, 'stroke-width' , allLineData.strokeWidth.value);
            this.currentElement.setAttributeNS(null, 'stroke' , allLineData.lineColor.value);
            this.updateLineObjectInformationForFocusElementRectangle();
        }
        this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = allLineData.strokeWidth.value;
        this.propertiesOfCurrentChooseShapeToPaint.lineColor = allLineData.lineColor.value;
    }

    squreOrTextFormInput(allSqureOrTextData) {
        if(this.enableUpdateFormShape) {
            this.currentElement.setAttributeNS(null, 'x', allSqureOrTextData.startX.value);
            this.currentElement.setAttributeNS(null, 'y' , allSqureOrTextData.startY.value);
            this.currentElement.setAttributeNS(null, 'width' , allSqureOrTextData.width.value);
            this.currentElement.setAttributeNS(null, 'height' , allSqureOrTextData.height.value);
            this.currentElement.setAttributeNS(null, 'stroke-width' , allSqureOrTextData.strokeWidth.value);
            this.currentElement.setAttributeNS(null, 'stroke' , allSqureOrTextData.lineColor.value);
            this.currentElement.setAttributeNS(null, 'fill' , allSqureOrTextData.fillColor.value);
            this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
            if(this.currentElement.className.baseVal === 'text') {
                this.currentText.setAttributeNS(null , 'font-size', allSqureOrTextData.fontSize.value + 'px');
                if(allSqureOrTextData.fontSize.value > 100) {
                    this.cursor.setAttributeNS(null , "font-weight" , 100);
                } else {
                    this.cursor.setAttributeNS(null , "font-weight" , 300);
                }
                this.updateCurrentText();
            }
        }
        this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = allSqureOrTextData.strokeWidth.value;
        this.propertiesOfCurrentChooseShapeToPaint.lineColor = allSqureOrTextData.lineColor.value;
        this.propertiesOfCurrentChooseShapeToPaint.fillColor = allSqureOrTextData.fillColor.value;
    }

    circleFormInput(allCircleData) {
        if(this.enableUpdateFormShape) {
            this.currentElement.setAttributeNS(null, 'cx', allCircleData.centerX.value);
            this.currentElement.setAttributeNS(null, 'cy' , allCircleData.centerY.value);
            this.currentElement.setAttributeNS(null, 'rx' , allCircleData.rx.value);
            this.currentElement.setAttributeNS(null, 'ry' , allCircleData.ry.value);
            this.currentElement.setAttributeNS(null, 'stroke-width' , allCircleData.strokeWidth.value);
            this.currentElement.setAttributeNS(null, 'stroke' , allCircleData.lineColor.value);
            this.currentElement.setAttributeNS(null, 'fill' , allCircleData.fillColor.value);
            this.updateCircleObjectInformationForFocusElementRectangle();
        }
        this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = allCircleData.strokeWidth.value;
        this.propertiesOfCurrentChooseShapeToPaint.lineColor = allCircleData.lineColor.value;
        this.propertiesOfCurrentChooseShapeToPaint.fillColor = allCircleData.fillColor.value;
    }

    starFormInput(allStarData) {
        this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = allStarData.strokeWidth.value;
        this.propertiesOfCurrentChooseShapeToPaint.lineColor = allStarData.lineColor.value;
        this.propertiesOfCurrentChooseShapeToPaint.fillColor = allStarData.fillColor.value;
        if(this.enableUpdateFormShape) {
            this.currentElement.setAttributeNS(null, 'stroke-width' , allStarData.strokeWidth.value);
            this.currentElement.setAttributeNS(null, 'stroke' , allStarData.lineColor.value);
            this.currentElement.setAttributeNS(null, 'fill' , allStarData.fillColor.value);
            this.paintStar(allStarData);
            this.updatePencilOrStarObjectInformationForFocusElementRectangle();
        }
    }

    pencilFormInput(allPencilData) {
        if(this.enableUpdateFormShape) {
            this.currentElement.setAttributeNS(null, 'stroke-width' , allPencilData.strokeWidth.value);
            this.currentElement.setAttributeNS(null, 'stroke' , allPencilData.lineColor.value);
            this.updatePencilOrStarObjectInformationForFocusElementRectangle();
        }
        this.propertiesOfCurrentChooseShapeToPaint.strokeWidth = allPencilData.strokeWidth.value;
        this.propertiesOfCurrentChooseShapeToPaint.lineColor = allPencilData.lineColor.value;
    }

    imageFormInput(allImageData) {
        if(this.enableUpdateFormShape) {
            this.currentElement.setAttributeNS(null, 'x', allImageData.startX.value);
            this.currentElement.setAttributeNS(null, 'y' , allImageData.startY.value);
            this.currentElement.setAttributeNS(null, 'width' , allImageData.width.value);
            this.currentElement.setAttributeNS(null, 'height' , allImageData.height.value);
            this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
        }
    }

    moveTheFocusShape (event) {
        switch(this.currentElement.className.baseVal) {
            case 'line':
                        this.moveFocusLine(event);
                        break;
            case 'squre':
                        this.moveFocusSqureOrText(event , 'squre');
                        break;
            case 'circle':
                        this.moveFocusCircle(event);
                        break;
            case 'star':
                        this.moveFocusStar(event);
                        break;
            case 'pencil':
                        this.moveFocusPencil(event);
                        break;
            case 'text':
                        this.moveFocusSqureOrText(event , 'text');
                        break;
            case 'image':
                        this.moveFocusImage(event);
                        break;
        }
        if(this.currentElement.className.baseVal!='pencil') {
            this.updateCurrentFocusRectanglePropertiesByObjectInformationCurrentElement();
            this.updateCurrentFocusPointsBycurrentFocusRectangleElement();
        }
    }
    
    moveFocusLine(event) {
        if(this.x2_more_x1) {
            this.currentElement.setAttributeNS(null , 'x1' , event.offsetX - this.differenceFocusRectangleX1);
            this.currentElement.setAttributeNS(null , 'x2' , event.offsetX + this.differenceFocusRectangleX2);
        } else {
            this.currentElement.setAttributeNS(null , 'x1' , event.offsetX + this.differenceFocusRectangleX1);
            this.currentElement.setAttributeNS(null , 'x2' , event.offsetX - this.differenceFocusRectangleX2);
        }

        if(this.y2_more_y1) {
            this.currentElement.setAttributeNS(null , 'y1' , event.offsetY - this.differenceFocusRectangleY1);
            this.currentElement.setAttributeNS(null , 'y2' , event.offsetY + this.differenceFocusRectangleY2);
        } else {
            this.currentElement.setAttributeNS(null , 'y1' , event.offsetY + this.differenceFocusRectangleY1);
            this.currentElement.setAttributeNS(null , 'y2' , event.offsetY - this.differenceFocusRectangleY2);
        }
        this.updateLineObjectInformationForFocusElementRectangle();
        this.bus.emit('updatePropertiesLine', this.currentElement);
    }

    moveFocusSqureOrText(event , shapeName) {
        this.currentElement.setAttributeNS(null , 'x' , event.offsetX - this.differenceFocusRectangleX);
        this.currentElement.setAttributeNS(null , 'y' , event.offsetY - this.differenceFocusRectangleY);
        this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
        if(shapeName === 'text') {
            this.updateCurrentText();
            this.bus.emit('updatePropertiesText', this.currentElement, this.currentText);
        }
        this.bus.emit('updatePropertiesSqure', this.currentElement);
    }

    moveFocusImage(event) {
        this.currentElement.setAttributeNS(null , 'x' , event.offsetX - this.differenceFocusRectangleX);
        this.currentElement.setAttributeNS(null , 'y' , event.offsetY - this.differenceFocusRectangleY);
        this.updateSqureOrImageOrTextObjectInformationForFocusElementRectangle();
        this.bus.emit('updatePropertiesImage', this.currentElement);
    }

    moveFocusCircle(event) {
        if(this.offsetX_more_cx) {
            this.currentElement.setAttributeNS(null , 'cx' , event.offsetX - this.differenceFocusRectangleCX);
        } else {
            this.currentElement.setAttributeNS(null , 'cx' , event.offsetX + this.differenceFocusRectangleCX);
        }

        if(this.offsetY_more_cy) {
            this.currentElement.setAttributeNS(null , 'cy' , event.offsetY - this.differenceFocusRectangleCY);
        } else {
            this.currentElement.setAttributeNS(null , 'cy' , event.offsetY + this.differenceFocusRectangleCY);
        }
        this.updateCircleObjectInformationForFocusElementRectangle();
        this.bus.emit('updatePropertiesCircle', this.currentElement);
    }

    moveFocusStar(event) {
        if(this.offsetX_more_cx) {
            this.currentElement.starData.centerX = event.offsetX - this.differenceFocusRectangleCX;
        } else {
            this.currentElement.starData.centerX = event.offsetX + this.differenceFocusRectangleCX;
        }
        if(this.offsetY_more_cy) {
            this.currentElement.starData.centerY = event.offsetY - this.differenceFocusRectangleCY;
        } else {
            this.currentElement.starData.centerY = event.offsetY + this.differenceFocusRectangleCY;
        }
        this.paintStar("movingFocus");
        this.updatePencilOrStarObjectInformationForFocusElementRectangle();
        this.bus.emit('updatePropertiesStar', this.currentElement.starData);
    }

    moveFocusPencil(event) {
        let transformX = 0;
        let transformY = 0;
        if(this.transform) {
            const transformXandY = this.transform.slice(this.transform.indexOf('(')+1, this.transform.indexOf(')'));
            transformX = Number(transformXandY.slice(0,transformXandY.indexOf('px')));
            transformY = Number(transformXandY.slice(transformXandY.indexOf(' ')+1, transformXandY.length-2));
        }
        const Xdifference = transformX + (event.offsetX - this.currentCoordinations.x1);
        const Ydifference = transformY + (event.offsetY - this.currentCoordinations.y1);

        this.currentElement.style.transform = `translate(${Xdifference}px , ${Ydifference}px)`;
        this.focusContainer.style.transform = `translate(${Xdifference}px , ${Ydifference}px)`;
    }
}