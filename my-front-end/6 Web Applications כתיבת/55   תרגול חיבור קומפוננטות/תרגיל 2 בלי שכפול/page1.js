class Page1 {
    constructor(currentPageContainer, bus) {
        this.bus = bus;
        this.currentPageContainer = currentPageContainer;
        this.setupUi();
        this.unsubscribeSave = this.bus.subscribe('submitFormClick', this.saveDataBeforeLeave);
    }

    setupUi() {
        this.currentPageContainer.innerHTML = `
            <div class="form-group">
                <label for="name">Name</label>
                <input type="name" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
        `;
        
    }

    saveDataBeforeLeave = (summaryObj) => {
        const inputs = this.currentPageContainer.querySelectorAll('input');
        inputs.forEach(input=> {
                summaryObj[input.id] = input.value;
            }
        );
        this.unsubscribeSave();
    }
}