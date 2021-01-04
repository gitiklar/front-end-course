const bus = new EventBus();
const localStorageObj = new LocalStorage(bus);

const formElement = document.createElement('form');
const form = new Form(formElement, bus);
document.body.insertBefore(formElement, document.querySelector('script:first-of-type'));

const tableElement = document.createElement('table');
const table = new Table(tableElement, bus , localStorageObj);
document.body.insertBefore(tableElement,document.querySelector('script:first-of-type'));

