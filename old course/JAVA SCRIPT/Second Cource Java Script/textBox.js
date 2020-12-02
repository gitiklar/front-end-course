
function Counter(box,maxlength) {
    this.box = {
        root:box,
        panel: box.querySelector('.panel'),
        textarea: box.querySelector('textarea'),
    }
    
    this.updateValue();
    this.box.textarea.addEventListener('input',this.updateValue.bind(this));
}

Counter.prototype.updateValue = function(){
    this.box.panel.textContent = Number(this.box.root.dataset.maxlength) -this.box.textarea.value.length;
}

Counter.prototype.resetTexts = function() {
   this.box.textarea.value = '';
    this.updateValue();
}

boxes = document.querySelectorAll('.textbox');
resetBtn = document.querySelector('#btn-reset');

for(let i=0;i<boxes.length;i++) {
    c = new Counter(boxes[i],boxes[i].dataset.maxlength);
    resetBtn.addEventListener('click', c.resetTexts.bind(c));
}





































/*
function LimitedTextbox(el, maxLength) {
  // Write constructor code here
    el.querySelector('.panel').textContent = maxLength;
    this.el = el
    this.maxLength = maxLength;
    this.textarea = el.querySelector('textarea');
    this.textarea.maxLength = maxLength;
    this.el.addEventListener('input' , this.UpdateRemaning.bind(this));
}

LimitedTextbox.prototype.UpdateRemaning = function() {
    this.el.querySelector('.panel').textContent = this.maxLength-this.textarea.value.length;
};

LimitedTextbox.prototype.reset = function() {
    this.textarea.value = '';
    this.UpdateRemaning();
};

var resetButton = document.querySelector('#btn-reset');
var boxes = document.querySelectorAll('.textbox');

for (var i=0; i < boxes.length; i++) {
  var box = new LimitedTextbox(boxes[i], boxes[i].dataset.maxlength);
  resetButton.addEventListener('click', box.reset.bind(box));
}
*/