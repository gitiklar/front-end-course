class StarWars {
    constructor() {
        this.setupUi();
        this.renderPepolesList();
        this.peopleFilmsUrlsObj = {};
        this.filmsOpeningCrawlObj = {};
    }

    async doGetFetch(url) {
        const response = await fetch(url);
        if(response.status === 200 && response.headers.get('content-type').startsWith('application/json')) {
            return await response.json();
        }
    }

    setupUi() {
        document.body.innerHTML = `
            <div class="left-side">
                <h1>Star Wars</h1>
                <div class="container">
                    <div class="peoples">
                        <label>Characters</label>
                        <select multiple class="custom-select" size="10">
                        </select>
                    </div>
                    <div class="films">
                        <label>Films</label>
                        <select multiple class="custom-select" size="10">
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="right-side">
            </div>
        `;
        this.peoplesSelect = document.querySelector('.peoples select');
        this.filmsSelect = document.querySelector('.films select');
        this.rightSide = document.querySelector('.right-side');
        this.peoplesSelect.addEventListener('change',this.displayFilms.bind(this));
        this.filmsSelect.addEventListener('change',this.displayOpeningCrawl.bind(this));
    }

    async renderPepolesList() {
        let peoplesListHtml = ``;
        const peoplesList = (await this.doGetFetch("http://swapi.dev/api/people/")).results;
        for(let people of peoplesList) {
            const name = people.name;
            this.peopleFilmsUrlsObj[name] = people.films;
            peoplesListHtml+=`<option value="${name}">${name}</option>`;
        }
        this.peoplesSelect.innerHTML = peoplesListHtml;
    }

    async displayFilms(evt) {
        evt.stopImmediatePropagation();
        this.currentPeople = evt.target.value;
        this.rightSide.innerHTML = '';
        let filmsListHtml = ``;
        for(let filmUrl of this.peopleFilmsUrlsObj[this.currentPeople]) {
            const response = await this.doGetFetch(filmUrl);
            const film = response.title;
            this.filmsOpeningCrawlObj[film] = response.opening_crawl;
            filmsListHtml+=`<option value="${film}">${film}</option>`;
        };
        this.filmsSelect.innerHTML = filmsListHtml;
    }

    async displayOpeningCrawl(evt) {
        evt.stopImmediatePropagation();
        this.rightSide.innerHTML = `
            <p> 
                <span>${this.currentPeople}</span>
                ${this.filmsOpeningCrawlObj[evt.target.value]};
            </p>
        `;
    }
}
new StarWars();