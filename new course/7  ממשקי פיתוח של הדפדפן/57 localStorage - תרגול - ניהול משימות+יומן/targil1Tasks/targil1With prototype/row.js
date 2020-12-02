function Row(task ,indexToAddRow,status) {
    this.table = document.querySelector('tbody');

    this.indexToAddRow = indexToAddRow;
    this.task = task;
    this.status = status;
}

Row.prototype.deleteRow = function (tr) {
    tr.remove();
    let rowsArray = application.getRowsArray();
    rowsArray.splice(this.indexToAddRow-1,1);

    rowsArray.forEach((element,index) => { 
        element.indexToAddRow = index+1;
    });
    
    this.localStorageUpdate(rowsArray)
    this.table = document.querySelector('tbody');
    let ths = this.table.querySelectorAll('th');
    
    ths.forEach((item,index)=>item.innerHTML = index+1);

    application.updeteIndexAfterRemoveRow();
}

Row.prototype.updateCheckBox = function(){
    this.status = !this.status;
    this.localStorageUpdate(application.getRowsArray())
}

Row.prototype.addRowToTableInHTML = function(templete) {
    let tr = document.createElement('tr');
    tr.innerHTML = templete;
    tr.querySelector('th:nth-child(1)').innerHTML = this.indexToAddRow;
    tr.querySelector('td:nth-child(2)').innerHTML = this.task;
    tr.querySelector('[type=checkbox]').checked = this.status;

    this.table.appendChild(tr);
    tr.querySelector('button').addEventListener('click',this.deleteRow.bind(this,tr));
    tr.querySelector('[type=checkbox]').addEventListener('click',this.updateCheckBox.bind(this));
}

Row.prototype.updateRowInArrayandLocalStorage = function(rows) {
    rows.push(this);
    this.localStorageUpdate(rows)
}
Row.prototype.localStorageUpdate = function(array) {
    localStorage.setItem('array',JSON.stringify(array));
}