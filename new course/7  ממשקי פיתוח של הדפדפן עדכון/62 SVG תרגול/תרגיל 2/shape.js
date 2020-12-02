class Shape {
    constructor(shapeName,HowManyGraphsToCreate) {
        this.shapeName = shapeName;
        this.shapeGraph = document.querySelector(`.${shapeName}Graph`);
        this.linkToOtherGraph = this.getOtherGtaph();

        this.shapeGraph.classList.remove('display-none');
        this.linkToOtherGraph.classList.remove('display-none');

        this.svgShapeContainer = document.querySelector(`.svg-${shapeName}`);
        this.svgShapeTextContainer = document.querySelector(`.svg-${shapeName}-text`);

        this.svgShapePreContainer = document.querySelector('.svg-shape-pre');
        this.svgTextPreContainer = document.querySelector('.svg-text-pre');

        this.HowManyGraphsToCreate = HowManyGraphsToCreate;

        this.maxObjIndexInPreSvgText = -1;
    }

    getOtherGtaph() {
        if(this.shapeName==='rectangle')
            return document.querySelector('.linkCircle');
        return document.querySelector('.linkRectangle');
    }

    leave() {
        this.shapeGraph.classList.add('display-none');
        this.linkToOtherGraph.classList.add('display-none');
    }

    resetAll() {
        this.svgShapePreContainer.innerHTML = this.svgShapeContainer.innerHTML;
        this.svgTextPreContainer.innerHTML = this.svgShapeTextContainer.innerHTML;
        this.clearText();
        this.clearShape();
    }

    clearText() {
        [...this.svgShapeTextContainer.children].forEach((textElement)=>textElement.innerHTML="");
    }

    updateGraphForMaxCountWord(tableRows) {
        tableRows.forEach((e,index)=>{
            if(index>=this.HowManyGraphsToCreate) return;

            let RowObjWithMaxCount = tableRows.reduce((obj1,obj2)=>{
                return obj1.count>=obj2.count?obj1:obj2;
            });
            
            this.maxObjIndexInPreSvgText = [...this.svgTextPreContainer.children].findIndex((textObj)=>textObj.innerHTML === RowObjWithMaxCount.word);
            if(this.maxObjIndexInPreSvgText!=-1) {
                let innerHtmlOfText = this.svgShapeTextContainer.children[this.maxObjIndexInPreSvgText].innerHTML;
                let tmpSaveMax = this.maxObjIndexInPreSvgText;
                if(innerHtmlOfText!=="") {
                    let preWordCount = this.getPreWordCountForSpecificShape();
                    let indexInRowsArrayToUpdateCount = tableRows.findIndex((obj)=>obj.word===innerHtmlOfText);
                    tableRows[indexInRowsArrayToUpdateCount].count=preWordCount+1;
                    this.maxObjIndexInPreSvgText=-1;
                    this.createGraphToThisRow(tableRows[indexInRowsArrayToUpdateCount]);
                    tableRows[indexInRowsArrayToUpdateCount].count=0;
                    this.maxObjIndexInPreSvgText = tmpSaveMax;
                }
                this.createGraphToThisRow(RowObjWithMaxCount);
            }
            else {
                this.createGraphToThisRow(RowObjWithMaxCount);
            }
            RowObjWithMaxCount.count = 0;
        })
    }

    getPreWordCountForSpecificShape() {
        if(this.shapeName==='rectangle') {
            return (this.svgShapePreContainer.children[this.maxObjIndexInPreSvgText].getAttribute('height')/50);
        }
        else {
            return ((this.svgShapePreContainer.children[this.maxObjIndexInPreSvgText].getAttribute('r')-10)/10);
        }
    }

    findIndexOfEmptyPlace() {
        if(this.maxObjIndexInPreSvgText!=-1) {
            return this.maxObjIndexInPreSvgText;
        }

        let findIndexEmpty = -1;
        [...this.svgShapeTextContainer.children].forEach((textElement,index)=>{
            if(findIndexEmpty!=-1) return;
            if(textElement.innerHTML===""){
                findIndexEmpty = index;
            }
        })
        return findIndexEmpty;
    }
}