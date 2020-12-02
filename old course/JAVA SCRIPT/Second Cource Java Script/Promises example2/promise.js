function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const btnWithDelay = document.getElementById('fill-with-delay');
const btnNoDelay = document.getElementById('fill');
const btnClear = document.getElementById('clear');
const panel = document.querySelector('.panel');

 function fillWithDelay() {
  for (let i=0; i < 10; i++) {
    panel.textContent += `Iteration ${i}...`;
    await sleep(150);
  }
}

function fillWithDelay1(n) {
  panel.textContent += `Iteration ${n}...`;
  
  if ( n > 0 ) {
    setTimeout(function() {
      fillWithDelay(n - 1);
    }, 150)
  }
}

function fillWithDelay2() {
  fillWithDelay1(10);
}

function fillNoDelay() {
  for (let i=0; i < 10; i++) {
    panel.textContent += `Iteration ${i}...`;
  }  
}

btnWithDelay.addEventListener('click', fillWithDelay2);
btnNoDelay.addEventListener('click', fillNoDelay);
btnClear.addEventListener('click', function() {
  panel.textContent = '';
});