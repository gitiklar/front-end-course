'use strict';
function MemoryGame() {
    this.images = document.querySelector('.imageContainer');
    this.buttons = document.querySelector('.right');
    this.left = document.querySelector('.left');
    this.clock = document.querySelector('.clock');
    this.winnerAlert = document.querySelector('.winnerAlert');
    this.timeOutContainer = document.querySelector('.timeOutContainer');
    this.timeOutContainer.style.display = "none";
    this.clock.style.display = "none";
    this.winnerAlert.style.display = "none";
    this.countCards = 16;
    this.timeOut = 0;
    this.song = new Audio('song.wav');
    this.song.currentTime = 0;
    this.song.addEventListener('ended', ()=>{
        this.song.currentTime = 0;
        this.song.play();
    });
    this.winnerSong = new Audio('winnerSong.mp3');
    this.buttons.addEventListener(('click'), this.createleLevel.bind(this));
    this.images.addEventListener('click',this.play.bind(this));
    this.clearImagesClassesAndRandomNews();    
    this.createCardsArrayByImageClassesAndHideCards();
    this.calculateLeftWidth();
}

MemoryGame.prototype.calculateLeftWidth = function() {
    this.left.style.width = document.body.clientWidth - this.buttons.clientWidth + 'px';
}

MemoryGame.prototype.clearImagesClassesAndRandomNews = function() {
    [...this.images.children].forEach((img)=>img.className="");
    const arrRandomNumbers = [];
    [...this.images.children].forEach((image)=>{
        if(arrRandomNumbers.length < this.countCards) {
            let randomNumber = Math.floor(Math.random()*this.countCards) + 1;
            while(arrRandomNumbers.find((num)=>randomNumber===num)) {
                randomNumber = Math.floor(Math.random()*this.countCards) + 1;
            }
            arrRandomNumbers.push(randomNumber);
            image.classList.add(`c${randomNumber}`);
        } else {
            image.classList.add('display-none');
        }
    });
}

MemoryGame.prototype.createCardsArrayByImageClassesAndHideCards = function() {
    this.cards = [];
    [...this.images.children].forEach((img,index)=> {
        if(index >= this.countCards) return;
        this.cards.push({class:`${img.classList[0]}`, visible: "false", found: "false"});
        img.setAttribute('src',(img.getAttribute('src')).concat('xxx'));
    });
}

MemoryGame.prototype.createleLevel = function() {
    if(event.target.tagName === "BUTTON") {
        this.song.play();
        this.timeOut = 0;
        this.clock.style.display = "none";
        this.winnerAlert.style.display = "none";
        this.timeOutContainer.style.display = "none";
        clearInterval(this.timerIdForHardLevel);
        if(event.target.classList.contains('easy')) {
            this.countCards = 16;
            this.clearImagesClassesAndRandomNews();
            this.changeToSmallGameClass();

        } else {
            this.countCards = 30;
            this.clearImagesClassesAndRandomNews();
            this.changeToLargGameClass();
            if(event.target.classList.contains('hard')) {
                this.startTimerIdForHardLevel();
            }
        }
        this.createCardsArrayByImageClassesAndHideCards();
    }
}

MemoryGame.prototype.startTimerIdForHardLevel = function() {
    var clock = document.querySelector('.clock');
    this.clock.style.display = "block";
    var innerHTML = document.querySelector('.noscript').innerHTML;
    clock.innerHTML = innerHTML;
    var that = this;
    var digitSegments = [
        [1,2,3,4,5,6],
        [2,3],
        [1,2,7,5,4],
        [1,2,7,3,4],
        [6,7,2,3],
        [1,6,7,3,4],
        [1,6,5,4,3,7],
        [1,2,3], 
        [1,2,3,4,5,6,7],
        [1,2,7,3,6]
    ]
        var _minutes = document.querySelectorAll('.minutes');
        var _seconds = document.querySelectorAll('.seconds');
        var minutes = 2, seconds = 0;  
        this.timerIdForHardLevel = setInterval(function() {

      
    
        setNumber(_minutes[0], Math.floor(minutes/10));
        setNumber(_minutes[1], minutes%10, 1);
    
        setNumber(_seconds[0], Math.floor(seconds/10));
        setNumber(_seconds[1], seconds%10, 1);
        
        seconds--;
        if(seconds <= 0 && minutes>0) {
            seconds = 59;
            minutes--;
        }

        if(seconds ===0 && minutes===0) {
           setTimeout(()=>{
                setNumber(_minutes[0], -1);
                setNumber(_minutes[1], -1);
                that.timeOut = 1;
                that.timeOutContainer.style.display = "block";
                clearInterval(that.timerIdForHardLevel);
                clearInterval(that.tmpTimerId1);
           },2000);
        }
      }, 1000);
    
    
    
      var setNumber = function(digit, number) {
        var segments = digit.querySelectorAll('.segment');
        var current = parseInt(digit.getAttribute('data-value'));
      
        // only switch if number has changed or wasn't set
        if (!isNaN(current) && current != number) {
          // unset previous number
            digitSegments[current].forEach(function(digitSegment, index) {
                setTimeout(function() {
                  segments[digitSegment-1].classList.remove('on');
                }, index*45)
              });          
        }
        
        if (isNaN(current) || current != number) {
          // set new number after
          setTimeout(function() {
              if(number!=-1) {
                   digitSegments[number].forEach(function(digitSegment, index) {
                    that.tmpTimerId1 = setTimeout(function() {
                      segments[digitSegment-1].classList.add('on');
                    }, index*45)
                  });
              }
               
          }, 250);
          digit.setAttribute('data-value', number);
        }
      }
}

