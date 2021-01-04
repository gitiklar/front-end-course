var container = document.querySelector('div');

for (let i=0; i < 4; i++) {
    var btn = document.createElement('button');
    btn.addEventListener('click', function() {
        alert(i);
    });
    btn.textContent = i;
    container.appendChild(btn);
}

