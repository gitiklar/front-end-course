const inputs = document.querySelectorAll('input');
for(let inp of inputs) {
    inp.addEventListener('input',copyToAllInputText);
}

function copyToAllInputText() {
    for(let inp of inputs) {
        inp.value = event.target.value;
    }
}