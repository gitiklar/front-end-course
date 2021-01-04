class TextArea {
    constructor(el) {
        el.innerHTML = `
        <p>Count of characters: <span class="count"></span></p>
        <textarea></textarea>
        `;
        this.count = el.querySelector('p > span');
        this.textArea = el.querySelector('textarea');
        this.textArea.addEventListener('input', this.inc);
    }

    inc = () => {
        this.count.innerHTML = this.textArea.value.length;
    }

}


const textsArray = [];

for(let i=0;i<5;i++) {
    const el = document.createElement('div');
    document.body.appendChild(el);
    textsArray[i] = new TextArea(el);
}