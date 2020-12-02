class lengthDuplicatePanel extends Panel{
    constructor(panel,parent) {
        super(panel,parent);
        this.el.title.textContent = "Length duplicate panel";
        this.constructor = lengthDuplicatePanel;
    }
    
    getValue(currentL,maxL) {
            return currentL*2;
    }
}