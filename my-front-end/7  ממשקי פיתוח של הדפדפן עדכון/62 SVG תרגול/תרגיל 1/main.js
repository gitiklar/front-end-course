
const bus = new EventBus();
const allPageDiv = document.querySelector('.all-page');

const containerTextAreaAndTable = document.createElement('div');
containerTextAreaAndTable.classList.add('containerTextAreaAndTable');

const textArea = new TextArea(containerTextAreaAndTable, bus);
const table = new Table(containerTextAreaAndTable, bus);

const svgElement = document.createElementNS('http://www.w3.org/2000/svg','svg');
svgElement.classList.add(`rectangleGraph`);
svgElement.setAttributeNS(null, "viewBox", "0 0 " + 800 + " " + 500);
svgElement.setAttributeNS(null, "width", 800);
svgElement.setAttributeNS(null, "height", 500);

const graph = new Graph(svgElement , bus);

allPageDiv.appendChild(containerTextAreaAndTable);
allPageDiv.appendChild(svgElement);
document.body.insertBefore(allPageDiv , document.querySelector('script:first-of-type'));
