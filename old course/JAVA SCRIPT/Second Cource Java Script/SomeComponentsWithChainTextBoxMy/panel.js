class Panel {
    constructor(panel,parent) {
        this.el = {
            panel: panel,
            parent: parent,
            title: panel.querySelector('.title'),
            value: panel.querySelector('.value'),
            textArea: parent.el.textarea
        }
    }
    
    insertValue(value) {
            this.el.value.textContent = value;
    }
}