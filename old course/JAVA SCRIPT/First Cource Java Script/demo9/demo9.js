let p =document.querySelector('.panel');
let messege = [
        'mind the gap',
        'enjoy the show',
        'let it flow',
        'home sweet home'
    ];

function writeMousePositionToPanel (event) {
    p.textContent = event.clientX +','+event.clientY;
}

function writeRandomMessage(event) {
    let index = Math.floor(Math.random()*messege.length);
    p.textContent = messege[index];
}

let btn = document.querySelector('#btn-say');
btn.addEventListener('click',writeRandomMessage);

document.body.addEventListener('mousemove' , writeMousePositionToPanel);
