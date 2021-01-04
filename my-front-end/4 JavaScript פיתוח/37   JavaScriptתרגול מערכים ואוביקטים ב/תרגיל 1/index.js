"use strict";

function Gallery(images) {
    this.images = images;
    this.imagesWidth = [];
    this.currentIndex = 0;
    this.addOrSub = 'add';
    this.gallery = document.querySelector('.gallery');
    this.mesh = document.querySelector('.mesh');
    this.mesh.addEventListener('click',this.moveGallery.bind(this));
    this.setGalleryWidth();

}

Gallery.prototype.setGalleryWidth = function () {
    let sumOfWidths = 0
    Promise.all(Array.from(this.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        this.images.forEach((img)=>{
            sumOfWidths += img.width;
            this.imagesWidth.push(img.width);
        });
        this.gallery.style.width = `${sumOfWidths}px`;
        this.mesh.style.width = `${this.imagesWidth[0]}px`;
        this.mesh.style.overflow = 'hidden';
    });
}

Gallery.prototype.getLeftValueForImage = function() {
     return this.imagesWidth.reduce((size1,size2,index)=> {
        if(this.currentIndex===0) return 0;
        else if(index < this.currentIndex) return size1+size2;
        else return size1;
    })
}

Gallery.prototype.moveGallery = function() {
    this.updateCurrentIndex();
    this.gallery.style.left = `-${this.getLeftValueForImage()}px`;
    this.mesh.style.width =  `${this.imagesWidth[this.currentIndex]}px`;
}

Gallery.prototype.updateCurrentIndex = function() {
    if(this.currentIndex===this.images.length-1) {
        this.addOrSub = 'sub';
    }

    if(this.currentIndex===0) {
        this.addOrSub = 'add';
    }

    if(this.addOrSub === 'add') {
        this.currentIndex++;
    }
    else {
        this.currentIndex--;
    }
}

let images = document.querySelectorAll('img');
const gallery = new Gallery(images);
