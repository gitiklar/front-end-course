"use strict";
export default class Header {
   constructor (headerElement) {
       this.headerElement = headerElement;
       this.setupUi();
   }

   setupUi() {
       this.headerElement.innerHTML = `
            <h1>Drawing board</h1>
       `;
       this.position = 0;
       this.animateBackground();
   }

   animateBackground = ()=> {
       this.position += 3;
       this.headerElement.style.backgroundPositionY = `${this.position}px`;
       requestAnimationFrame(this.animateBackground);
   }
}