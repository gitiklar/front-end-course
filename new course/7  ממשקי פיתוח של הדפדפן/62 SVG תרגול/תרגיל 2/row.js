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
}