class Page2 {
    constructor(currentPageContainer, bus) {
        this.bus = bus;
        this.currentPageContainer = currentPageContainer;
        this.setupUi();
        this.unsubscribeSave = this.bus.subscribe('submitFormClick',this.saveDataBeforeLeave);
    }

    setupUi() {
        this.currentPageContainer.innerHTML = `
        <select name="select" class="custom-select" multiple>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
        </select>
        `;
    }

    saveDataBeforeLeave = (summaryObj)=> {
        if(this.currentPageContainer.parentElement.id === event.target.parentElement.id) {
            summaryObj['selected'] = [];
            const options =  this.currentPageContainer.querySelector('[name="select"]').children;
            for(let option of options) {
                if(option.selected === true) {
                    summaryObj['selected'].push(option.textContent);
                }
            }
            this.unsubscribeSave();
        }
    }
}