// JavaScript Arrays

// 1. Defining Arrays
const colors = ['red', 'blue', 'white'];
const arr = [10,20,'three',[10,20,30],null];

// 2. Access arrays items and length
console.log(arr[0]);
arr[0] = 99;
console.log(arr);

// 3. Array Methods
arr.push(40);
arr.unshift(0);
arr.pop();
arr.shift();
arr.splice(1,2);

// 4. Arrays and Loops
for(let clr of colors) {
    console.log(clr);
}

for(let i =0; i<colors.length;i++) {
    const clr = colors[i];
    console.log(`Colors[${i}] === ${clr}`);
}
// 5. Array and const

let numbers = [10, 12, 17, 5, 9];

function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

function printSingleItem(val, index) {
  console.log(`Index = ${index}; Value = ${val}`);
}

const total = numbers.reduce(sum);
console.log('sum of all items = ' + total);

const squares = numbers.map(square);
console.log('squares = ', squares);

const sumSquares = numbers.map(square).reduce(sum);
console.log('sum of squares = ' + sumSquares);

numbers.forEach(printSingleItem);
