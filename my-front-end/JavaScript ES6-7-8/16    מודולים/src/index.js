import MyCar from './car.js';
import {firstLetter as first , lastLetter as last} from './utils.js';
import * as utils from './utils.js'
import {} from "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

const c = new MyCar();
c.drive();

console.log(first('giti'));
console.log(last('giti'));

console.log(utils.firstLetter('giti'));
console.log(utils.lastLetter('giti'));



document.querySelector('button').addEventListener('click', loadAndCallInc);
function loadAndCallInc() {
    import('./click.js').then(module=>{
        const {inc} = module;
        inc(this);
    });
}