function printTimes(text , times = 5) {
    for(let i = 0 ; i< times ; i++) {
        console.log(text);
    }
}

printTimes('hello');
printTimes('hello' , 3);

function longetThan(minLength , ...words) {
    return words.filter(w=>w.length>minLength);
}
longetThan(4 , 'aaaaa', 'ggg' , 'fffff' , 'jjjj');
