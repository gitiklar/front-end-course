"use strict";

let tbody = document.querySelector('tbody:nth-child(1)');
let table = "";

for(let i=1;i<10;i++) {
    table+="<tr>";
    for(let j=1;j<10;j++) {
        table+=`<td>${i*j}</td>`;
    }
    table+="</tr>";
}

tbody.innerHTML = table;

let tbody2 = tbody.nextElementSibling;
let frag = document.createDocumentFragment();
for(let i=1; i<10 ;i++) {
    let tr = document.createElement('tr');
    for(let j=1;j<10;j++) {
        let td = document.createElement('td');
        td.textContent = `${i*j}`;
        if(i===3 || j===3) {
            td.style.backgroundColor = "yellow";
        }
        tr.appendChild(td);
    }
    frag.appendChild(tr);
}
tbody2.appendChild(frag);