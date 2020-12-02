serverUrl = 'http://localhost:8080';

async function doFetch(method , url , body = null , token = null) {
    const options = {
        method: method,
        headers: {
            'content-type': 'application/json',
             'token' : token,
        },
        mode: 'cors',
    }
    body && (options.body = body);
    const response = await fetch(url , options);
    if(response.headers.get('content-type').startsWith('application/json')) {
        return await response.json();
    }
}

class MessagesService {
    constructor() {
        this.token = null;
        this.printError = (err) => {console.log('Somthing went wrong' + err)};
    }

    async login(username) {
        try {
            this.token = (await doFetch('POST' , `${serverUrl}/login` , JSON.stringify({username}))).token;
        } catch (err) {
            this.printError(err);
        }
    }

    async sendMessage(text , to = null) {
        try {
            await doFetch('POST' , `${serverUrl}/messages` , JSON.stringify({text , to}) , this.token);
        } catch (err) {
            this.printError(err);
        }
    }

    async loadMessages() {
        try {
            return await doFetch('GET' , `${serverUrl}/messages` , '' , this.token);
        } catch (err) {
            this.printError(err);
        }
    }
}