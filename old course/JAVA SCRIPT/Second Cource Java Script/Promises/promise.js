//Prompt of JS
/*
let btn = document.querySelector("#btn-start");
let result = document.querySelector('#result');

btn.addEventListener('click',myPrompt);

function myPrompt() {
    let name = prompt('Who are you?');
    result.innerHTML = name;
}
*/


//Prompt of my
/*
let btn_start = document.querySelector('#btn-start');
let prompt = document.querySelector('#prompt');
let btn_ok = document.querySelector('#btn-go');
let name = document.querySelector(".text");
let p = document.querySelector('p');
prompt.style.display = 'none';

btn_start.addEventListener('click',display);
btn_ok.addEventListener('click',btnOK);
new_p = document.createElement('p');
document.body.appendChild(new_p);

function display() {
    name.value = '';
    new_p.style.display ='none';
    prompt.style.display = 'block';
}

function btnOK() {
    if(name.value.length) {
        new_p.style.display ='block';
        prompt.style.display = 'none';
        new_p.innerHTML = name.value;
    }
}
*/

new_p = document.createElement('p');
document.body.appendChild(new_p);

let btn_start = document.querySelector('#btn-start');
let prompt = document.querySelector('#prompt');
let btn_ok = document.querySelector('#btn-go');
let name = document.querySelector(".text");
let p = document.querySelector('p');
prompt.style.display = 'none';


function waitForUserInput() {
    return new Promise(function (resolve,reject) {
            name.value = '';
            new_p.style.display ='none';
            prompt.style.display = 'block'
        
            btn_ok.addEventListener('click' , function(){
            resolve(name.value);
            prompt.style.display = 'none';
        })
    });
}

btn_start.addEventListener('click',function() {
    waitForUserInput().then(function(name) {
        new_p.style.display ='block';
        new_p.innerHTML = 'Hello ' + name;
    });
})
