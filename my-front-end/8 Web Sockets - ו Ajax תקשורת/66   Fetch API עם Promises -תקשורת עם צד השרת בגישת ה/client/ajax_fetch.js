const serverUrl = 'http://localhost:8080';

async function doFetch(url , method , body=null , token=null) {
    const resObj = {
        method: method,
        headers: {
            'content-type':'application/json' ,
            'token': token,
        },
        mode:'cors',
    };
    body && (resObj.body =body);

    const response = await fetch(url , resObj);
    if (response.headers.get('content-type').startsWith('application/json')) {
        return await response.json();
    }
}

class MessagesService {
    constructor() {
        this.token = null;
    }

    async login(username) {
        try {
            this.token = (await doFetch(`${serverUrl}/login` , 'POST' , JSON.stringify({username}))).token;
            console.log(this.token);      
        } catch(err) {
            alert(`Somthing went wrong: ${err}`);
        }
    }

    async sendMessage(text, to=null) {
        try {
            await doFetch(`${serverUrl}/messages` , 'POST' , JSON.stringify({text , to}) , this.token);
            console.log(`Message sent OK`);
        } catch(err) {
            alert(`Somthing went wrong: ${err}`);
        }
    }

    async loadMessages() {
        try {
            const response = await doFetch(`${serverUrl}/messages` , 'GET' , '' , this.token);
            console.log(response);
        } catch(err) {
            alert(`Somthing went wrong: ${err}`);
        }
    }
}

const service = new MessagesService();
