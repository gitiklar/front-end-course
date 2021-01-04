class Page3 {
    constructor(divPage, bus , formId) {
        this.bus = bus;
        this.divPage = divPage;
        this.formId = formId;
        this.setupUi();
        this.bus.subscribe('fillPageWithSummaryObj',this.fillPage);
    }

    setupUi() {
        this.divPage.innerHTML = `
        <div>
            <label>Name: &nbsp <span class="name"></span></label>
        </div>
        <div>
            <label>Email: &nbsp <span class="email"></span></label>
        </div>
        <div>
            <label>Your choices:</label>
        </div>
        <ul class="list-group">
           
        </ul>
        `;
        this.divPage.id = `${this.formId}`;
        this.name = this.divPage.querySelector('.name');
        this.email = this.divPage.querySelector('.email');
        this.listGroup = this.divPage.querySelector('.list-group');
    }

    getPage() {
        return this.divPage;
    }

    fillPage = (summaryObj)=> {
        if(this.formId === event.target.parentElement.id) {
            this.name.textContent = summaryObj['name'];
            this.email.textContent = summaryObj['email'];
            for(let obj of summaryObj['selected']) {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = obj;
                this.listGroup.appendChild(li);
            }
        }
    }
}