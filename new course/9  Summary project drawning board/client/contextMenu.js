"use strict";
import {bus} from './index.js';
export default class ContextMenu {
    constructor(ulElement , event) {
        this.ulElement = ulElement;
        this.setupUi(event);
    }

    setupUi(event) {
        this.ulElement.classList.add('list-group');
        this.ulElement.style.left = `${event.offsetX}px`;
        this.ulElement.style.top = `${event.offsetY}px`;
        this.ulElement.innerHTML = `
            <li class="list-group-item">Cut<span class="shortcut">Ctrl+X</span></li>
            <li class="list-group-item">Copy<span class="shortcut">Ctrl+C</span></li>
            <li class="list-group-item">Paste<span class="shortcut">Ctrl+V</span></li>
            <li class="list-group-item">Delete<span class="shortcut">⌫</span></li>
            <li class="list-group-item">Bring to Front<span class="shortcut">Ctrl+Shift+↑</span></li>
            <li class="list-group-item">Bring Forward<span class="shortcut">Ctrl+↑</span></li>
            <li class="list-group-item">Send to Back<span class="shortcut">Ctrl+Shift+↓</span></li>
            <li class="list-group-item">Send Backward<span class="shortcut">Ctrl+↓</span></li>
        `;
        this.ulElement.addEventListener('mousedown',(event)=>{
            const itemName = event.target.innerHTML.slice(0,event.target.innerHTML.indexOf('<'));
            bus.emit('contextMenuClick', itemName);
        });
    }

    remove() {
        this.ulElement.remove();
    }
}