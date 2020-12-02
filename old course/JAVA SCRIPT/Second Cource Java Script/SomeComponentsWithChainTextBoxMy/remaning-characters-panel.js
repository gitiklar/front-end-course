class RemaningCharactersPanel extends Panel{
    constructor(panel,parent) {
        super(panel,parent);
        this.el.title.textContent = 'Remaning characters panel: ';
        this.constructor = RemaningCharactersPanel;
    }
    
    updateValue() {
        this.insertValue(this.el.parent.el.maxValue- this.el.textArea.value.length);
    }
}