"use strict";
export default class Header {
   constructor (headerElement, bus) {
       this.headerElement = headerElement;
       this.bus = bus;
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