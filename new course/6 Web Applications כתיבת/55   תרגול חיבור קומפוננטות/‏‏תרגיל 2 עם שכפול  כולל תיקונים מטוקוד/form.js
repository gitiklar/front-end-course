class Form {
    constructor(bus, formElement, pageObjects) {
        this.pageObjects = pageObjects
        this.bus = bus;
        this.formElement = formElement;
        this.summaryObj = {};
        this.indexOfPage = 0;
        this.setupUi();
        this.updatePage();
        this.bus.subscribe('input', this.saveInput);
        this.bus.subscribe('selected', this.saveSelected);
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
        this.submit.addEventListener('click',this.submitFormClick);
    }

    updatePage() {
        if(this.indexOfPage < this.pageObjects.length) {
            this.CurrentPageContainer.innerHTML = '';
            this.CurrentPageContainer.appendChild(this.pageObjects[this.indexOfPage].getPage());
            if(this.indexOfPage === this.pageObjects.length - 1) {
                this.bus.emit('fillPageWithSummaryObj', this.summaryObj);
            }
            this.indexOfPage++;
        }
        else {
            this.CurrentPageContainer.innerHTML = "The form has been submitted successfully!!!";
            this.formElement.style.border = "none";
            this.formElement.style.fontSize = "5rem";
            this.submit.style.display = "none";
            this.formElement.querySelector('h1').style.display = "none";
        }
    }

    saveInput = () => {
        if(this.formElement.id === event.target.parentElement.id) {
            this.summaryObj[event.target.id] = event.target.value;
        }
    }

    saveSelected = (select) => {
        if(this.formElement.id === event.target.parentElement.id) {
            this.summaryObj['selected'] = [];
            [...select.children].forEach((option)=>{
                if(option.selected === true) {
                    this.summaryObj['selected'].push(option.textContent);
                }
            });
        }
    }

    submitFormClick = () => {
        this.updatePage();
        event.preventDefault();
    }
}