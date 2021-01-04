
class Appliation {
    constructor(textarea, bodyTable, svg) {
        this.textarea = textarea;
        this.bodyTable = bodyTable;
        this.svgRectContainer = svg.querySelector('.svg-rect');
        this.svgTextContainer = svg.querySelector('.svg-text');
        this.textarea.addEventListener('input', this.reScanningAllTextArea.bind(this));
        this.arrayOfRows = [];
        this.indexToAddRowInTable = 1;
        this.textPre = document.querySelector(".textPre");
        this.rectPre = document.querySelector(".rectPre");
    }

    reScanningAllTextArea() {
        this.arrayOfRows = [];
        this.indexToAddRowInTable = 1;
        ((this.textarea.value.split(/\t|\n|\r|\s/)).filter(v => v != '')).forEach((word)=>{
            const indexOfThisWordInRowArray = this.arrayOfRows.findIndex((rowObj)=>rowObj.word===word);
            if (indexOfThisWordInRowArray != -1) {
                this.arrayOfRows[indexOfThisWordInRowArray].addCount();
            }
            else {
                this.arrayOfRows.push(new Row(word, this.indexToAddRowInTable++));
            }
        });
        this.updateTable();
        this.resetAll();
        this.updateGraphFor7MaxCountWord();
    }

    updateTable() {
        this.bodyTable.innerHTML = '';
        this.arrayOfRows.forEach(obj => {
            obj.addRowToTable(this.bodyTable);
        });
    }

    resetAll() {
        this.textPre.innerHTML = this.svgTextContainer.innerHTML;
        this.rectPre.innerHTML = this.svgRectContainer.innerHTML;
        this.clearTextAndRect();
    }
    
    clearTextAndRect() {
        [...this.svgTextContainer.children].forEach((textElement)=>textElement.innerHTML="");
        [...this.svgRectContainer.children].forEach(rectElement=>{
            rectElement.setAttribute('height',0);
            rectElement.setAttribute('y',480);
        });
    }

    updateGraphFor7MaxCountWord() {
        this.arrayOfRows.forEach((e,index)=>{
            if(index>6) return;

            let RowObjWithMaxCount = this.arrayOfRows.reduce((obj1,obj2)=>{
                return obj1.count>=obj2.count?obj1:obj2;
            });
            
            let maxObjIndexInPreSvgText = [...this.textPre.children].findIndex((textObj)=>textObj.innerHTML === RowObjWithMaxCount.word);
            if(maxObjIndexInPreSvgText!=-1) {
                let innerHtmlOfText = this.svgTextContainer.children[maxObjIndexInPreSvgText].innerHTML;
                if(innerHtmlOfText!=="") {
                    let preWordCount = this.rectPre.children[maxObjIndexInPreSvgText].getAttribute('height')/50;
                    let indexInRowsArrayToUpdateCount = this.arrayOfRows.findIndex((obj)=>obj.word===innerHtmlOfText);
                    this.arrayOfRows[indexInRowsArrayToUpdateCount].count=preWordCount+1;
                    this.arrayOfRows[indexInRowsArrayToUpdateCount].createGraph(this.svgTextContainer,this.svgRectContainer,this.findIndexOfEmptyPlace());
                }
                RowObjWithMaxCount.createGraph(this.svgTextContainer,this.svgRectContainer,maxObjIndexInPreSvgText);
            }
            else {
                RowObjWithMaxCount.createGraph(this.svgTextContainer,this.svgRectContainer,this.findIndexOfEmptyPlace());
            }
            RowObjWithMaxCount.count = 0;
        })
    }
    
    findIndexOfEmptyPlace() {
        let findIndexEmpty = -1;
        [...this.svgTextContainer.children].forEach((textElement,index)=>{
            if(findIndexEmpty!=-1) return;
            if(textElement.innerHTML===""){
                findIndexEmpty = index;
            }
        })
        return findIndexEmpty;
    }
}
