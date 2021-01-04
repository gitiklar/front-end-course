const btnStart = document.querySelector('.my-btn-start');
const ball = document.querySelector('.container-board>svg>circle');
const rectUp = document.querySelector('.rectUp');
const rectDown = document.querySelector('.rectDown');
const myApplication = new Application(btnStart,rectUp,rectDown,ball);
