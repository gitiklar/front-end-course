"use strict";

function isLetter(charCode) {
    if (charCode>=97 && charCode<=122) {
        return 'smallLetter';
    }
    else if (charCode>=65 && charCode<=90) {
        return 'bigLetteer';
    }
    else {
        return false;
    }
}

function rot13(word) {
    let newWord = '';
    for(let i=0;i<word.length;i++) {
        let curentLetter = word.charCodeAt(i);
        if(isLetter(curentLetter)==='smallLetter') {
            if(curentLetter+13<=122) {
                newWord+=String.fromCharCode(curentLetter+13);
            }
            else {
                newWord+=String.fromCharCode(96+ (13-(122-curentLetter)));
            }
        }
        else if(isLetter(curentLetter)==='bigLetteer') {
            if(curentLetter+13<=90) {
                newWord+=String.fromCharCode(curentLetter+13);
            }
            else {
                newWord+=String.fromCharCode(64+(13-(90-curentLetter)));
            }
        }
        else {
            newWord+=String.fromCharCode(curentLetter);
        }
    }
    return newWord;
}
