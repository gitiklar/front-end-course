function Page(templateId) {
    this.templateId = templateId;
    this.main = main;
}

Page.prototype.injectTemplte = function(el, templateId) {
    el.innerHTML = document.querySelector(`#${templateId}`).innerHTML;
}

Page.prototype.enter = function() {
    
}

Page.prototype.leave = function() {
    
}