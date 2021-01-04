"use strict";
const words = ["1111111111" , "22222222222222" , "33333333333" , "44444444444444", "55555555555"];

const div = document.querySelector('div');
for(let input of div.children) {
    input.value = "this is my sentence";
}

for(let input of div.children) {
    input.value = words[Math.floor(Math.random()*words.length)];
}