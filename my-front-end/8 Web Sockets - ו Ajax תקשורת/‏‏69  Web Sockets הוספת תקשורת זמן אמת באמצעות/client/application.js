import LoginPage from './loginPage.js';
import MessagesPage from './messagesPage.js';

export default class Application {
    constructor(bus ,  service) {
        this.bus = bus;
        this.service = service;
        this.renderPage();
        this.subscribes();
    }

    renderLogin() {
        this.currentPage = new MessagesPage(this.bus , this.service);
    }

    renderMessages() {
        this.currentPage = new LoginPage(this.bus , this.service);
    }

    renderPage = () => {
        if(this.currentPage && this.currentPage.constructor.name === 'LoginPage') {
            this.renderLogin();
        } else {
            this.renderMessages();
        }
    }

    subscribes() {
        this.bus.subscribe('replacePage' , this.renderPage);
    }

}