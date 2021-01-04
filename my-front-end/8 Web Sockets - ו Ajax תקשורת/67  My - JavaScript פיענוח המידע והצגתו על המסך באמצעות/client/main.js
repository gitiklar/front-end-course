const bus = new EventBus();
const service = new MessagesService();

const loginContainerPage = document.createElement('div');
loginContainerPage.classList.add('page' , 'visible');
loginContainerPage.id = 'login-page';
document.body.insertBefore(loginContainerPage , document.querySelector('script:first-of-type'));
const loginPage = new LoginPage(loginContainerPage , bus , service);

const messagesContainerPage = document.createElement('div');
messagesContainerPage.classList.add('page' , 'container');
messagesContainerPage.id = 'messages-page';
document.body.insertBefore(messagesContainerPage , document.querySelector('script:first-of-type'));
const messagesPage = new MessagesPage(messagesContainerPage , bus , service);


