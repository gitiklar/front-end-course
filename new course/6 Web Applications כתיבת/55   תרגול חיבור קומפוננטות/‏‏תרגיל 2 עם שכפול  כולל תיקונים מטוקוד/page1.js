class Page1 {
    constructor(divPage, bus , formId) {
        this.bus = bus;
        this.divPage = divPage;
        this.formId = formId;
        this.setupUi();
    }

    setupUi() {
        this.divPage.innerHTML = `
            <div class="form-group" id="${this.formId}">
                <label for="name">Name</label>
                <input type="name" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group" id="${this.formId}">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
        `;
        this.divPage.addEventListener('input',()=>{this.bus.emit('input')});
    }

    getPage() {
        return this.divPage;
    }
}