"use strict";

class Game {
    constructor(container, animals) {
        this.container = container;
        this.animals = animals;
        this.numOfRaffle = 0;

        this.instructions = document.querySelector('.instructions');
        this.intro = document.querySelector('.intro');
        this.startBtn = document.querySelector('#start');
        this.repeatBtn = document.querySelector('#repeat-sound');

        this.startBtn.addEventListener('click',this.start.bind(this));
        this.repeatBtn.addEventListener('click',this.Sound.bind(this,this.num));
        this.container.addEventListener('click',this.checkIfGood.bind(this));
    }

    start() {
        this.instructions.style.display = 'block';
        this.repeatBtn.style.display = 'block';
        this.intro.style.display = 'none';
        for(let animal of this.animals) {
            animal.render(this.container);
        }
        this.raffleAnimalAndGoSound();
    }

    raffleAnimalAndGoSound() {
        this.numOfRaffle = Math.floor(Math.random()*this.animals.length);
        this.Sound();
    }

    Sound() {
        this.animals[this.numOfRaffle].play();
    }

    checkIfGood() {
        if(event.target.animal===this.animals[this.numOfRaffle]) {
            alert('כל הכבוד לאיצי המתוקי!!! נעבור לצליל הבא.');
            this.animals[this.numOfRaffle].stop();
            this.raffleAnimalAndGoSound();
        }
        else {
            alert('טעות נסה שוב.');
        }
    }
}

class Animal {
    constructor(imgSrc,sound) {
        this.imgSrc = imgSrc;
        this.auodioElement = new Audio(sound);
    }
    
    render(container) {
        const img = document.createElement('img');
        img.setAttribute('src',this.imgSrc);
        img.animal = this;
        container.appendChild(img);
    }

    play() {
        this.auodioElement.play();
    }

    stop() {
        this.auodioElement.pause();
    }
}


const container = document.querySelector('.animals');
const animals = [
    new Animal('jpg/cat.jpg','mp3/cat.mp3'),
    new Animal('jpg/dog.jpg','mp3/dog.mp3'),
    new Animal('jpg/bird.jpg','mp3/bird.mp3'),
    new Animal('jpg/pigeon.jpg','mp3/pigeon.mp3'),
    new Animal('jpg/cow.jpg','mp3/cow.mp3'),
    new Animal('jpg/horse.jpg','mp3/horse.mp3'),
    new Animal('jpg/duck.jpg','mp3/duck.wav')
];

const game = new Game(container,animals);