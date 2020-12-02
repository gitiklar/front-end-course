const audioElement = new Audio('mp3/Geese-sound.mp3');

const btn = document.querySelector('button');

btn.addEventListener('click',function() {
    audioElement.play();
})