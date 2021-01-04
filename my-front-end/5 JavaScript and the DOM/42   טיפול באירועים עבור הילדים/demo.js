// My
const inputs = document.querySelector('.inputs');
const btnAddInput = document.querySelector('#add-input');
btnAddInput.addEventListener('click',addInput);

function addInput() {
    let inp = document.createElement('input');
    inputs.appendChild(inp);
}

inputs.addEventListener('input', copyInputToAllInputs);

function copyInputToAllInputs() {
    for(let inp of inputs.children) {
        inp.value = event.target.value;
    }
}


//ToCode
function handleTextInBox(event) {    
    const value = event.target.value;
    // const value = event.data;
    const boxes = document.querySelectorAll('.inputs input');
    for (let box of boxes) {
        box.value = value;
    }
}

const container = document.querySelector('.inputs');
container.addEventListener('input', handleTextInBox);

const addInputButton = document.querySelector('#add-input');
addInputButton.addEventListener('click', function() {
    const inp = document.createElement('input');
    document.querySelector('.inputs').appendChild(inp);
});





