class Page3 {
    constructor(currentPageContainer, bus) {
        this.bus = bus;
        this.currentPageContainer = currentPageContainer;
        this.setupUi();
        this.bus.subscribe('page3IsLoaded',this.fillPage);
    }

    setupUi() {
        this.currentPageContainer.innerHTML = `
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
        this.name = this.currentPageContainer.querySelector('.name');
        this.email = this.currentPageContainer.querySelector('.email');
        this.listGroup = this.currentPageContainer.querySelector('.list-group');
    }

    fillPage = (summaryObj)=> {
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