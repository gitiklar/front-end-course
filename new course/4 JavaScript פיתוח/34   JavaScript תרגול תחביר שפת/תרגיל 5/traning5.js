"use strict";

function thereIsThisTavBetween(password, firstTav, lastTav){
    for(let i=firstTav;i<=lastTav;i++) {
        if(password.indexOf(String.fromCharCode(i))!=-1) {
            return true;
        }
    }
    return false;
}

function isStrongPassword(password) {
    if(password.length>=7) {
        if(thereIsThisTavBetween(password,'a'.charCodeAt(0),'z'.charCodeAt(0))) {
            if(thereIsThisTavBetween(password,'A'.charCodeAt(0),'Z'.charCodeAt(0))) {
                if(thereIsThisTavBetween(password,'0'.charCodeAt(0),'9'.charCodeAt(0))) {
                    if(password.match(/[^A-Za-z0-9]/g)) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        }
        return false;
    }
    return false;
}

function isStrongPassword2(password) {
    const regexp=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(password.match(regexp)) 
        { 
            return true;
        }
    return false;
}