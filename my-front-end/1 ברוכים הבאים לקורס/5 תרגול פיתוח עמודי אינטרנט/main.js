const header = document.querySelector('header');
let pos = 0;

function step() {
    pos-=2;
    header.style.backgroundPositionX = `${pos}px`;
    requestAnimationFrame(step);
}

step();