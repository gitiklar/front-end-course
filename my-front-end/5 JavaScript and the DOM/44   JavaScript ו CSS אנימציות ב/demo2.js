const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click',()=>{
    box.classList.add('animated','bounce');
    btn.disabled = true;
    setTimeout(()=>{
        box.classList.remove('animated','bounce');
        btn.disabled = false;
    },1000);
})