var numbers = [10, 25, 70, 5,200, 2, 8];
var max = Math.max.apply(null, numbers);

var frag = document.createDocumentFragment();


for (var i=0; i < numbers.length; i++) {
  var li = document.createElement('li');
  li.textContent = numbers[i];
  if (numbers[i] === max) {
    li.classList.add('max');
  }
    
  frag.appendChild(li);
}

var ul = document.querySelector('.numbers');
ul.appendChild(frag);