function HelpPage(main) {
    Page.call(this,'help',main);
    this.constructor = 'HelpPage';
}

HelpPage.prototype = Object.create(Page.prototype);

HelpPage.prototype.enter = function() {
    this.injectTemplte(this.main , this.templateId);
}

HelpPage.prototype.leave = function() {
    
}