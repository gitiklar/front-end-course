function Page(templateId) {
    this.template = templateId;
}

Page.prototype.enter = function(el) {
    this._el = el;
};

Page.prototype.leave = function() {
    
};

function HomePage() {
    Page.call(this,'t-home');   
    this.constructor = 'HomePage';
}

HomePage.prototype = Object.create(Page.prototype);

HomePage.prototype.leave = function() {
    this._el.textContent = 'bye bye';
    return new Promise(function(resolve,reject) {
        setTimeout(resolve,1000);
    })
}

function AboutPage() {
    Page.call(this,'t-about');
}

AboutPage.prototype = Object.create(Page.prototype);
