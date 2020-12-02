class CurrentLengthPanel extends Panel{
    constructor(panel,parent) {
        super(panel,parent);
        this.el.title.textContent = 'Current length panel: ';
        this.constructor = CurrentLengthPanel;
    }
    
    getValue(currentL,maxL) {
        return currentL;
    }
}