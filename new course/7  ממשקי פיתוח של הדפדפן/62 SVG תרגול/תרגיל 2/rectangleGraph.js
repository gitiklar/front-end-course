class RectangleGraph extends Shape {
    constructor() {
        super('rectangle',7);
    }

    createGraphToThisRow(row) {
        let indexToAddWordInGraph = this.findIndexOfEmptyPlace();
        this.svgShapeTextContainer.children[indexToAddWordInGraph].innerHTML = row.word;
        if(row.count<=10) {
            this.svgShapeContainer.children[indexToAddWordInGraph].setAttribute('height',row.count*50);
            this.svgShapeContainer.children[indexToAddWordInGraph].setAttribute('y',480-row.count*50);
        }
        else {
           this.svgShapeContainer.children[indexToAddWordInGraph].setAttribute('height',500);
           this.svgShapeContainer.children[indexToAddWordInGraph].setAttribute('y',-20);
        }
    }

    clearShape() {
        [...this.svgShapeContainer.children].forEach(shapeElement=>{
            shapeElement.setAttribute('height',0);
            shapeElement.setAttribute('y',480);
        });
    }
}