const bus = new EventBus();
const formElement = document.createElement('form');
const form = new Form(bus , formElement);
document.body.appendChild(formElement);