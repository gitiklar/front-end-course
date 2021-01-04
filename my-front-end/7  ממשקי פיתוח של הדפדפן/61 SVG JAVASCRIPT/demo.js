const svgns = "http://www.w3.org/2000/svg";
const svg = document.querySelector('svg');
const colors = ['red','orange','blue'];

for(let i=0; i<10;i++) {
    const myCircle = document.createElementNS(svgns,'circle');
    myCircle.setAttributeNS(null, 'cx' , i*30);
    myCircle.setAttributeNS(null, 'cy' , i*30);
    myCircle.setAttributeNS(null, 'r' , 15);
    myCircle.classList.add('circle');
    myCircle.style.fill = colors[i%colors.length];
    svg.appendChild(myCircle);
}

svg.addEventListener('click',function(){
    const shape = event.target;
    if (!shape.classList.contains('circle')) return;
    shape.setAttributeNS(null, 'cy' , 300);
})