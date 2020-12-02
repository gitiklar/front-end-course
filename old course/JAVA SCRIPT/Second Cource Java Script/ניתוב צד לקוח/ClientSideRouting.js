main = document.querySelector('main');
function showPage(pageName) {
    main.innerHTML = document.querySelector(`#t-${pageName}`).innerHTML;
}

function setPageFromHash() {
    window.addEventListener('hashchange',function() {

        if(window.location.hash==='#about') {
            showPage('about');
        }
        else {
            showPage('home');
        }
    })
    showPage('home');
}

setPageFromHash();





/*
let main = document.querySelector('main');

function showPage(name) {
  let html = document.querySelector(`#t-${name}`).innerHTML;
  main.innerHTML = html;  
}

window.addEventListener('hashchange', function() {
  setPageFromHash();
});

function setPageFromHash() {
  let hash = window.location.hash.substr(1);
  
  if (hash === 'about') {
    showPage('about');
  } else {
    showPage('home');
  }
}
setPageFromHash();
*/