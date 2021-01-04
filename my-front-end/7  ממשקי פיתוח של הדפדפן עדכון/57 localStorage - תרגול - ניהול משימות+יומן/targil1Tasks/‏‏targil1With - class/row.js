class Row {
    constructor(task , bus) {
        this.task = task;
        this.bus = bus;
        this.row = document.createElement('tr');
        this.bus.subscribe('clickRow', this.checkClick);
    }

    getRow() { 
        this.row.innerHTML = `
            <th scope="row" class="numberRow"></th>
            <td>${this.task}</td>
            <td><input type="checkbox"></td>
            <td><button>Delete</button></td>
        `;
        return this.row;
    }

    checkClick = ()=>{
        if(event.target.tagName === 'INPUT') {
            if(event.target.checked === true) {
                event.target.setAttribute('checked' , true);
            }
            else {
                event.target.removeAttribute('checked');
            }
        }
        if(event.target.tagName === 'BUTTON') {
            event.target.parentNode.parentNode.remove();
            this.bus.emit('saveData');
        }
    }
}