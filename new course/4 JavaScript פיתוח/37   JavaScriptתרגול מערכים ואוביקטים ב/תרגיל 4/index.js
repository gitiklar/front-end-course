"use strict";

function play (cards,indexClick) {
    let allOpposite = true;
    let indexForVisibleTrue = -1;

    cards.forEach((obj,index) => {
       if(allOpposite=== false) return;
       if(obj.visible === true) {
            allOpposite = false;
            indexForVisibleTrue = index;     
       }
    });

    if(allOpposite) {
        cards[indexClick].visible = true;
    }
    else {
        let found = 0;
        if(cards[indexForVisibleTrue].value === cards[indexClick].value) {
            cards[indexForVisibleTrue].found = true;
            cards[indexClick].found = true;
            found = 1;
        }
        cards[indexForVisibleTrue].visible = false;
    }
}

const cards = [
    { value: 'A', visible: false, found: false },
    { value: 'A', visible: false, found: false },
    { value: 'B', visible: false, found: false },
    { value: 'B', visible: false, found: false },
    { value: 'C', visible: false, found: false },
    { value: 'C', visible: false, found: false },
];
