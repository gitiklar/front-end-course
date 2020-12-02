let progress = document.querySelector('.progress-bar');
let password = document.querySelector('[type="password"]');
password.addEventListener('input',checkInput);
password.removeAttribute('type');

function checkInput() {
    const anUpperCase = /[A-Z]/g;
    const aLowerCase = /[a-z]/g; 
    const aNumber = /[0-9]/g;
    const aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/g;
    let strong =1;

    if(password.value.length >= 5) {
        strong++;
        if((password.value.search(anUpperCase)!=-1 && password.value.search(aLowerCase)!=-1) && password.value.search(aNumber)!=-1) {
            strong++;
            if(password.value.length >= 8 && password.value.search(aSpecial)) {
                strong++;
            }
        }
    }

    switch (strong) {
        case 2: progress.style.width = "50%";
                progress.classList.remove('bg-danger');
                progress.classList.add('bg-warning');
            break;
        case 3: progress.style.width = "75%";
                progress.classList.remove('bg-warning');
                progress.classList.add('bg-info');
            break;
        case 4: progress.style.width = "100%";
                progress.classList.remove('bg-info');
                progress.classList.add('bg-success');
            break;
        default: progress.style.width = "25%";
                 progress.classList.add('bg-danger');
    }

    if(password.value.length === 0) {
        progress.style.width = "0.1%";
    }
}