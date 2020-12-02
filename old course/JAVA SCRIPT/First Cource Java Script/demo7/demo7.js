let ul = document.querySelector('.numbers');
let children = ul.childNodes;
let max = Number(children[0].textContent);
let child_max = children[0];

for (let i=0;i<children.length;i++) {
    if (Number(children[i].textContent) > max) {
            max = Number(children[i].textContent);
            child_max = children[i];
       }
}

child_max.classList.add('max');