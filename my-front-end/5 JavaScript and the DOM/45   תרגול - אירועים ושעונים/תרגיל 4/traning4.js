
function snakeGame(svg,colors,svgns,arr) {
    this.svg = svg;
    this.boardColors = colors;
    this.snakeColor = "url(#pattern1)"; 
    this.appleColor ="url(#stripes)";
    this.svgns = svgns;
    this.colorsOfBoardArray = arr;
    this.allGame = document.querySelector('.allGame');
    this.score = document.querySelector('aside p span');
    this.gameOverText = document.querySelector('.gameOver');
    this.gameOverText.style.display = 'none';
    this.nameText = document.querySelector('.name');
    this.nameText.style.display = 'none';
    this.scoreTable = document.querySelector('.scoreTable');
    this.scoreTable.style.display = 'none';
    this.tbody = document.querySelector('tbody');
    this.calculationsForAllDisplayNone();
    this.gameOverFlag = 0;
    this.speed = 100;
    this.startBtn = document.querySelector('.newGame');
    this.startBtn.addEventListener('click',this.startGame.bind(this));
    document.addEventListener('keydown',this.caseKeyCode.bind(this));
    this.dropDownSpeed = document.querySelector('.speed');
    this.dropDownSpeed.addEventListener('click',this.chooseSpeed.bind(this));
    this.dropDownColor = document.querySelector('.color');
    this.dropDownColor.addEventListener('click',this.chooseColor.bind(this));
    this.head = document.querySelector('head');
    this.snake = [{i:13,j:0},{i:13,j:1},{i:13,j:2}];
    this.createSvgRect();
    this.fillBoardArrayColors();
    this.rects = document.querySelectorAll('rect');
    this.randomApple();
    this.fillRectColorsByBoardArray();
    this.preKeyCode = 0;
    this.audioEat = new Audio('eat.mp3');
    this.audioGameOver = new Audio('gameOver.mp3');
    this.alert = document.querySelector('.alert');
    this.btnOkName = document.querySelector('.alert button');
    this.btnOkName.addEventListener('click',this.saveDataInLocalStorage.bind(this));
    this.dataArrayWinners = [];
    this.checkIfExistDataInLocalStorageAndFillTable();
    document.querySelector('.showScoreBtn').addEventListener('click',this.showScore.bind(this));
}

snakeGame.prototype.showScore = function() {
    this.scoreTable.style.display = "block";
    event.preventDefault();
}

snakeGame.prototype.calculationsForAllDisplayNone = function() {
    let calculatorLeft = this.allGame.clientWidth/2 -250 + "px";
    let calculatorLeftForAlert = this.allGame.clientWidth/2 -225 + "px";
    let calculatorTop = this.allGame.clientHeight/3 + "px";

    this.gameOverText.style.left = calculatorLeft;
    this.gameOverText.style.top = calculatorTop;

    this.nameText.style.left = calculatorLeftForAlert;
    this.nameText.style.top = calculatorTop;

    this.scoreTable.style.width = this.allGame.clientWidth + "px";
    this.scoreTable.style.height = this.allGame.clientHeight + "px";
}

snakeGame.prototype.checkIfExistDataInLocalStorageAndFillTable = function() {
    let date = localStorage.getItem("dataArrayWinners");
    if(date) {
        if((localStorage.getItem("dataArrayWinners")).length>0) {
            this.dataArrayWinners = JSON.parse(localStorage.getItem("dataArrayWinners"));
            this.fillTableFromLocalStorage();
        }
    }
}

snakeGame.prototype.fillTableFromLocalStorage = function() {
    let tableClasses = ["table-primary","table-secondary","table-success","table-danger","table-warning","table-info"];
    this.dataArrayWinners = JSON.parse(localStorage.getItem("dataArrayWinners"));
    this.dataArrayWinners.sort((obj1,obj2)=>{
        return obj2.score - obj1.score;
    });
    this.dataArrayWinners = this.dataArrayWinners.slice(0,20);
    var rows = '';
    this.dataArrayWinners.forEach((obj,index)=> {
        rows +=  `<tr>
                    <td class="score ${tableClasses[index%tableClasses.length]}">${obj.score}</td>
                    <td class="name  ${tableClasses[index%tableClasses.length]}">${obj.name}</td>
                 </tr>`;
        
    });
    this.tbody.innerHTML = rows;
}


