var b1 = document.querySelector('#btn1');
var b2 = document.querySelector('#btn2');
var panel = document.querySelector('p');

function writeText(text) {
  /* Write Code Here To Make The Program Work */
    return function(){panel.textContent=text};
}

b1.addEventListener('click', writeText('yo'));
b2.addEventListener('click', writeText('nice to meet you'));