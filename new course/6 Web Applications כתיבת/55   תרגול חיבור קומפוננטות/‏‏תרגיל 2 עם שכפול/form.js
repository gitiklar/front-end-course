class Form {
    constructor(bus, formElement) {
        this.bus = bus;
        this.formElement = formElement;
        this.summaryObj = {};
        this.setupUi();
        this.currentPage = new Page1(this.CurrentPageContainer, this.bus);
        this.submit.addEventListener('click',this.submitFormClick);
    }

    setupUi() {
        this.formElement.innerHTML = `
            <h1>Form</h1>
            <div class="currentPageContainer"></div>
            </div>
            <button type="submit" class="btn btn-primary">Next</button>
        `;
        this.CurrentPageContainer = this.formElement.querySelector('.currentPageContainer');
        this.submit = this.formElement.querySelector('button');
    }

    submitFormClick = () => {
        this.bus.emit('submitFormClick', this.summaryObj);
        this.replaceToTheNextPage();
        event.preventDefault();
    }

    replaceToTheNextPage() {
        const pageName = this.currentPage.constructor.name;
        if(pageName === 'Page1') {
            this.currentPage = new Page2(this.CurrentPageContainer, this.bus);
        } else if(pageName == 'Page2') {
                    this.currentPage = new Page3(this.CurrentPageContainer, this.bus);
                    this.submit.innerHTML = 'Submit';
                    this.bus.emit('page3IsLoaded', this.summaryObj);
                } else {
                    this.CurrentPageContainer.innerHTML = "The form has been submitted successfully!!!";
                    this.formElement.style.border = "none";
                    this.formElement.style.fontSize = "5rem";
                    this.submit.style.display = "none";
                    this.formElement.querySelector('h1').style.display = "none";
                }
    }
}