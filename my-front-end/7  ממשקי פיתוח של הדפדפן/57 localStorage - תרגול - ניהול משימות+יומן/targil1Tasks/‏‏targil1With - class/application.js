class application {
    constructor(form) {
        this.text = document.querySelector('.text');
    
        this.rows = [];

        this.indexToAddRow = 1;

        this.templete = document.querySelector('.templete').innerHTML;

        form.addEventListener('submit',this.addRowToRowsTemp.bind(this));

        if(localStorage.array) {
            this.updateTableFromStorage();
        }
    }

    updeteIndexAfterRemoveRow() {
        this.indexToAddRow--;
    }
    
    getRowsArray() {
        return this.rows;
    }
    
    addRowToRowsTemp() {
        event.preventDefault();
        this.addRowandUpdateInHtmlAndArrayAndLocalStorage(this.text.value ,this.indexToAddRow++,false);
    }
    
    addRowandUpdateInHtmlAndArrayAndLocalStorage (task , indexToAddRow,status) {
        let newRow = new row(task ,indexToAddRow,status);
        let templete = this.templete; let rows = this.rows;
        newRow.addRowToTableInHTML(templete);
        newRow.updateRowInArrayandLocalStorage(rows);
        this.text.value = '';
    }
    
    updateTableFromStorage() {
        let rowsFromStorage = JSON.parse(localStorage.getItem('array'));
        for(let i =0;i<rowsFromStorage.length;i++) {
            this.addRowandUpdateInHtmlAndArrayAndLocalStorage(rowsFromStorage[i].task,rowsFromStorage[i].indexToAddRow,rowsFromStorage[i].status);
        }
        this.indexToAddRow = ++rowsFromStorage.length;
    }

}

