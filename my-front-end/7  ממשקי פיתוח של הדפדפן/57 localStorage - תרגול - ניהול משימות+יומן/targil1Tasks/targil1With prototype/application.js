function Application(form) {
    
    this.text = form.querySelector('.text');
    
    this.rows = [];

    this.indexToAddRow = 1;

    this.templete = document.querySelector('.templete').innerHTML;

    form.addEventListener('submit',this.addRowToRowsTemp.bind(this));

    if(localStorage.array) {
        this.updateTableFromStorage();
    }
}

Application.prototype.updeteIndexAfterRemoveRow = function() {
    this.indexToAddRow--;
}

Application.prototype.getRowsArray = function() {
    return this.rows;
}

Application.prototype.addRowToRowsTemp = function() {
    event.preventDefault();
    this.addRowandUpdateInHtmlAndArrayAndLocalStorage( this.text.value ,this.indexToAddRow++,false);
}

Application.prototype.addRowandUpdateInHtmlAndArrayAndLocalStorage = function (task , indexToAddRow,status) {
    let newRow = new Row(task ,indexToAddRow,status);
    let templete = this.templete; let rows = this.rows;
    newRow.addRowToTableInHTML(templete);
    newRow.updateRowInArrayandLocalStorage(rows);
    this.text.value = '';
}

Application.prototype.updateTableFromStorage = function() {
    let rowsFromStorage = JSON.parse(localStorage.getItem('array'));
    for(let i =0;i<rowsFromStorage.length;i++) {
    }
    this.indexToAddRow = ++rowsFromStorage.length;

    rowsFromStorage.forEach(obj => {
        this.addRowandUpdateInHtmlAndArrayAndLocalStorage(obj.task, obj.indexToAddRow,obj.status);
    });
}