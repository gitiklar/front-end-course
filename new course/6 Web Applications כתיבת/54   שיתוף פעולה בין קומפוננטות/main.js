const divForDisplay = document.createElement('div');
const d1 = new Display(divForDisplay, bus);
document.body.appendChild(divForDisplay);

for(let i=0;i<5;i++) {
  const divForCounter = document.createElement('div');
  const c1 = new Counter(divForCounter, bus);
  document.body.appendChild(divForCounter);
}