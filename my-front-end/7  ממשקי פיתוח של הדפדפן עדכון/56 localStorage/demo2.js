/*
const form = document.querySelector('form');
form.addEventListener('input', writeInputsToObject);

let inputObj = {};
(function fillFormFromLocalStorage() {
    inputObj = JSON.parse(localStorage.getItem('formData')) || 0;
    if(inputObj) {
        form.querySelectorAll('[name]').forEach((input)=>{
            input.value = inputObj[input.name];
        });
    }
    else {
        inputObj = {};
    }
}());


function writeInputsToObject() {
    form.querySelectorAll('[name]').forEach((input)=>{
        inputObj[input.name] = input.value;
    });
    saveDataInLocalStorage(inputObj);
}

function saveDataInLocalStorage(data) {
    localStorage.setItem('formData', JSON.stringify(data));
}





*/
















const form = document.querySelector('form');

form.addEventListener('input', function() {
    const formData = readFormFieldsAsObject();
    localStorage.setItem('formData' ,JSON.stringify(formData));
});

const dataString = localStorage.getItem('formData');
writeDataToForm(JSON.parse(dataString));

function writeDataToForm(data) {
    let inp;
    try {
        const names = Object.keys(data);
        for(let name of names) {
            inp = form.querySelector(`[name="${name}"]`);
            inp.value = data[name];
        }
    } catch(err) {
        console.log(err);
        console.log('Invalid Data: ' + data);
        localStorage.removeItem('formData');
    }

   
}

function readFormFieldsAsObject() {
    const data = {};
    const inputs =  form.querySelectorAll('input,select');
    for(let inp of inputs) {
        data[inp.name] = inp.value;
    }
    return data;
}
