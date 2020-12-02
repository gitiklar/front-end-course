class row {
    constructor(task ,indexToAddRow,status) {
        this.table = document.querySelector('tbody');
        this.indexToAddRow = indexToAddRow;
        this.task = task;
        this.status = status;
    }

    
    deleteRow(tr) {
        tr.remove();
        let rowsArray = application.getRowsArray();
        rowsArray.splice(this.indexToAddRow-1,1);
        for(let i=0;i< rowsArray.length;i++) {
            rowsArray[i].indexToAddRow = i+1;
        }
        this.localStorageUpdate(rowsArray);
        this.table = document.querySelector('tbody');
        let ths = this.table.querySelectorAll('th');

        for (let i = 0; i < ths.length; i++) {
            ths[i].innerHTML = i+1;
        }
        application.updeteIndexAfterRemoveRow();
    }

    updateCheckBox(){
        this.status = !this.status;
        this.localStorageUpdate(application.getRowsArray());
    }

    addRowToTableInHTML(templete) {
        let tr = document.createElement('tr');
        tr.innerHTML = templete;
        tr.querySelector('th:nth-child(1)').innerHTML = this.indexToAddRow;
        tr.querySelector('td:nth-child(2)').innerHTML = this.task;
        tr.querySelector('[type=checkbox]').checked = this.status;

        this.table.appendChild(tr);
        tr.querySelector('button').addEventListener('click',this.deleteRow.bind(this,tr));
        tr.querySelector('[type=checkbox]').addEventListener('click',this.updateCheckBox.bind(this));
    }

    updateRowInArrayandLocalStorage(rows) {
        rows.push(this);
        this.localStorageUpdate(rows);
    }

    localStorageUpdate(array) {
        localStorage.setItem('array',JSON.stringify(array));
    }
}