var x = 10;
var y = 20;

var z = x + y;

function ChangeBackgroundColor() {
    document.body.style.backgroundColor = 'white';
}

document.querySelector('button').addEventListener('click', ChangeBackgroundColor);