(function() {
"use strict";
const startTimeoutDemo = document.querySelector('#start-timeout-demo');
const cancelTimeoutDemo = document.querySelector('#cancel-timeout-demo');
const result1 = document.querySelector('#result1');

startTimeoutDemo.addEventListener('click',start);
cancelTimeoutDemo.addEventListener('click', cancel);
let timerId;

const text = ['wait for it...','Hi!' , 'bye!', ''];
let index = 0;

function start() {
    cancel();
    function tick() {
        result1.textContent = text[index];
        index = [index + 1] % text.length;
        timerId = setTimeout(tick,1000);
    }
    tick();
}

function cancel() {
    clearTimeout(timerId);
    result1.textContent = '';
    index = 0;
}
}());

