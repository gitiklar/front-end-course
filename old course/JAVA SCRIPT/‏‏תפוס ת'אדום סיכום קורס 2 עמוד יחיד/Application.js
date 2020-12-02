function Application(main) {
    this.pages = [new GamePage(main), new HelpPage(main)];
        this.currentPage = this.pages[0];
    window.addEventListener('hashchange',this.hashChange.bind(this));
    this.firstBoot();
}

Application.prototype.welcomeGame = function() {
    this.currentPage.injectTemplte(this.currentPage.main , 'welcome');
    myThis = this;
    //promise returns this = window and not Application 
    return new Promise(function(resolve,reject) {
        setTimeout(resolve,2000);
    })
}

Application.prototype.firstBoot = function() {
    this.currentPage.injectTemplte(this.currentPage.main , this.currentPage.templateId);
    this.currentPage.enter();
}

Application.prototype.showPage = function (numPageInArray) {
    this.currentPage.leave();
    this.currentPage = this.pages[numPageInArray];
    if(this.currentPage.constructor === 'GamePage') {
        this.welcomeGame().then(function() {
            myThis.currentPage.enter();
        });
    }
    else {
        this.currentPage.enter();
    }  
}

Application.prototype.hashChange = function() {
    hashName = window.location.hash.substr(1);
    switch (hashName) {
        case 'game':
            this.showPage(0);
            break;
        case 'help':
            this.showPage(1);
    }
}
