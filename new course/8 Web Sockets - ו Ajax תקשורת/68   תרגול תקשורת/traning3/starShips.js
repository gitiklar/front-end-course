class Starships {
    constructor() {
        this.starShipsObj = {};
        this.allPilotsArray = [];
        this.currentGame = {
            currentStarShipIndex:0,
            currentRealPilotName:'',
        };
        this.setupUi();
        this.start();
    }

    async doGetFetch(url) {
        try {
            const response = await fetch(url);
            if(response.status === 200 && response.headers.get('content-type').startsWith('application/json')) {
                return await response.json();
            }
        } catch(err) {
            console.log(err);
        }
        
    }

    setupUi() {
        document.body.innerHTML = `
            <div class="left-side">
                <h1>Starships</h1>
                <div class="container">
                    <div class="starShip">
                        <label>StarShip name</label>
                        <select multiple class="custom-select" size="10">
                        </select>
                    </div>
                    <div class="pilots">
                        <label>Pilots</label>
                        <select multiple class="custom-select" size="10">
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="right-side">
                <p>
                    <span> Choose pilot... </span>
                    <span class="win"></span>
                </p>
                <button> new starship </button>
            </div>
        `;
        this.starShipNameSelectElement = document.querySelector('.starShip select');
        this.pilotsSelectElement = document.querySelector('.pilots select');
        this.winElement = document.querySelector('.right-side p .win');
        document.querySelector('.right-side button').addEventListener('click', () => {
            if(!this.starShipsObj.starShipsArray) return;
            this.clearSelects();
            this.displayNewStarShip();
        });
        this.pilotsSelectElement.addEventListener('change' , this.checkChosePilot.bind(this));
    }
    
    clearSelects() {
        this.starShipNameSelectElement.innerHTML = '';
        this.pilotsSelectElement.innerHTML = '';
        this.winElement.innerHTML = '';
    }

    checkChosePilot(evt) {
        if(evt.target.value === this.currentGame.currentRealPilotName) {
            this.winElement.classList.add('green');
            this.winElement.innerHTML = 'Very true - you won !!!';
        } else {
            this.winElement.classList.remove('green');
            this.winElement.innerHTML = 'Oops mistake try again';
        }
    }

    randomFromZero(countOfNumbers) {
        return Math.floor(Math.random()*countOfNumbers);
    }

    existsInRealPilotsArray(pilotName) {
        if(this.starShipsObj.starShipsArray[this.currentGame.currentStarShipIndex].pilots.findIndex(pilot=>pilot===pilotName) !==-1)
            return true;
        return false;
    }

    getRandomNames() {
        const names = [...Array(4)];
        let randomPilot = this.randomFromZero(this.allPilotsArray.length);
        let randomIndexToPush = this.randomFromZero(4);
        for(let i=0; i<=3; i++) {
            while(names.findIndex(name => this.allPilotsArray[randomPilot]===name) !==-1 || this.existsInRealPilotsArray(this.allPilotsArray[randomPilot])) randomPilot = this.randomFromZero(this.allPilotsArray.length);
            while(names[randomIndexToPush]) randomIndexToPush = this.randomFromZero(4);
            names[randomIndexToPush] = i!==3 ? this.allPilotsArray[randomPilot] : this.currentGame.currentRealPilotName;
        }
        return names;
    }
    
    fillSelectElement(innerOption , currentSelect) {
        const option = document.createElement('option');
        option.innerHTML = innerOption;
        option.value = innerOption;
        currentSelect.appendChild(option);
    }

    randomOneRealPilotName() {
        this.currentGame.currentRealPilotName = this.starShipsObj.starShipsArray[this.currentGame.currentStarShipIndex].pilots[this.randomFromZero(this.starShipsObj.starShipsArray[this.currentGame.currentStarShipIndex].pilots.length)];
    }

    fillPilotsElement() {
        this.randomOneRealPilotName();
        const names =  this.getRandomNames();
        names.forEach(name=>{
            this.fillSelectElement(name , this.pilotsSelectElement);
        });
    }

    fillStarShipElement() {
        this.fillSelectElement(this.starShipsObj.starShipsArray[this.currentGame.currentStarShipIndex].name , this.starShipNameSelectElement);
    }
    
    lotteryStarShipThatHasPilots() {
        this.currentGame.currentStarShipIndex = Math.floor(Math.random()*this.starShipsObj.starShipsCount);
        while(!this.starShipsObj.starShipsArray[this.currentGame.currentStarShipIndex].pilots.length) this.currentGame.currentStarShipIndex = Math.floor(Math.random()*this.starShipsObj.starShipsCount);
    }

    displayNewStarShip() {
        this.lotteryStarShipThatHasPilots();
        this.fillStarShipElement();
        this.fillPilotsElement();
    }

    addCurrentPilotToPilotsArray(name) {
        if(this.allPilotsArray.findIndex(pilot=>pilot===name)===-1) {
            this.allPilotsArray.push(name);
        } 
    }

    async getPilots(urlsPeople) {
        const pilotsNames = [];
        urlsPeople.forEach(async urlPilot => {
            pilotsNames.push((await this.doGetFetch(urlPilot)).name);
            this.addCurrentPilotToPilotsArray(pilotsNames[pilotsNames.length-1])
        });
        return pilotsNames;
    }    

    async getStarShipsArray() {
        let response = await this.doGetFetch('http://swapi.dev/api/starships/');
        const starShipsArray = [];
        do {
            response.results.forEach(async starshipObj => {
                starShipsArray.push({'name': starshipObj.name , 'pilots': await (this.getPilots(starshipObj.pilots)),});
            });
            response = response.next ? await this.doGetFetch(response.next) : null;
        } while(response);
        return starShipsArray;
    }

    async initializationStarshipsObj() {
        this.starShipsObj = {
                starShipsCount: (await this.doGetFetch("http://swapi.dev/api/starships/")).count,
                starShipsArray: await this.getStarShipsArray(),
        };
    }

    async start() {
        await this.initializationStarshipsObj();
        this.displayNewStarShip();
    }
}
const starShip = new Starships();