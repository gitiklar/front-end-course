
class Appliation {
    constructor(textarea,bodyTable) {
        this.textarea = textarea;
        this.bodyTable = bodyTable;
        this.tableRows = [];
        this.indexToAddRowInTable = 1;
        this.currentGraph = new RectangleGraph();

        this.textarea.addEventListener('input', this.reScanningAllTextArea.bind(this));
        window.addEventListener('hashchange', this.changeGraphFromHash.bind(this));
        this.changeGraphFromHash();
    }

    changeGraphFromHash() {
        const hash = window.location.hash;
        if(hash) {
            this.currentGraph.leave();
            if(hash==='#circle') {
                this.currentGraph = new CircleGraph();
            }
            if(hash==='#rectangle') { 
                this.currentGraph = new RectangleGraph();
            }
            this.currentGraph.clearText();
            this.currentGraph.clearShape();
            this.reScanningAllTextArea();
        }
    }

    reScanningAllTextArea() {
        this.tableRows = [];
        this.indexToAddRowInTable = 1;
        ((this.textarea.value.split(/\t|\n|\r|\s/)).filter(v => v != '')).forEach((word)=>{
            const indexOfThisWordInRowArray = this.tableRows.findIndex((rowObj)=>rowObj.word===word);
            if (indexOfThisWordInRowArray != -1) {
                this.tableRows[indexOfThisWordInRowArray].addCount();
            }
            else {
                this.tableRows.push(new Row(word, this.indexToAddRowInTable++));
            }
        });
        this.updateTable();
        this.currentGraph.resetAll();
        this.currentGraph.updateGraphForMaxCountWord(this.tableRows);
    }

    updateTable() {
        this.bodyTable.innerHTML = '';
        this.tableRows.forEach(obj => {
            obj.addRowToTable(this.bodyTable);
        });
    }
}
