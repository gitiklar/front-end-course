(function() {
const startIntervalDemo = document.querySelector('#start-interval-demo');
const cancelIntervalDemo = document.querySelector('#cancel-interval-demo');
const result2 = document.querySelector('#result2');

cancelIntervalDemo.addEventListener('click', cancel);
startIntervalDemo.addEventListener('click', start);

const text = ['wait for it...','Hi!' , 'bye!', ''];
let index = 0;
let timerId;

function start() {
    cancel();
    timerId = setInterval(tick,1000);
}

function tick() {
    result2.textContent = text[index];
    index = (index+1) % text.length;
}


function cancel() {
    clearInterval(timerId);
    result2.textContent = '';
    index = 0;
}

}());
