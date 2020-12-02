
class Table {
    constructor(el, bus) {
        this.el = el;
        this.bus = bus;
        this.setupUi();
        this.bus.subscribe('submit' , this.addRow);
        this.bus.subscribe('saveData' , this.saveData)
    }

    setupUi() {
        this.el.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tasks</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        this.el.classList.add('table');
        this.tbody = this.el.querySelector('tbody');
        this.tbody.addEventListener('click',()=>{
            this.bus.emit('clickRow');
            this.bus.emit('saveData');
        });
        this.bus.emit('getDataFromLocalStorage' , this.tbody);
        if(this.tbody.innerHTML) {
            new Row('tmp' , this.bus);
        }
    }

    addRow = (task)=> {
        this.tbody.appendChild(new Row(task ,this.bus).getRow());
        this.bus.emit('saveData');
    }

    saveData = ()=> {
        this.bus.emit('saveDataToLocalStorage' , this.tbody.innerHTML);
    }
}