const imageCount = document.querySelectorAll('.image-slider img').length;
const container = document.querySelector('.images');
const nextImageButton = document.querySelector('button');
const imageWidth = 400;
nextImageButton.addEventListener('click',nextImage);
let currentImageIndex = 0;
function nextImage() {
    currentImageIndex++;
    if(currentImageIndex===imageCount) {
        currentImageIndex = 0;
    }
    container.style.left = currentImageIndex*imageWidth*-1 +"px";
}