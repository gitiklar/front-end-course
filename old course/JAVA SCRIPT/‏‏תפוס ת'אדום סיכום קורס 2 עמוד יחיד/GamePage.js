function GamePage(main) {
    Page.call(this,'game',main);
    this.constructor = 'GamePage';
    this.myInnerHTML = '';
}

GamePage.prototype = Object.create(Page.prototype);

GamePage.prototype.enter = function() {
    if(this.myInnerHTML) {
        this.main.innerHTML = this.myInnerHTML;
    }
    else {
        this.size = 0;
        this.score = 0;
        this.flag_time = 0;
        this.flag_alert = 0;
        this.countTime = 0;
        this.colorChange = '#9abde2';
        this.root = document.createDocumentFragment();
        this.squre = 0;
        this.num = 0;
    }
        this.buttn_drop = document.querySelector('.dropdown');
        this.grid = document.querySelector('.grid');
        this.image_score = document.querySelector('img');
        this.alert = document.querySelector('.alert-success');
        this.time = document.querySelector('.time');
        this.colorElement = document.querySelector('#bgcolor');
        this.colorElement.addEventListener('change',this.colorChangeF.bind(this));
        this.colorElement.value=this.colorChange;
        this.buttn_drop.addEventListener('click',this.chooseSize.bind(this));
        this.grid.addEventListener('click',this.game.bind(this));  
        this.timer();
}

GamePage.prototype.leave = function() {
     this.myInnerHTML = this.main.innerHTML;
     this.stopTimer();
}

GamePage.prototype.stopTimer = function() {
    clearInterval(this.toCancelTimer);
}

GamePage.prototype.chooseSize = function() {
    if(event.target.tagName!=='BUTTON') {
        this.grid.innerHTML='';
        document.querySelector('num').textContent =0;
        this.score = 0;
        this.image_score.style.display='none';
        this.flag_alert=0;
        this.countTime=0;
        if(event.target.textContent=='2X2') {
            this.grid.style.gridTemplateColumns="repeate(2,1fr)";
            this.grid.style.gridTemplateRows="repeate(2,1fr)";
            this.size=2;
        }
        
        if(event.target.textContent=='3X3') {
            this.grid.style.gridTemplateColumns="repeate(3,1fr)";
            this.grid.style.gridTemplateRows="repeate(3,1fr)";
            this.size=3;
        }
        if(event.target.textContent=='4X4') {
            this.grid.style.gridTemplateColumns="repeate(4,1fr)";
            this.grid.style.gridTemplateRows="repeate(4,1fr)";
            this.size=4;
        }
        
  for(let i=1;i<=this.size;i++) {
                for(let j=1;j<=this.size;j++) {
                    this.squre = document.createElement('div');
                    this.squre.classList.add('squre');
                    this.squre.style.gridRow = i + "/span 1";
                    this.squre.style.gridColumn = j + "/span 1";
                    if(this.colorChange) { 
                        this.squre.style.backgroundColor = this.colorChange;
                    }
                    this.root.appendChild(this.squre);
                }
            }
    
    this.grid.appendChild(this.root);
    this.mix();
}
}

GamePage.prototype.mix = function () {
    if(this.size) {
        let tmp = 0;
        do {tmp = Math.floor(Math.random()*this.size*this.size);} while(tmp == this.num);
        this.num = tmp;
        
        for (let i=0;i<this.grid.childNodes.length;i++) {
            if(this.grid.childNodes[i].style.backgroundColor=="rgb(255, 0, 0)") {
                this.grid.childNodes[i].style.backgroundColor = this.colorChange;
            }
        }
        
        this.grid.childNodes[this.num].style.backgroundColor="rgb(255, 0, 0)";

    }
}

GamePage.prototype.game = function(event) {
    if(event.target.classList.contains('squre')) {
        this.flag_time = 1;
        if (event.target.style.backgroundColor=="rgb(255, 0, 0)") {
            this.score +=5;
        }
        else {            
            this.score-=5;
        }
        if (this.score>=50) {
            this.image_score.style.display='inline-block';
            if(!this.flag_alert) {
                this.alert.classList.add('display-yes');
                this.flag_alert = 1;
            }
        }
        
        document.querySelector('num').textContent=this.score;
        this.mix();
    }
}

GamePage.prototype.count = function () {
    if(this.squre) {
          if(!this.flag_time) {
              this.score-=2;
              document.querySelector('num').textContent = this.score;
              this.mix();
          }
          else {
            this.flag_time = 0;
          }
    
            if(this.alert.classList.contains('display-yes')) {
                this.countTime++;
            if (this.countTime==2) {
                this.alert.classList.remove('display-yes');
            }
        }
    }
}

GamePage.prototype.timer = function() {
    this.toCancelTimer = setInterval(this.count.bind(this), 1000);
}

GamePage.prototype.changeNotRedSquers = function () {
    let index_red = 0;
    if(this.squre) {
        for (let i=0;i<this.grid.childNodes.length;i++) {
            if(this.grid.childNodes[i].style.backgroundColor!=="rgb(255, 0, 0)") {
                this.grid.childNodes[i].style.backgroundColor = this.colorChange;
            }
        }
    }
}

GamePage.prototype.colorChangeF = function() {
      if(this.colorElement.value!='#ff0000') {
        this.colorChange = this.colorElement.value;
    }
    this.changeNotRedSquers();
}


