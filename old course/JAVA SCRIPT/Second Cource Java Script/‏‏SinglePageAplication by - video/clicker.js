function ClickerPage() {
    Page.call(this,'t-clicker');
    this.val = 0;
}

ClickerPage.prototype = Object.create(Page.prototype);

ClickerPage.prototype.enter = function(el) {
    Page.prototype.enter.call(this, el);
    
    this.el = {
        panel: this._el.querySelector('.panel'),
        btn: this._el.querySelector('button')
    };
    this.el.btn.addEventListener('click', this.inc.bind(this));
}

ClickerPage.prototype.inc = function() {
    this.el.panel.textContent = ++this.val;
}