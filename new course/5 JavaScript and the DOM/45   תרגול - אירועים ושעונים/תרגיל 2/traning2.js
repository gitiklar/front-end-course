const number = document.querySelector('.number');
const textArea = document.querySelector('textarea');
const btn =document.querySelector('button');

textArea.addEventListener('input',()=>{
    number.textContent = textArea.value.length;
})

btn.addEventListener('click',()=>{
    textArea.value = '';
    number.textContent = 0;
})