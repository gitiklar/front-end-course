function Application(el) {
    this.el = el;
    window.addEventListener('hashchange',this.setPageFromHash.bind(this));
    this.setPageFromHash();
}

Application.prototype.showPage = function(Page) {
    let nextPage = new Page();
    if(this.activePage) {
        if(this.activePage.constructor === 'HomePage') {
            this.activePage.leave().then(this.step2.bind(this,nextPage));
        }
        else {
            this.step2(nextPage);
        }
    }
    else {
        this.step2(nextPage);
    }
}

Application.prototype.step2 = function(nextPage) {
    this.el.innerHTML = document.querySelector(`#${nextPage.template}`).innerHTML;
    this.activePage = nextPage;
    this.activePage.enter(this.el);
}

Application.prototype.setPageFromHash = function() {
    let hash = window.location.hash.substr(1);
    if(hash==='about') {
        this.showPage(AboutPage);
    }
    else {
        if (hash==='clicker') {
            this.showPage(ClickerPage);
        }
        else {
            this.showPage(HomePage);
        }
    }
}