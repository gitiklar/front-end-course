const bus = new EventBus();

for(let i=0; i<5; i++) {
    const pageObjects = [new Page1(document.createElement('div'), bus , `form${i+1}`), new Page2(document.createElement('div'), bus , `form${i+1}`), new Page3(document.createElement('div'),bus , `form${i+1}`)];
    const formElement = document.createElement('form');
    formElement.id = `form${i+1}`;
    const form = new Form(bus , formElement ,pageObjects);
    document.body.appendChild(formElement);
}
