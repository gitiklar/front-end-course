let boxes = document.querySelectorAll('.box');
let max_hight = boxes[0].clientHeight;

for (let i=1;i<boxes.length;i++) {
    if(boxes[i].clientHeight > max_hight) {
        max_hight = boxes[i].clientHeight;
    }
}

for(let i=0;i<boxes.length;i++) {
    boxes[i].style.height = max_hight + 'px';
}