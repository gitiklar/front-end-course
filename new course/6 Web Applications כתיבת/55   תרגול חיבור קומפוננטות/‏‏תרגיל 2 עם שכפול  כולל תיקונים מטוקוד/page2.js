class Page2 {
    constructor(divPage, bus , formId) {
        this.bus = bus;
        this.divPage = divPage;
        this.formId = formId;
        this.setupUi();
    }

    setupUi() {
        this.divPage.innerHTML = `
        <select name="select" class="custom-select" multiple id="${this.formId}">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
        </select>
        `;
        this.select = this.divPage.querySelector('select');
        this.divPage.addEventListener('click',() =>{
            if(event.target.tagName === "OPTION") {
                this.bus.emit('selected', this.select);
            }
        });
    }

    getPage() {
        return this.divPage;
    }
}