let Utils = {};

Utils.injectTemplte = function(el, templateId) {
    el.innerHTML = document.querySelector(`#${templateId}`).innerHTML;
}