snakeGame.prototype.saveDataInLocalStorage =function() {
    this.startBtn.removeAttribute('disabled');
    if(this.score.textContent != '0') {
        let obj = {
            name: this.nameText.querySelector('input').value,
            score: this.score.textContent,
        }
        this.dataArrayWinners.push(obj);
        localStorage.setItem("dataArrayWinners",JSON.stringify(this.dataArrayWinners));
    }
    this.nameText.querySelector('input').value = '';
    this.nameText.style.display = 'none';
    this.fillTableFromLocalStorage();
}

snakeGame.prototype.chooseSpeed = function() {
    switch(Number(event.target.value)) {
        case 1: this.speed = 100;
            break;
        case 2: this.speed = 70;
            break;
        case 3: this.speed = 50;
            break;
    }
}

snakeGame.prototype.chooseColor = function() {
    event.preventDefault();
    let link = document.createElement('link');
    link.setAttribute('rel','stylesheet');
    
    switch(Number(event.target.value)) {
        case 1: link.setAttribute('href',"traning41.css");
                this.boardColors = ['#e0b2c0','white']; 
                this.alert.style.backgroundColor ="#F42272";
                this.snakeColor = "url(#pattern1)"; 
            break;
        case 2: link.setAttribute('href',"traning42.css");
                this.boardColors = ['#F7EAA1','#EED58F'];  
                this.alert.style.backgroundColor ="#6E0D25"; 
                this.snakeColor ="url(#pattern2)";
            break;
        case 3: link.setAttribute('href',"traning43.css");
                this.boardColors = ['#FFEBE7','#FFC0BE'];
                this.alert.style.backgroundColor ="#7F95D1";
                this.snakeColor = "url(#pattern3)";
            break;
        case 4: link.setAttribute('href',"traning44.css");
                this.boardColors = ['#FAE2E6','#c7b4c6'];
                this.alert.style.backgroundColor ="#EA3788";
                this.snakeColor = "url(#pattern4)";
            break;
    }
    this.head.appendChild(link);
    this.fillBoardArrayColors();
    this.randomApple();
    this.fillRectColorsByBoardArray();
}

snakeGame.prototype.startGame = function() {
    this.gameOverFlag = 0;
    this.snake = [{i:13,j:0},{i:13,j:1},{i:13,j:2}];
    this.fillBoardArrayColors();
    this.randomApple();
    this.fillRectColorsByBoardArray();
    this.score.innerHTML = 0;
    this.scoreTable.style.display = "none";
    event.preventDefault();
}

snakeGame.prototype.randomApple = function() {
    this.iApple = Math.floor(Math.random()*27);
    this.jApple = Math.floor(Math.random()*27);
    while(this.placeOfSnake()) {
        this.iApple = Math.floor(Math.random()*27);
        this.jApple = Math.floor(Math.random()*27);
    }
    this.colorsOfBoardArray[this.iApple][this.jApple] = this.appleColor;
}

snakeGame.prototype.placeOfSnake = function() {
    return this.snake.find((obj)=>{
        return (obj.i === this.iApple && obj.j === this.jApple);
    });
}

snakeGame.prototype.createSvgRect = function() {
    for(let i=0;i<27;i++) {
        for(let j=0; j<27; j++) {
            const rect = document.createElementNS(svgns,'rect');
            rect.setAttributeNS(null,'x', 30*j);
            rect.setAttributeNS(null,'y', 30*i);
            rect.setAttributeNS(null,'width', '30');
            rect.setAttributeNS(null,'height', '30');
            this.svg.appendChild(rect);
        }
    }
}

snakeGame.prototype.fillBoardArrayColors = function() {
    for(let i=0;i<27;i++) {
        for(let j=0; j<27; j++) {
            this.colorsOfBoardArray[i][j] = this.boardColors[(i*27+j)%this.boardColors.length];
            if(i=== 13 & j < 3) {
                this.colorsOfBoardArray[i][j] = this.snakeColor;
            }
        }
    }
}

snakeGame.prototype.fillRectColorsByBoardArray = function() {
    for(let i=0 ;i<27;i++) {
        for(let j=0; j<27; j++) {
            this.rects[i*27+j].style.fill = this.colorsOfBoardArray[i][j];
            this.rects[i*27+j].removeAttribute('rx');
            if(this.colorsOfBoardArray[i][j] === this.snakeColor) {
                this.rects[i*27+j].setAttribute('rx','10');
            }
            if(this.colorsOfBoardArray[i][j] === this.appleColor) {
                this.rects[i*27+j].setAttribute('rx','50');
            }
        }
    }
}

