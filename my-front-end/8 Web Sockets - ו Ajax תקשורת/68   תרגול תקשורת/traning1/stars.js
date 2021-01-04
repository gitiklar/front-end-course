class StarWars {
    constructor() {
        this.setupUi();
        this.renderPepolesList();
        this.peopleFilmsUrlsObj = {};
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
                <ul class="list-group peoples">
                </ul>
            </div>
            
            <div class="right-side">
                <ul class="list-group films">
                </ul>
            </div>
        `;
        this.peopleUl = document.querySelector('ul.peoples');
        this.filmsUl = document.querySelector('ul.films');
        this.peopleUl.addEventListener('click',this.renderFilms.bind(this));
    }

    buildFrag(frag , innerSpan , innerButton = null) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList.add('list-group-item');
        span.innerHTML = innerSpan;
        li.appendChild(span);
        if(innerButton) {
            const button = document.createElement('button');
            button.innerHTML = innerButton;
            li.appendChild(button);
        }
        frag.appendChild(li);
    }

    async renderPepolesList() {
        const frag = document.createDocumentFragment();
        let response = await this.doGetFetch("http://swapi.dev/api/people/");
        do {
            let peoplesList = response.results;
            for(let people of peoplesList) {
                const name = people.name;
                this.peopleFilmsUrlsObj[name] = people.films;
                this.buildFrag(frag , name , 'list of my films');
            }
            response = response.next? await this.doGetFetch(response.next) : null;
        } while(response);
        this.peopleUl.appendChild(frag);
    }

    async renderFilms(evt) {
        evt.stopImmediatePropagation();
        if(evt.target.tagName!=='BUTTON') return;
        const frag = document.createDocumentFragment();
        for(let filmUrl of this.peopleFilmsUrlsObj[evt.target.previousElementSibling.innerHTML]) {
            const film = (await this.doGetFetch(filmUrl)).title;
            this.buildFrag(frag , film);
        };
        this.filmsUl.innerHTML = '';
        this.filmsUl.appendChild(frag);
    }
}
new StarWars();