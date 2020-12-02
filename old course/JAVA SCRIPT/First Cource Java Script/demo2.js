/*

arr.push(1,2,3,4) - Insert to end of array.

arr.pop() - Removed from end of array.

arr.unshift(1,'giti',3) - Insert to start.

arr.shift() - Removed from start.

arr.splice(2,6) - Cut and return the elements which cuts to a new array.



arr.filter(boolean function) - pass of array and return filter array that answer yes of the condition, new array with less elements from original array.

arr.map(map function) - pass and do somthing of all elements and return new array with the same length.

arr.reduce(reduce function) - return one element from array
*/

console.log(`\n*****************\n*****************\n*****************\n*****************\n*****************\n*****************\n*****************\n*****************\n\n\n\n\n\n\n\n\n\n\n\n\n`);




let arr = [1,4,6,12,'Hi' , 'giti' , 23, 'eli',2,5,7,20,30,40,44,21,27];
console.log (`arr: ${arr}`);
arr.push(10,20,30,40);
console.log (`arr after push: ${arr}`);
const pop_obj = arr.pop();
console.log (`arr after pop: ${arr}`);
arr.unshift(pop_obj);
console.log (`arr after unshift: ${arr}`);
arr.shift();
console.log (`arr after shift: ${arr}`);
arr.splice(4,2);
console.log(`arr after splice: ${arr}`);

my_arr_filter = arr.filter((a,b)=>a%2===0);
console.log(`New array after filter: ${my_arr_filter}`);

my_arr_map = arr.map((x)=> x*2);
console.log(`New array after map: ${my_arr_map}`);

arr.forEach(x=>typeof(x)==="number" ? console.log(`${x} is number `): console.log(`${x} is string `));

arr = [1,4,6,12,'Hi' , 'giti' , 23, 'eli',2,5,7,20,30,30,40,44,21,40,27,'eli','eli','eli'];
console.log (`arr: ${arr}`);
for(let i =0 ; i< arr.length; i++) {
    if(typeof(arr[i])=="string") {
        arr.splice(i,1);
        i--;
    }
}
console.log (`arr after removed string with for: ${arr}`);


const arr2_sort = [...arr];

let sort_array = [];
for(let i=0; arr.length; i++) {
    sort_array.unshift(arr.reduce((num1,num2)=>num1>num2?num1:num2));
    arr.splice((arr.indexOf(sort_array[i])),1);
    i--;
}
console.log(`sort1: ${sort_array}`);


console.log(`\n\n\n\n\n\n\n \n\n\n\n\n\n\n*****************\n*****************\n*****************\n*****************\n*****************\n*****************\n*****************\n*****************`);

let arr2 = [2,5,7,20,30,40,44,21,27];

function even(x) {
    return x % 2!==0;
}
let evenNmbers = arr2.filter(even);
console.log(evenNmbers);




function time2 (x) {
    return x*2;
}
let results = arr2.map(time2);
console.log(results);





function sum(a,b) {
    return a+b;
}
let sum_numbers = arr2.reduce(sum);
console.log(sum_numbers);



///////////////////////////////////////////////////////////////////
let arr3 = [2,5,7,20,30,40,44,21,27];

x=arr3.filter((x)=>x%2!==0);
console.log(x);

y=arr3.map((num=>num*2));
console.log(y);

z = arr3.reduce((a,b)=>a+b);
console.log(z);

w = arr3.forEach(text=>console.log(`Hi: ${text}`));







