class Panel {
    constructor(panel,parent) {
        this.el = {
            panel: panel,
            title: panel.querySelector('.title'),
            value: panel.querySelector('.value'),
        }
        this.parent = parent;
    }
    
    updateValue() {
            this.el.value.textContent = this.getValue(this.parent.CurrentLength(),this.parent.maxValue);
    }
    
}