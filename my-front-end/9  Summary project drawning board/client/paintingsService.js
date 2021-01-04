const serverUrl = 'https://drawning-board-gita.herokuapp.com';        
import {bus} from './index.js';

export default class PaintingService {
    constructor() {
        this.token = null;
        this.socket = new io(serverUrl);
        this.socket.on('yourJoiningPaintingUpdated' , this.yourJoiningPaintingUpdated.bind(this));
    }

    async doFetch(url , method , body = null) {
        const options = {
            method: method,
            headers: {
                'Content-Type':'application/json',
                'token': this.token,
            },
            mode: 'cors',
        }
        body && (options.body = body);
        const response = await fetch(url , options);
        if(response.headers.get('Content-Type').startsWith('application/json')) {
            return await response.json();
        }
    }
    
    async removeMyTokenFromServerIfExistInOneOfThePaintings() {
       await (this.token && (await this.doFetch(`${serverUrl}/removeMyTokenIfExist` , 'POST')));
    }

    async initializationToken() {
        try {
            this.token = (await this.doFetch(`${serverUrl}/token` , 'GET')).token;
            this.socket.emit('subscribe' , this.token);
        } catch (err) {
              console.log("Error: ", err);
        }
    }

    async shareMyPainting(paintingName) {
        await this.removeMyTokenFromServerIfExistInOneOfThePaintings();
        !this.token && await this.initializationToken();
        await this.doFetch(`${serverUrl}/shareMyPainting` , 'POST', JSON.stringify({paintingName}));
    }

    async joinToASharedPainting(paintingName) {
        await this.removeMyTokenFromServerIfExistInOneOfThePaintings();
        !this.token && await this.initializationToken();
        await this.doFetch(`${serverUrl}/joinToASharedPainting` , 'POST', JSON.stringify({paintingName}));
    }

    async loadAllPaintingsNames() {
        try {
            const data = await this.doFetch(`${serverUrl}/sharesPaintingNames` , 'GET');
            return data;
        } catch (err) {
              console.log("Error: ", err);
        }
    }

    updateMySharedPaintingData(paintingName , data) {
        this.socket.emit('updateMySharedPaintingData' , paintingName, JSON.stringify(data) , this.token);
    }
    
    yourJoiningPaintingUpdated(data) {
        bus.emit('fillMyBoardByAnyDataObj' , JSON.parse(data));
    }

    async loadDataOfRequestedPainting(paintingName) {
        const data = await this.doFetch(`${serverUrl}/loadDataOfRequestedPainting` , 'POST' , JSON.stringify({paintingName}));
        return JSON.parse(data.data);
    }
}