snakeGame.prototype.updateBoardArrayBySnakeArray = function() {
    this.snake.forEach((obj)=>{
        this.colorsOfBoardArray[obj.i][obj.j] = this.snakeColor;
    });
}

snakeGame.prototype.gameOver = function() {
    this.startBtn.disabled = 'true';
    this.audioGameOver.play();
    clearInterval(this.timerId);
    this.gameOverText.style.display = 'block';
    this.gameOverFlag = 1;
    this.gameOverText.classList.add('animate__animated' , 'animate__flip');

    setTimeout(() => {
        this.gameOverText.classList.remove('animate__animated', 'animate__flip');
        this.gameOverText.classList.add('animate__animated' , 'animate__swing');
    }, 1500);

    setTimeout(() => {
        this.gameOverText.classList.remove('animate__animated', 'animate__swing');
        this.gameOverText.classList.add('animate__animated' , 'animate__rotateOut');
    }, 3000);

    setTimeout(() => {
        this.nameText.style.display = 'block';
        this.nameText.classList.add('animate__animated', 'animate__rollIn');
    }, 4500);    
}
snakeGame.prototype.snakeIntoSnake = function() {
    let head = JSON.stringify(this.snake[this.snake.length-1]);
    return this.snake.find((obj,index) => {
        if(index < this.snake.length-1) {
            if(JSON.stringify(obj) === head) return true;
        }
        return false;
    })
}

snakeGame.prototype.moveSnake = function(keyCode) {
    this.preZeroSnakeForAddIfEatApple = Object.assign({},this.snake[0]);
    this.colorsOfBoardArray[this.snake[0].i][this.snake[0].j] = this.boardColors[(this.snake[0].i*27+this.snake[0].j)%this.boardColors.length];
    this.snake.forEach((e,index) => {
        if(index < this.snake.length-1) {
            this.snake[index].i = this.snake[index+1].i;
            this.snake[index].j = this.snake[index+1].j;
        } else {
            switch(keyCode) {
                case 37: this.snake[index].j--;
                    break;
                case 38: this.snake[index].i--;
                    break;
                case 39: this.snake[index].j++;
                    break;
                case 40: this.snake[index].i++;
                    break;
            }
        }
    });

    let firstSnakePlace = this.snake[this.snake.length-1];
    if(this.snakeIntoSnake() || firstSnakePlace.i < 0 || firstSnakePlace.j < 0 || firstSnakePlace.i > 26 || firstSnakePlace.j > 26 ) {
        this.gameOver();
    }
    else{
        if(this.placeOfSnake()) {
            this.audioEat.play();
            this.score.innerHTML = Number(this.score.innerHTML) + 5;
            this.snake.unshift(this.preZeroSnakeForAddIfEatApple);
            this.randomApple();
        }
    
        this.updateBoardArrayBySnakeArray();
        this.fillRectColorsByBoardArray();
    }
    this.preKeyCode = keyCode;
}

snakeGame.prototype.caseKeyCode = function() {
    if(!this.gameOverFlag) {
        if(event.keyCode === 37 && this.preKeyCode!=39) {
            clearInterval(this.timerId);
            this.timerId = setInterval(this.moveSnake.bind(this,37),this.speed);
          }
          if(event.keyCode === 38 && this.preKeyCode!=40) {
            clearInterval(this.timerId);
            this.timerId = setInterval(this.moveSnake.bind(this,38),this.speed);
          }
          if(event.keyCode === 39 && this.preKeyCode!=37) {
            clearInterval(this.timerId);
            this.timerId = setInterval(this.moveSnake.bind(this,39),this.speed);
          }
          if(event.keyCode === 40 && this.preKeyCode!=38) {
            clearInterval(this.timerId);
            this.timerId = setInterval(this.moveSnake.bind(this,40),this.speed);
          }
    }
}










const svgns = "http://www.w3.org/2000/svg";
const svg = document.querySelector('.svgBoard');
const colors = ['#e0b2c0','white'];
let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));
let arr =  Array2D(27,27);
const Game = new snakeGame(svg,colors,svgns,arr);