
/*
Object---


info.num++;
info.name = 'other name';

delete info.name
info.stuff = 10; //add element

info[key] == info.key// גישה עקיפה

for(mykey in info) {
    console.log(mykey);
    console.log(info[mykey]);
}

const k = Object.keys(info);
for(let i=0; i<k.length; i++) {
    console.log(k[i]);
    console.log(info[k[i]]);
}

const new_object = Object.assign({},less,more importent);
*/

console.log(`\n\n\n\n AAAAAAAAAA`);

let info = {
    name: 'bob',
    email: 'bob@gmail.com',
    likes: ['to party' , 'to read'],
    num: 17,
};

info.num++;
console.log(info);
delete info.name;
console.log(info);
info.stuff = 10;
console.log(info);

console.log(`\n\n\n\n\n\nBBBBBBBBBB`);
for (myKey in info) {
    console.log(myKey + ": "+ info[myKey]);
}

console.log(`\n\n\n\n\n\nCCCCCCCCCCC`);
const myKeys = Object.keys(info);
for (i=0; i<myKeys.length; i++) {
    console.log(`For ${myKeys[i]} : ${info[myKeys[i]]}`);
}

console.log(`\n\n\n\n\n\nDDDDDDDDDDDDD`);
let data = {
    color: 'blue',
    border: '10px solid black',
};

let defaults = {
    display: 'block',
    border:'20px solid yellow',
};

const both = Object.assign({}, defaults, data);
const myKey2 = Object.keys(both);

for (let i=0; i<myKey2.length; i++) {
    console.log(`${i+1}.) ${myKey2[i]} : ${both[myKey2[i]]}`);
}


console.log(`\n\n\n\n\n\nEEEEEEEEEEEEEEEE`);

var email = {
  bob: 'bob@gmail.com',
  jane: 'jane@walla.co.il',
  bill: 'crazypen@yahoo.com'
};

// get all keys from an object
// keys is: ['bob', 'jane', 'bill']
var keys = _.keys(email);

// bob_and_jane is now a new object with only:
// { bob: 'bob@gmail.com', 
//   jane: 'jane@walla.co.il' }
var bob_and_jane = _.pick(email, 'bob', 'jane');

// true - object has key bob
_.has(email, 'bob');

// false - object doesn't have key foo
_.has(email, 'foo');



let info_targil = {
    name: 'Giti',
    email: 'gitik@rachip.com',
    address: 'Bene-brak',
    age:28,
    like:'code',
    desc: 'fat',
};

let info_targil2 = {
    name: 'Giti',
    email: 'gitiklar@gmail.com',
    address: 'Bene-brak',
    age:27,
    like:'code',
};

let new_obj = Object.assign({},info_targil,info_targil2);
let my_keys2 = Object.keys(new_obj);
console.log(my_keys2);

for (let i=0; i<my_keys2.length;i++) {
    console.log(`Together: ${my_keys2[i]} value: ${new_obj[my_keys2[i]]}`);
}


