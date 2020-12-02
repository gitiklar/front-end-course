class Panel  {
    constructor (divForPanel , bus) {
        this.divForPanel = divForPanel;
        this.bus = bus;
        this.unsubscribeOnLoad = this.bus.subscribe('load',this.updateValue);
        this.unsubscribeInput = this.bus.subscribe('input',this.updateValue);
    }
    
    setUpUi (innerHTML) {
        this.divForPanel.innerHTML = innerHTML;
        this.value = this.divForPanel.querySelector('.value');
        this.divForPanel.addEventListener('click', this.emitPanelClick);
    }

    updateValue = (divContainerClassName) => {
        if(this.divForPanel.parentElement.className === divContainerClassName) {
               this.value.textContent = this.getValue();
        } 
     }

    emitPanelClick = ()=> {
        this.unsubscribeOnLoad();
        this.unsubscribeInput();
        this.bus.emit('panelClick');
    }
}


