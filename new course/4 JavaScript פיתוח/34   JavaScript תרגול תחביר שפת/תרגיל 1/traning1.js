"use strict";

function random(num1,num2) {
    let smaller = num1;
    if(num1>num2) {smaller = num2;}
    return Math.floor(Math.random()*((Math.abs(num1-num2)))) + smaller  ;
}

function rand3NumbersAndMax() {
    let arr = [random(1,100),random(1,100),random(1,100)];
    console.log(`num1: ${arr[0]} num2: ${arr[1]} num3: ${arr[2]} max:${Math.max(...arr)}`);
}

rand3NumbersAndMax();