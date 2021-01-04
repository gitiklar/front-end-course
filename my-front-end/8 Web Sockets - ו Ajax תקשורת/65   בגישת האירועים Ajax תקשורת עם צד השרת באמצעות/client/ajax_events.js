/*
const serverUrl = 'http://localhost:8080';

class MessagesService {
    constructor() {
        this.token = null;
    }

    login(username) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST' , `${serverUrl}/login`);
        xhr.setRequestHeader('content-type' , 'application/json');
        xhr.send(JSON.stringify({ username: username }));
        xhr.addEventListener('load',this.loginComplete.bind(this));
        xhr.addEventListener('error', this.error.bind(this));
    }

    loginComplete(evt) {
        const xhr = evt.target;
        if(xhr.status!==200) {return this.error(evt);};
        const data = JSON.parse(xhr.responseText);
        this.token = data.token;
        console.log(`Got server token: ${this.token}`);
    }

    sendMessage(text, to=null) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST' , `${serverUrl}/messages`);
        xhr.setRequestHeader('content-type' , 'application/json');
        xhr.setRequestHeader('token' , `${this.token}`);
        xhr.send(JSON.stringify({ text , to }));
        xhr.addEventListener('load',this.sendMessageComplete.bind(this));
        xhr.addEventListener('error', this.error.bind(this));
    }

    sendMessageComplete(evt) {
        const xhr = evt.target;
        if(xhr.status!==201) {return this.error(evt);};
        
        console.log(`message sent OK`);
    }

    loadMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET' , `${serverUrl}/messages`);
        xhr.setRequestHeader('content-type' , 'application/json');
        xhr.setRequestHeader('token' , `${this.token}`);
        xhr.send();
        xhr.addEventListener('load',this.loadMessagesComplete.bind(this));
        xhr.addEventListener('error', this.error.bind(this));
    }

    loadMessagesComplete(evt) {
        const xhr = evt.target;
        if(xhr.status!==200) {return this.error(evt);};
        
        console.log(`messages: ${xhr.responseText}`);

    }

    error(evt) {
        alert('Somthing went wrong sorry try again');
    }
}
const service = new MessagesService();
*/

const serverUrl = 'http://localhost:8080';

class MessagesService {
    constructor() {
        this.token = null;
    }

    createXHR(method , url , data , loadFunction , token = null) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type','application/json');
        token && xhr.setRequestHeader('token' , token);
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', loadFunction.bind(this));
        xhr.addEventListener('error',this.error.bind(this));   

    }

    login(username) {
        this.createXHR('POST' , `${serverUrl}/login` , {username} , this.loginComplete);
    }

    loginComplete(evt) {
        const xhr = evt.target;
        if(xhr.status !== 200) {return this.error(evt);}
        const data = JSON.parse(xhr.responseText);
        this.token = data.token;
        console.log(this.token);
    }

    sendMessage(text , to=null) {
        this.createXHR('POST' , `${serverUrl}/messages`, {text , to} , this.sendMessageComplete , `${this.token}`);
    }

    sendMessageComplete(evt) {
        const xhr = evt.target;
        if(xhr.status !== 201) {return this.error(evt);};
        console.log('Message sent OK');
    }

    loadMessages() {
        this.createXHR('GET' , `${serverUrl}/messages`, '' , this.loadMessagesComplete , `${this.token}`);
    }

    loadMessagesComplete(evt) {
        const xhr = evt.target;
        if(xhr.status !== 200) {return this.error(evt);}
        console.log(xhr.responseText);
    }

    error(evt) {
        alert('somthing went wrong sorry try again' + evt);
    }
}

const service = new MessagesService();