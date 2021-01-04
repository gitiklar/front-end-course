
function Gallery(preBtn,nextBtn, gallery) {
    this.preBtn  = preBtn;
    this.nextBtn = nextBtn;
    this.gallery = gallery;
    this.currentImageIndex = 0;
    this.currentImg = document.querySelector('main img');
    this.preBtn.addEventListener('click',this.pre.bind(this));
    this.nextBtn.addEventListener('click',this.next.bind(this));
    this.updateImage();
}

Gallery.prototype.updateImage = function() {
    let newSrc = this.gallery.children[this.currentImageIndex].getAttribute('src');
    this.currentImg.setAttribute('src', newSrc);
    this.gallery.children[this.currentImageIndex].style.webkitFilter = "none";
}

Gallery.prototype.pre = function() {
    this.gallery.children[this.currentImageIndex].style.webkitFilter = "grayscale()";
    if(this.currentImageIndex) {
        this.currentImageIndex--;
    }
    this.updateImage();
}

Gallery.prototype.next = function() {
    this.gallery.children[this.currentImageIndex].style.webkitFilter = "grayscale()";
    if(this.currentImageIndex < this.gallery.children.length-1) {
        this.currentImageIndex++;
    }
    this.updateImage();
}

const preBtn = document.querySelector('.carousel-control-prev');
const nextBtn = document.querySelector('.carousel-control-next');
const gallery = document.querySelector('.gallery');
const myGallery = new Gallery(preBtn,nextBtn, gallery);
