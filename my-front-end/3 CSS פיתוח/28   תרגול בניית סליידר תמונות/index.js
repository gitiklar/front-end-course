

function Slider(images) {
    this.images=images;
    this.images.addEventListener('click',this.changePosition.bind(this));
    this.position = 0;
    this.addOrSub = 'add';
}

Slider.prototype.changePosition = function() {
    if(this.position===(this.images.children.length-1)*200) {
        this.addOrSub = 'sub';
    }
    if(this.position===0) {
        this.addOrSub = 'add';
    }

    if(this.addOrSub==='add') {
        this.position +=200;
    }
    else {
        this.position -=200;
    }
    this.images.style.right= `${this.position}px`;
}

const images = document.querySelector('.images');
const slider = new Slider(images);