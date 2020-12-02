const btn =document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const results = document.querySelector('#value');

val=Number (localStorage.getItem('count'));
results.textContent = val;

function inc() {
    results.textContent = ++val;
    localStorage.setItem('count',val);
}

function reset() {
    results.textContent = 0;
    val = 0;
    localStorage.removeItem('count');
}

btn.addEventListener('click',inc);
btn2.addEventListener('click',reset);
results.textContent = localStorage.getItem('count');