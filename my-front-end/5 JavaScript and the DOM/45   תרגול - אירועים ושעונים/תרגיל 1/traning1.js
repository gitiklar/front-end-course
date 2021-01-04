function Slider(slider,images,imagesCount) {
    this.slider = slider;
    this.images = images;
    this.imagesCount = imagesCount;
    this.currentIndex = 0;
    this.widthImage = 900;
    this.svgContainer = document.querySelector('svg');
    this.svgCreate();
    this.startTimer();

    this.svgContainer.children[this.currentIndex].style.fill = "black";
    this.svgContainer.addEventListener('click',this.updateImageDueToClick.bind(this));
}

Slider.prototype.svgCreate = function() {
    const svgns = "http://www.w3.org/2000/svg";
    for(let i=0;i<12;i++) {
        let circle = document.createElementNS(svgns,'circle');
        circle.setAttributeNS(null,'cx', 20+40*i);
        circle.setAttributeNS(null,'cy',15);
        circle.setAttributeNS(null,'r',10);
        circle.classList.add(`circle${i}`);
        this.svgContainer.appendChild(circle);
    }
}

Slider.prototype.startTimer = function() {
    setInterval(this.moveImage.bind(this),4000);
}

Slider.prototype.moveImage = function() {
    for(let img of this.images.children) {
        img.classList.remove('animated','flip');
    }
    this.currentIndex++;
    if(this.currentIndex === this.imagesCount) {
        this.currentIndex = 0;
    }
    this.images.style.left = this.currentIndex*-1*this.widthImage + "px";
    this.images.children[this.currentIndex].classList.add('animated','flip');
    this.updateCircle();
}

Slider.prototype.updateCircle = function() {
    [...this.svgContainer.children].forEach((circle,index)=>{
        circle.style.fill = "white";
        if(index === this.currentIndex) {
            circle.style.fill = "black";
        }
    })
}

Slider.prototype.updateImageDueToClick = function() {
    if(event.target.tagName === "circle") {
        this.currentIndex = -1;
        if(this.currentIndex!=-1) return;
         [...this.svgContainer.children].forEach((circle,index)=>{
             if(circle.className === event.target.className) {this.currentIndex = index-1;}
        })
        this.updateCircle();
        this.moveImage();
    }
}

const slider = document.querySelector('.slider');
const images = document.querySelector('.images');
const imagesCount = images.children.length;
const sliderImages = new Slider(slider,images,imagesCount);
