const bus = new EventBus();

const divTextArea = document.createElement('div');
divTextArea.classList.add('textarea');
const textArea = new TextArea(divTextArea, bus);
document.body.insertBefore(divTextArea, document.body.querySelector('script:first-of-type'));

const divCalendar = document.createElement('div');
divCalendar.classList.add('box');
const calendar = new Calendar(divCalendar, bus);
document.body.insertBefore(divCalendar, document.body.querySelector('script:first-of-type'));

