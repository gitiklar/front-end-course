let buttn_drop = document.querySelector('.dropdown');
let root = document.createDocumentFragment();
let grid = document.querySelector('.grid');
let size = 0;
let k = 0 ;
let pre_red = 0;
let score = 0;
let image_score = document.querySelector('img');
let alert = document.querySelector('.alert-success');
let time = document.querySelector('.time');
let flag_time = 0;
let flag_alert = 0;
let countTime = 0;
let colorChange = '#9abde2';
let squre = 0;

function mix () {
    if(size) {
        if(pre_red) {
            pre_red.style.backgroundColor = colorChange;
        }
        num = Math.floor(Math.random()*size*size);
        grid.childNodes[num].style.backgroundColor="rgb(255, 0, 0)";
        pre_red = grid.childNodes[num];
    }
}

function game(event) {
    if(event.target.classList.contains('squre')) {
        flag_time = 1;
        debugger;
        if (event.target.style.backgroundColor=="rgb(255, 0, 0)") {
            score +=5;
        }
        else {            
            score-=5;
        }
        if (score>=50) {
            image_score.style.display='inline-block';
            if(!flag_alert) {
                alert.classList.add('display-yes');
                flag_alert = 1;
            }
        }
        
        document.querySelector('num').textContent=score;
        mix();
    }
}

function chooseSize(event) {
    k =0;
    grid.innerHTML='';
    document.querySelector('num').textContent =0;
    score = 0;
    
    if(event.target.tagName!=='BUTTON') {     
        image_score.style.display='none';
        flag_alert=0;
        countTime=0;
        if(event.target.textContent=='2X2') {
            grid.style.gridTemplateColumns="repeate(2,1fr)";
            grid.style.gridTemplateRows="repeate(2,1fr)";
            size=2;
        }
        
        if(event.target.textContent=='3X3') {
            grid.style.gridTemplateColumns="repeate(3,1fr)";
            grid.style.gridTemplateRows="repeate(3,1fr)";
            size=3;
        }
        if(event.target.textContent=='4X4') {
            grid.style.gridTemplateColumns="repeate(4,1fr)";
            grid.style.gridTemplateRows="repeate(4,1fr)";
            size=4;
        }
        
        for(let i=1;i<=size;i++) {
                for(let j=1;j<=size;j++) {
                    squre = document.createElement('div');
                    squre.classList.add('squre');
                    squre.style.gridRow = i + "/span 1";
                    squre.style.gridColumn = j + "/span 1";
                    if(colorChange) { 
                        squre.style.backgroundColor = colorChange;
                    }
                    root.appendChild(squre);
                }
            }
        } 
    grid.appendChild(root);
    mix();
}

window.setInterval(function(){
  if(squre) {
          if(!flag_time) {
              score-=2;
              document.querySelector('num').textContent = score;
              mix();
          }
          else {
            flag_time = 0;
          }
    
            if(alert.classList.contains('display-yes')) {
                countTime++;
            if (countTime==2) {
                alert.classList.remove('display-yes');
            }
        }
    }
}, 1000);

function changeNotRedSquers(colorChange) {
    let index_red = 0;
    if(squre) {
        for (let i=0;i<grid.childNodes.length;i++) {
            if(grid.childNodes[i].style.backgroundColor=="rgb(255, 0, 0)"){
                index_red = i;
                break;
            }
        }
        grid.childNodes.forEach(element => (element.style.backgroundColor=colorChange));
        grid.childNodes[index_red].style.backgroundColor="rgb(255, 0, 0)";
    }
}

function colorChangeF(t) {
    if(t.value!='#ff0000') {
        colorChange = t.value;
    }
    changeNotRedSquers(colorChange);
}

buttn_drop.addEventListener('click',chooseSize);
grid.addEventListener('click',game);

