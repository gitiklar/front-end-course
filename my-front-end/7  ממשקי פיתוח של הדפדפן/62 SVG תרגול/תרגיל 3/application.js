function Application(btnStart,btnStop,board) {
    this.btnStart=btnStart;
    this.btnStop=btnStop;
    this.board = board;
    this.ball = this.board.querySelector('circle');
    this.btnStart.addEventListener('click',this.startGame.bind(this));
    this.btnStop.addEventListener('click',this.stopGame.bind(this));
    this.direction = 0;
}

Application.prototype.startGame = function() {
    if(!this.stopInterval) {
        this.ballGo();
        this.stopInterval = setInterval(this.ballGo.bind(this),500);  
    }
}

Application.prototype.ballGo = function() {
    if(this.direction===0) {
        this.direction=1;
        let numberY = Math.floor(Math.random()*750+26);
        this.ball.setAttribute('cy',numberY);

        let rigthOrLeft = Math.floor(Math.random()*2+1);
        if(rigthOrLeft===1) {
            this.ball.setAttribute('cx',975);
        }
        else {
            this.ball.setAttribute('cx',25);
        }
    }
    else {
        this.direction=0;
        let numberX = Math.floor(Math.random()*950+26);
        this.ball.setAttribute('cx',numberX);

        let rigthOrLeft = Math.floor(Math.random()*2+1);
        if(rigthOrLeft===1) {
            this.ball.setAttribute('cy',775);
        }
        else {
            this.ball.setAttribute('cy',25);
        }
    }
}

Application.prototype.stopGame = function() {
    clearInterval(this.stopInterval);
    this.stopInterval = 0;
}