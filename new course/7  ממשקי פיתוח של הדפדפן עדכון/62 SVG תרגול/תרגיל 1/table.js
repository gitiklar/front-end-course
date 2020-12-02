class Table {
    constructor(containerTextAreaAndTable, bus) {
        this.bus = bus;
        this.setupUi(containerTextAreaAndTable);
        this.bus.subscribe('input', this.createTableFromObj);
    }

    setupUi(containerTextAreaAndTable) {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');
        table.innerHTML= `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Word</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        containerTextAreaAndTable.appendChild(table);
        this.tbody = table.querySelector('tbody');
    }
    
    createTableFromObj = ()=> {
        this.objectsArrayOfWordsAndSum = [];
        this.bus.emit('getObjectsArrayOfWordsAndSum', this.objectsArrayOfWordsAndSum);
        this.sortObjectsArrayOfWordsAndSum();
        this.createTableByObjectsArray();
        this.bus.emit('objectArrayIsReady', this.objectsArrayOfWordsAndSum);
    }

    sortObjectsArrayOfWordsAndSum() {
        this.objectsArrayOfWordsAndSum = this.objectsArrayOfWordsAndSum.sort((a,b)=>b[Object.keys(b)[0]] - a[Object.keys(a)[0]]);
    }

    createTableByObjectsArray() {
        this.tbody.innerHTML = '';
        this.objectsArrayOfWordsAndSum.forEach((obj)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#</td>
                <td>${Object.keys(obj)[0]}</td>
                <td>${obj[Object.keys(obj)[0]]}</td>
            `;
            this.tbody.appendChild(tr);
        });
    }
}