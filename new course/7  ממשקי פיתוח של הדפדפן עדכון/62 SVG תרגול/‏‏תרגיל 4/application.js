function Application(btnStart,rectUp,rectDown,ball) {
    this.btnStart=btnStart;
    this.ball = ball;
    this.rectUp = rectUp;
    this.rectDown = rectDown;
    this.btnStart.addEventListener('click',this.startGame.bind(this));
    this.theNextRandomIsFor = 'y';
    this.directionUpOrDown = 'up';
    this.speed = 300;
}

Application.prototype.startGame = function() {
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
                        this.ball.setAttribute('cy',25);
                        this.clearIntervals();
                        index = 0;
                        winner = 0;
                    }
                }
                if(y>=739) {
                    if(!this.successCatch('down')) {
                        this.ball.setAttribute('cy',775);
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
        else {
            this.rectDownTryCatch(numForX);
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

Application.prototype.successCatch = function(upOrDown) {
    const ballX = this.ball.getAttribute('cx');
    const rectUpX = this.rectUp.getAttribute('x');
    const rectDownX = this.rectDown.getAttribute('x');
    if(upOrDown==='up') {
        if(ballX>=(Number(rectUpX)-10) && ballX<=(Number(rectUpX)+210))
            return 1;
        return 0;
    }
    else {
        if(ballX>=(Number(rectDownX)-10) && ballX<=(Number(rectDownX)+210))
            return 1;
        return 0;
    }
}
