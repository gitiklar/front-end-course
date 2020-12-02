class Row {
    constructor(word, indexToAddRowInTable) {
        this.indexToAddRowInTable = indexToAddRowInTable;
        this.word = word;
        this.count = 1;
    }

    addCount() {
        this.count++;
    }

    addRowToTable(bodyTable) {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        const tdWord = document.createElement('td');
        const tdCount = document.createElement('td');
        th.innerHTML = this.indexToAddRowInTable;
        tdWord.innerHTML = this.word;
        tdCount.innerHTML = this.count;
        row.appendChild(th);
        row.appendChild(tdWord);
        row.appendChild(tdCount);
        bodyTable.appendChild(row);
    }

    createGraph(svgTextContainer,svgRectContainer, indexToAddWordInGraph) {
        svgTextContainer.children[indexToAddWordInGraph].innerHTML = this.word;
        if(this.count<=10) {
            svgRectContainer.children[indexToAddWordInGraph].setAttribute('height',this.count*50);
            svgRectContainer.children[indexToAddWordInGraph].setAttribute('y',480-this.count*50);
        }
        else{
            svgRectContainer.children[indexToAddWordInGraph].setAttribute('height',500);
            svgRectContainer.children[indexToAddWordInGraph].setAttribute('y',-20);
        }
    }
}