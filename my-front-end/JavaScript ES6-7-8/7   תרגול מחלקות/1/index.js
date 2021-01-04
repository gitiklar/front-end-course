
const divContainer = document.createElement('div');
document.body.appendChild(divContainer);
divContainer.style.background = "gray";
divContainer.style.width = "500px";
divContainer.style.height = "500px";
divContainer.classList.add('divContainer');

class LightBlub {
    constructor(color) {
        this.color = color;
        this.createDiv();
        this.calcHeight();
    }

    createDiv() {
        this.div = document.createElement('div');
        this.div.style.background = this.color;
        divContainer.appendChild(this.div);
    }

    calcHeight() {
         const calc = 500 / divContainer.children.length;
         [...divContainer.children].forEach(element => {
            element.style.height = `${calc}px`;
         });
    }

    on() {
        this.div.style.background = "yellow";
    }

    off() {
        this.div.style.background = this.color;
    }
}

const lb = new LightBlub("gray");
const lb1 = new LightBlub("gray");
const lb2 = new LightBlub("gray");
