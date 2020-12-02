class RemaningCharactersPanel extends Panel{
    constructor(panel,parent) {
        super(panel,parent);
        this.el.title.textContent = 'Remaning characters panel: ';
        this.constructor = RemaningCharactersPanel;
    }
    
    getValue(currentL,maxL) {
        return maxL-currentL;
    }
}