const audioElement = new Audio('pigeon.mp3');
const videoElement =document.createElement('video');
videoElement.setAttribute('controls', true);
videoElement.innerHTML = `<source src="tmp.mp4" type="video/mp4">`;
videoElement.currentTime = 6;
document.body.appendChild(videoElement);

const btnAudio = document.querySelector('.audio');
const btnVideo = document.querySelector('.video');

btnAudio.addEventListener('click',function() {
    audioElement.play();
})

btnVideo.addEventListener('click',function() {
    videoElement.play();
})