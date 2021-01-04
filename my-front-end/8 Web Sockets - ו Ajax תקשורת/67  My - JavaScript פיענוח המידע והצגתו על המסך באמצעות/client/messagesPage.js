class MessagesPage {
    constructor(el , bus , service) {
        this.el = el;
        this.bus = bus;
        this.service = service;
        this.setupUi();
    }

    setupUi() {
        this.el.innerHTML = `
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
                            <h4>Incoming Messages <button id="load-messages-btn" class="btn btn-secondary" >Refresh</button></h4>
                            <ul class="timeline">
                            
                            </ul>
                            </div>
                        </div>
                    </div>        
                </div>
        `;
        this.form = this.el.querySelector('form');
        this.createMessagesEvents();
    }

    createMessagesEvents() {
        this.bus.subscribe('giveMeMessagesPage', () => {
            this.el.classList.add('visible');
            this.renderMessages();
        });
        this.form.addEventListener('submit', this.sendMessage.bind(this));
        this.el.querySelector('#load-messages-btn').addEventListener('click',this.renderMessages.bind(this));
        this.el.querySelector('#logout-btn').addEventListener('click' , ()=> {
            this.el.classList.remove('visible');
            this.bus.emit('giveMeLoginPage');
        });
    }

    async renderMessages() {
        const messages = await this.service.loadMessages();
        const timeLine = this.el.querySelector('.timeline');
        timeLine.innerHTML = '';
        const frag = document.createDocumentFragment();
        messages.forEach(message => {
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
        });
        timeLine.appendChild(frag);
    }

    async sendMessage(evt) {
        evt.preventDefault();
        const messageTextInput = this.form.querySelector('#msg-text');
        const messageToInput = this.form.querySelector('#msg-to');
        const text = messageTextInput.value;
        const to = messageToInput.value;
        if(text) {
            await this.service.sendMessage(text , to ? to : null);
            this.renderMessages();
            messageTextInput.value = '';
            messageToInput.value = '';
        } else {
            alert('The message can not be empty');
        }
    }
}