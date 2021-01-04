import {serverUrl} from './index.js';
export default class ServiceMessages {
    constructor() {
        this.token = null;
    }

    async doFetch(url , method , body=null) {
        const options = {
            method: method,
            headers: {
                'content-type': 'application/json',
                'token': this.token,
            },
            mode:'cors',
        }
        if(body) {
            options.body = body;
        }
        const response = await fetch(url , options);
        if(response.headers.get('content-type').startsWith('application/json')) {
            return await response.json();
        }
    }

    async login(username) {
       const data = await this.doFetch(`${serverUrl}/login` ,'POST', JSON.stringify({username}));
       this.token = data.token;
       console.log(this.token);
    }

    async sendMessage(message , to=null) {
        await this.doFetch(`${serverUrl}/messages` , 'POST' , JSON.stringify({message , to}));
        console.log('message sent OK');
    }

    async loadMessages() {
        const messages = await this.doFetch(`${serverUrl}/messages` , 'GET');
        return messages;
    }
}