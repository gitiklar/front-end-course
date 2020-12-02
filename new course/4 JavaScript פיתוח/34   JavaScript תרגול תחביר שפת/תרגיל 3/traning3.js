"use strict";

function random(num1,num2) {
    let smaller = num1;
    if(num1>num2) {
        smaller = num2;
    }
    return Math.floor(Math.random()*(Math.abs(num1-num2))) + smaller;
}

function guessingNumbers() {
    const number = random(1,100);
    let answer = prompt('Choose a number between 1 and 100.');
    while(answer!=number) {
        if(answer>number) {
            answer = prompt('Too big try again!');
        }
        else {
            answer = prompt('Too small try again!');
        }
    }
    console.log(`Yes! you are succeeded! the number is: ${number}`);
}

guessingNumbers();