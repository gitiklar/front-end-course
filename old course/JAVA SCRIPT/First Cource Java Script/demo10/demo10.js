function inc(event) {
    let btn = event.target;
    if(btn.tagName!=='BUTTON') {
        return;
    }
    let num = Number(btn.textContent);
    btn.textContent=num+1;
}

let btns = document.querySelector('.counters');
btns.addEventListener('click',inc);
