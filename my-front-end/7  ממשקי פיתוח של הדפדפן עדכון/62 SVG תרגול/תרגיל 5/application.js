function Application(btnStart,rectUp,rectDown,ball) {
    this.btnStart=btnStart;
    this.ball = ball;
    this.rectUp = rectUp;
    this.rectDown = rectDown;
    this.theNextRandomIsFor = 'y';
    this.directionUpOrDown = 'up';
    this.speed = 300;
    this.btnStart.addEventListener('click',this.startGame.bind(this));
    document.addEventListener('keydown',this.moveRectDownByUser.bind(this));
    this.audiosDefinitions();
}

Application.prototype.audiosDefinitions = function() {
    this.audioBall = new Audio('ball.mp3');
    this.audioWinner = new Audio('winner.mp3');
    this.audioLooser = new Audio('looser.mp3');
}

Application.prototype.startGame = function() {
    this.audioWinner.pause();
    this.ball.classList.remove('animation-ball');
    document.querySelector('svg:nth-child(1)').classList.remove('display-none');
    document.querySelector('svg:nth-child(2)').classList.add('display-none');
    this.ball.setAttribute('cy',740);
    this.ball.setAttribute('cx',500);
    this.rectUp.setAttribute('x',400);
    this.rectDown.setAttribute('x',400);
    this.clearIntervals();
    this.goBallDefinitions();
}

Application.prototype.clearIntervals = function() {
    clearInterval(this.stopBall);
    clearInterval(this.stopRect);
}

Application.prototype.goBallDefinitions = function() {
    if(this.theNextRandomIsFor==='x') {
        let limitY = 60;
        if(this.directionUpOrDown==='down') {this.directionUpOrDown = 'up'; limitY = 740;}
        else {this.directionUpOrDown = 'down';}
        this.goByRandom(this.getRandomX(),limitY,'x');
        this.theNextRandomIsFor='y';     
    }
    else {     
        let limitX = 25;
        if(Math.floor(Math.random()*2)===0) {limitX= 975;}
        this.goByRandom(this.getRandomY(),limitX,'y');
        this.theNextRandomIsFor='x';
    }
}

Application.prototype.getRandomX = function() {
    return Math.floor(Math.random()*950+26);
}

Application.prototype.getRandomY = function() {
    return Math.floor(Math.random()*680+60);
}

Application.prototype.updateValue = function(value,incOrDec,numToIncOrDec) {
    if(incOrDec==='inc')
        return value+numToIncOrDec;
    return value-numToIncOrDec;
}

Application.prototype.getBallX = function() {
    return Number(this.ball.getAttribute('cx'));
}

Application.prototype.getBallY = function() {
    return Number(this.ball.getAttribute('cy'));
}

Application.prototype.goByRandom = function(rundom,fixed,theRandomIsFor) {
    let y = this.getBallY();
    let x = this.getBallX();
    let incOrDecY = 'inc';
    let incOrDecX = 'inc';

    let numForY = fixed;
    let numForX = rundom;
    if(theRandomIsFor==='y') {
        numForY = rundom;
        numForX = fixed;
    }

    let numToIncOrDecY = (Math.abs(y-numForY))/this.speed;
    let numToIncOrDecX = (Math.abs(x-numForX))/this.speed;
    let index = this.speed;
    if(y>numForY) {
        incOrDecY ='dec';
    }
    if(x>numForX) {
        incOrDecX = 'dec';
    }

    let winner = 1;
    this.stopBall = setInterval(() => {
        if(index) {
            this.ball.setAttribute('cy',y);
            this.ball.setAttribute('cx',x);
            y = this.updateValue(y,incOrDecY,numToIncOrDecY);
            x = this.updateValue(x,incOrDecX,numToIncOrDecX);
            index--;
            if(theRandomIsFor==='x') {
                if(y<=61) {
                    if(!this.successCatch('up')) {
                        this.ball.classList.add('animation-ball');
                        this.ball.setAttribute('cy',-125);
                        this.clearIntervals();
                        index = 0;
                        winner = 0;
                    }
                }
                if(y>=739) {
                    if(!this.successCatch('down')) {
                        this.ball.classList.add('animation-ball');
                        this.ball.setAttribute('cy',1775);
                        this.clearIntervals();
                        index = 0;
                        winner = 0;
                    }
                }
            }
        }
        else {
            clearInterval(this.stopBall);
            if(winner) {
                this.goBallDefinitions();
            }
        }
    }, 1);

    if(theRandomIsFor==='x') {
        if(numForY===60) {
            this.rectUpTryCatch(numForX);
        }
    }
}

Application.prototype.rectUpTryCatch = function(rundomX) {
    let xRect = 1 + Number(this.rectUp.getAttribute('x'));
    let xBallSub = rundomX - 100;
    let x=xRect;
    if(xRect<xBallSub) {
        this.stopRect = setInterval(() => {
            if(x<=xBallSub) {
                this.rectUp.setAttribute('x',x);
                x++;
            }
            else {
                clearInterval(this.stopRect);
            }
        }, 1);
    }
    else {
         this.stopRect = setInterval(() => {
            if(x>=xBallSub) {
                this.rectUp.setAttribute('x',x);
                x--;
            }
            else {
                clearInterval(this.stopRect);
            }
        }, 1);
    }
}

Application.prototype.rectDownTryCatch = function(rundomX) {
    let xRect = 1 + Number(this.rectDown.getAttribute('x'));
    let xBallSub = rundomX - 100;
    let x=xRect;
    if(xRect<xBallSub) {
        this.stopRect = setInterval(() => {
            if(x<=xBallSub) {
                this.rectDown.setAttribute('x',x);
                x++;
            }
            else {
                clearInterval(this.stopRect);
            }
        }, 1);
    }
    else {
        this.stopRect = setInterval(() => {
            if(x>=xBallSub) {
                this.rectDown.setAttribute('x',x);
                x--;
            }
            else {
                clearInterval(this.stopRect);
            }
        }, 1);
    }
}

Application.prototype.moveRectDownByUser = function() {
    let x = Number(this.rectDown.getAttribute('x'));
    switch(event.keyCode) {
        case 37:
            if(x>-80) {
                for(let i=0;i<100;i++) {
                    x-=1;
                    this.rectDown.setAttribute('x',x);
                }
            }
            break;
        case 39:
            if(x<875) {
                for(let i=0;i<100;i++) {
                    x+=1;
                    this.rectDown.setAttribute('x',x);
                }
            }
            break;
    }
}

Application.prototype.successCatch = function(upOrDown) {
    const ballX = this.ball.getAttribute('cx');
    const rectUpX = this.rectUp.getAttribute('x');
    const rectDownX = this.rectDown.getAttribute('x');
    if(upOrDown==='up') {
        if(ballX>=(Number(rectUpX)-10) && ballX<=(Number(rectUpX)+210)){
            this.audioBall.play();
            return 1;
        }
        this.winner();
        return 0;
    }
    else {
        if(ballX>=(Number(rectDownX)-10) && ballX<=(Number(rectDownX)+210)){
            this.audioBall.play();
            return 1;
        }
        this.audioLooser.play();
        return 0;
    }
}

Application.prototype.winner = function() {
    this.audioWinner.play();
    document.querySelector('svg:nth-child(1)').classList.add('display-none');
    document.querySelector('svg:nth-child(2)').classList.remove('display-none');
}
