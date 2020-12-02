const bus = new EventBus();

for(let i=0; i<5; i++) {
    const formElement = document.createElement('form');
    formElement.id = `form${i+1}`;
    const form = new Form(bus , formElement);
    document.body.appendChild(formElement);
}
