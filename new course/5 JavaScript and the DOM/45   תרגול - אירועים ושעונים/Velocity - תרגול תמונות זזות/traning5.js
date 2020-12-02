'use strict';
function MemoryGame() {
    this.images = document.querySelector('.imageContainer');
    this.randomPlaceForAllImages = [];
    this.startMove();
    setInterval(this.startMove.bind(this), 1000);
}

MemoryGame.prototype.calculateLeftWidth = function() {
    this.left.style.width = document.body.clientWidth - this.buttons.clientWidth + 'px';
}

MemoryGame.prototype.startMove = function() {
    this.randomPlaceForAllImages = [];
    [...this.images.children].forEach(()=> {
        let x = Math.floor(Math.random()*(document.body.clientWidth - 200));
        let y = Math.floor(Math.random()*(document.body.clientHeight - 150));
        this.randomPlaceForAllImages.push({"x":x,"y":y});
    });

    [...this.images.children].forEach((img,index)=>{
        Velocity(img,{left:this.randomPlaceForAllImages[index].x,top:this.randomPlaceForAllImages[index].y},{duration:1000});
    });
}

const memoryGame = new MemoryGame();
