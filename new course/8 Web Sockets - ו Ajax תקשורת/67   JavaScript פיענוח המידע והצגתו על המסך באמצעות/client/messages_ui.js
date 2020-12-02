const loginForm = document.querySelector('#login-page form');
const newMessageForm = document.querySelector('#messages-page form');
const service = new MessagesService();
const pages = {
  login: document.querySelector('#login-page'),
  messages: document.querySelector('#messages-page'),
};

loginForm.addEventListener('submit', login);
newMessageForm.addEventListener('submit', sendMessage);
pages.messages.querySelector('#load-messages-btn').addEventListener('click', renderMessages);

async function login(evt) {
  evt.preventDefault();
  const username = loginForm.querySelector('[name="username"]').value;
  if(username.length === 0) {
    alert('User name can not be with length 0');
  } else {
      loginForm.querySelector('[name="username"]').value = '';
      await service.login(username);
      pages.login.classList.remove('visible');
      pages.messages.classList.add('visible');
      renderMessages();
  }
}

async function renderMessages() {
  const messages = await service.loadMessages();
  const timeLine = pages.messages.querySelector('.timeline');
  timeLine.innerHTML = '';
  const frag = document.createDocumentFragment();
  for(let message of messages) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const p = document.createElement('p');
    span.classList.add('from');
    span.innerHTML = message.from;
    p.innerHTML = message.text;
    message.to && li.classList.add('public');
    li.appendChild(span);
    li.appendChild(p);
    frag.appendChild(li);
  }
  timeLine.appendChild(frag);
}

async function sendMessage(evt) {
  evt.preventDefault();
  const text = pages.messages.querySelector('#msg-text').value;
  if(!text) {return alert('Message can not be empty')};
  const to = pages.messages.querySelector('#msg-to').value;
  await service.sendMessage(text , to.length > 0 ? to : null);
  pages.messages.querySelector('#msg-text').value = '';
  pages.messages.querySelector('#msg-to').value = '';
  renderMessages();
}