MemoryGame.prototype.changeToSmallGameClass = function() {
    this.images.className = "smallGameImageContainer";
    [...this.images.children].forEach((img)=>{
        img.classList.add('imgSmallGame');
    });
}


MemoryGame.prototype.changeToLargGameClass = function() {
    this.images.className = "largeGameImageContainer";
    [...this.images.children].forEach((img)=>{
        img.classList.add('imgLargeGame');
    });
}

MemoryGame.prototype.srcImageWithoutX = function(srcName) {
    return srcName.replace(/x+/g,"");
}

MemoryGame.prototype.turnOffAllNotFoundImagesIFThereIsTwoOpenImages = function() {
    let count = 0;
    this.cards.forEach((card,index)=>{
        if(card.found==="false") {
            if(!this.images.children[index].getAttribute('src').endsWith('x')) {
                count++;
            }
        }
    });

    if(count === 2) {
        this.cards.forEach((card,index)=> {
            if(card.found === "false") {
                this.images.children[index].setAttribute('src',this.images.children[index].getAttribute('src').concat('xxx'));
            }
        })
    }
}

MemoryGame.prototype.imageIsFace = function(imageClick) {
   return !(imageClick.getAttribute('src')).endsWith('x');
}

MemoryGame.prototype.winner = function() {
    if(this.cards.find((obj)=>{ return obj.found === "false" }))
        return false;
    return true;
}

MemoryGame.prototype.play = function() {
    if(event.target.tagName === 'IMG' && !this.timeOut) {
        if(!this.imageIsFace(event.target)) {
            this.turnOffAllNotFoundImagesIFThereIsTwoOpenImages();
            clearTimeout(this.timerIdToHideImage);
            if(event.target.getAttribute('src').endsWith('x')) {
                this.indexOfVisibleTrueInCardsArray = this.cards.findIndex((card)=> card.visible === "true");
                this.indexOFClickInCardsArray = this.cards.findIndex((card)=> card.class === event.target.classList[0]);
                let imageAnimate = this.images.children[this.indexOFClickInCardsArray];
                Velocity(imageAnimate,{opacity: 1},{duration: 0});
                Velocity(imageAnimate, {transform: "rotateY(180deg)"},{duration: 200});
                setTimeout(()=> {
                    if(this.indexOfVisibleTrueInCardsArray === -1) {
                        this.cards[this.indexOFClickInCardsArray].visible = "true";
                        this.images.children[this.indexOFClickInCardsArray].setAttribute('src', this.srcImageWithoutX(this.images.children[this.indexOFClickInCardsArray].getAttribute('src')));
                    } 
                    else {
                        this.images.children[this.indexOFClickInCardsArray].setAttribute('src', this.srcImageWithoutX(this.images.children[this.indexOFClickInCardsArray].getAttribute('src')));
                        this.cards[this.indexOfVisibleTrueInCardsArray].visible = "false";
                        if(this.images.children[this.indexOFClickInCardsArray].getAttribute('src') === this.images.children[this.indexOfVisibleTrueInCardsArray].getAttribute('src')) {
                            this.cards[this.indexOfVisibleTrueInCardsArray].found = "true";
                            this.cards[this.indexOFClickInCardsArray].found = "true";
                            this.winnerSong.play();
                        }
                        else {
                            this.timerIdToHideImage = setTimeout(()=>{
                                let imageAnimate1 = this.images.children[this.indexOfVisibleTrueInCardsArray];
                                let imageAnimate2 = this.images.children[this.indexOFClickInCardsArray];
                                Velocity(imageAnimate1,{opacity: 1},{duration: 0});
                                Velocity(imageAnimate1, {transform: "rotateY(360deg)"},{duration: 200});
                                Velocity(imageAnimate2,{opacity: 1},{duration: 0});
                                Velocity(imageAnimate2, {transform: "rotateY(360deg)"},{duration: 200});
                                this.images.children[this.indexOfVisibleTrueInCardsArray].setAttribute('src',(this.images.children[this.indexOfVisibleTrueInCardsArray].getAttribute('src')).concat('xxx'));
                                this.images.children[this.indexOFClickInCardsArray].setAttribute('src',(this.images.children[this.indexOFClickInCardsArray].getAttribute('src')).concat('xxx'));
                               
                            },500);
                        }
                    }
                },200);
            }
            setTimeout(()=>{
                if(this.winner()) {
                    this.clock.style.display = "none";
                    this.winnerAlert.style.display = "block";
                    if(this.timerIdForHardLevel) {
                        clearInterval(this.timerIdForHardLevel);
                    }
                }
            },300);
        }
    }
}

const memoryGame = new MemoryGame();