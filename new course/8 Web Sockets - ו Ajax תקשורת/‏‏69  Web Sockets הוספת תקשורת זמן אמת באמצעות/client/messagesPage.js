import {socket} from './index.js';

export default class MessagesPage {
    constructor(bus , service) {
        this.bus = bus;
        this.service = service;
        this.setupUi();
    }

    setupUi() {
        document.body.innerHTML = `
                <div id="messages-page" class="page container">
                    <h1>
                        Messages Page
                        <button id="logout-btn" class="btn btn-danger btn-sm">Logout</button>
                    </h1>
                    <div class="page-content">
                        <div class="left container mt-5 mb-5">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4>Send Message</h4>
                                    <form id="new-message-form">
                                        <div class="form-group">
                                            <label for="msg-text" >Message Text:</label>
                                            <input type="text" id="msg-text" name="message-text" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="msg-to">To (leave blank to make it a public message):</label>
                                            <input type="text" id="msg-to" name="message-to" class="form-control" />
                                        </div>
                                        <input type="submit" value="Send" class="btn btn-primary" />
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="right container mt-5 mb-5">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4>Incoming Messages</h4>
                                    <ul class="timeline">
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>        
                    </div>
                </div>
        `;
        this.start();
    }

    async addMessageInput() {
        const message = this.messageInput.value.length && this.messageInput.value;
        if(!message) {return alert('The message can not be empty')};
        const to = this.toInput.value.length ? this.toInput.value : null;       
        this.service.sendMessage(message , to);
        this.clearInputs();
    }

    clearInputs() {
        this.messageInput.value = '';
        this.toInput.value = '';
    }

    renderMessage = (message) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const p = document.createElement('p');
        span.classList.add('from');
        span.innerHTML = message.from;
        p.innerHTML = message.message;
        message.to && li.classList.add('public');
        li.appendChild(span);
        li.appendChild(p);
        this.timeLine.appendChild(li);
    }
    
    renderAllMyMessages(messages) {
        for(let message of messages) {
            this.renderMessage(message);
        }
    }

    async getMessagesAndGoToRender() {
        const messages = await this.service.loadMessages();
        this.renderAllMyMessages(messages);
    }

    createEvents() {
        socket.on('message', this.renderMessage);
        this.form.addEventListener('submit' , (evt)=>{
            evt.preventDefault();
            this.addMessageInput();
        });
        this.logOutBtn.addEventListener('click' , ()=>{
            this.bus.emit('replacePage');
        });
    }

    start() {
        this.logOutBtn = document.querySelector('#messages-page h1 button');
        this.form = document.querySelector('#messages-page form');
        this.messageInput = this.form.querySelector('#msg-text');
        this.toInput = this.form.querySelector('#msg-to');
        this.timeLine = document.querySelector('#messages-page .timeline');
        this.getMessagesAndGoToRender();
        this.createEvents();
    }
}