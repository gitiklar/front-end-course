"use strict";
function Game(board) {
    this.board = board;
    this.nextXorY = 'X';
    this.innerHtmlForX = document.querySelector('.scriptX').innerHTML;
    this.innerHtmlForO = document.querySelector('.scriptO').innerHTML;
    this.arrGame = [
                    ['','',''],
                    ['','',''],
                    ['','',''],
                ];
    this.btnNewGame = document.querySelector('.new-game');
    this.board.addEventListener('click', this.checkClick.bind(this));
    this.btnNewGame.addEventListener('click',this.newGame.bind(this));
    this.inputFirstPlayer = document.querySelector('.firstPlayer');
    this.inputSecondPlayer = document.querySelector('.secondPlayer');
    this.flagStart = 0;
    this.backgroundAnimation();
}

Game.prototype.backgroundAnimation = function() {
    const header = document.querySelector('header');
    let pos = 0;
    function step() {
        pos-=2;
        header.style.backgroundPositionX = `${pos}px`;
        requestAnimationFrame(step);
    }
    step();
}

Game.prototype.checkClick = function() {
    if(!this.flagStart) {
        if((this.inputFirstPlayer.value ==='דבורי' || this.inputFirstPlayer.value==='מוישי') || this.inputFirstPlayer.value==='חיים') {
            alert( `השחקן ${this.inputFirstPlayer.value} לא רשאי להשתתף במשחק`);
            this.goodPlayerFirst = 0;
        }
        else{
            if(this.inputFirstPlayer.value) {
                this.goodPlayerFirst = 1;
            }
        }
        if((this.inputSecondPlayer.value==='דבורי' || this.inputSecondPlayer.value==='מוישי') || this.inputSecondPlayer.value==='חיים') {
            alert( `השחקן ${this.inputSecondPlayer.value} לא רשאי להשתתף במשחק`);
            this.goodPlayerSecond = 0;
        }
        else {
            if(this.inputSecondPlayer.value) {
                this.goodPlayerSecond = 1; 
            }
        }
    }
    
    if(this.goodPlayerFirst && this.goodPlayerSecond) {    
        this.flagStart = 1;  
        this.inputFirstPlayer.setAttribute('disabled', true);
        this.inputSecondPlayer.setAttribute('disabled', true);
        if(event.target.tagName ==='BUTTON' && event.target.innerHTML==='') {
            event.target.style.background = '#F64B6A';
            event.target.style.border = '1px solid black';
            
            if(this.nextXorY === 'X') {
                event.target.innerHTML = this.innerHtmlForX;
            }

            else {
                event.target.innerHTML = this.innerHtmlForO;
            }

            if(this.nextXorY === 'X') {
                this.nextXorY = 'O';
            }

            else {
                this.nextXorY = 'X';
            }
            this.updateArrGame();
        }
    }
    
    else {
        if(!this.goodPlayerFirst) {
            this.inputFirstPlayer.value = '';
        }
        if(!this.goodPlayerSecond) {
            this.inputSecondPlayer.value = '';
        }
    }
}

Game.prototype.updateArrGame = function() {
    [...this.board.children].forEach((element,index)=>{
        if(element.innerHTML) {
            this.arrGame[Math.floor(index/3)][index%3] = element.children[0].classList[0];
        }
    })
    if(this.checkWinner()) {
        this.disableButtons();
        if(this.checkWinner()==='X') {
            alert(`כל הכבוד ל${this.inputFirstPlayer.value}`);
        }

        else {
            alert(`כל הכבוד ל${this.inputSecondPlayer.value}`);
        }
    }
}

Game.prototype.checkWinner = function() {
   for(let i= 0; i<3; i++) {
        if((((this.arrGame[i][0]) === (this.arrGame[i][1])) && ((this.arrGame[i][1])===(this.arrGame[i][2]))) && this.arrGame[i][0]) {
            return this.arrGame[i][0];
       }
   }

   for(let i= 0; i<3; i++) {
    if((((this.arrGame[0][i]) === (this.arrGame[1][i])) && ((this.arrGame[1][i])===(this.arrGame[2][i]))) && this.arrGame[0][i]) {
            return this.arrGame[0][i];
        }
    }
    
    if((((this.arrGame[0][0]) === (this.arrGame[1][1])) && ((this.arrGame[1][1]) === (this.arrGame[2][2]))) && this.arrGame[0][0]) {
        return this.arrGame[0][0];
    }

    if((((this.arrGame[2][0]) === (this.arrGame[1][1])) && ((this.arrGame[1][1]) === (this.arrGame[0][2]))) && this.arrGame[2][0]) {
        return this.arrGame[2][0];
    }
    return 0;
}

Game.prototype.newGame = function() {
    for(let i=0; i<3; i++) {
        for(let j=0;j<3; j++) {
            this.arrGame[i][j] = '';
            this.board.children[i*3+j].innerHTML ='';
            this.board.children[i*3+j].removeAttribute('disabled');
            this.board.children[i*3+j].style.background = '#F2E4C4';
            this.board.children[i*3+j].style.border = '1px solid #F64B6A';
        }
    }
    this.inputFirstPlayer.removeAttribute('disabled');
    this.inputSecondPlayer.removeAttribute('disabled');
    this.nextXorY = 'X';
    this.flagStart = 0;
}

Game.prototype.disableButtons = function() {
    [...this.board.children].forEach((btn)=> {
        btn.setAttribute('disabled', true);
    })
}

const board = document.querySelector('.board');
const game = new Game(board)