class Game {
    constructor(container,ammountOfChairs) {
        this.btnStart = document.querySelector('.btnStart');
        this.btnAgain = document.querySelector('.btnAgain');

        this.ammountOfChairs = ammountOfChairs;
        this.container = container;
        this.myAudio = new Audio ("song.mp3");
        this.numToStopAudio = 0;

        this.btnStart.addEventListener('click',this.startGame.bind(this));
        this.btnAgain.addEventListener('click',this.againGame.bind(this));
    }
    
    startGame() {
        this.btnStart.style.display = 'none';
        this.createImages();
        this.startAudioAndRaffleNumToStop();
    }

    createImages() {
        const frag = document.createDocumentFragment();  
        for(let i=0 ;i<this.ammountOfChairs;i++) {
            const img = document.createElement('img');
            img.src = "chair.jpg";
            img.style.width = `${100/this.ammountOfChairs}%`;
            img.style.display ='inline-block';
            frag.appendChild(img);
        }
        this.container.innerHTML = '';
        this.container.appendChild(frag);
    }
    
    raffle() {
        this.numToStopAudio = Math.floor(Math.random()*20);
    }

    startAudioAndRaffleNumToStop() {
        this.myAudio.play();
        this.raffle();
        this.startTimeReturnPromise().then(this.afterEndTime.bind(this));
    }

    afterEndTime() {
        this.myAudio.pause();
        this.myAudio.currentTime = 0;
        this.btnAgain.style.display = 'block';
    }

    setTimeOutStart(resolve) {
        setTimeout(resolve,this.numToStopAudio*1000);
    }

    startTimeReturnPromise() {
        return new Promise(this.setTimeOutStart.bind(this));
    }

    againGame() {
        this.btnAgain.style.display = 'none';
        this.ammountOfChairs--;
        if(this.ammountOfChairs>0) {
            this.createImages();
            this.startAudioAndRaffleNumToStop();
        }
        else{
            this.container.innerHTML = '- - - סוף - - -';
        }
    }
}

const container = document.querySelector('.container');
const gameChairs = new Game(container,10);