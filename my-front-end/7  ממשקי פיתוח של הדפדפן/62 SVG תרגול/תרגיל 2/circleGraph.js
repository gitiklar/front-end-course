class CircleGraph extends Shape {
    constructor() {
        super('circle',9);
    }

    createGraphToThisRow(row) {
        let indexToAddWordInGraph = this.findIndexOfEmptyPlace();
        this.svgShapeTextContainer.children[indexToAddWordInGraph].innerHTML = row.word;
        if(row.count<=9) {
            this.svgShapeContainer.children[indexToAddWordInGraph].setAttribute('r',row.count*10+10);
            console.log(`word:${row.word} count:${row.count}`);
        }
        else {
            this.svgShapeContainer.children[indexToAddWordInGraph].setAttribute('r',100);
        }
    }

    clearShape() {
        [...this.svgShapeContainer.children].forEach(shapeElement=>{
            shapeElement.setAttribute('r',0);
        });
    }
}