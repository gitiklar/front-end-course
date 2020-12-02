const serverUrl = 'http://localhost:8080';

export default class PaintingService {
    constructor(bus) {
        this.token = null;
        this.bus = bus;
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
        this.token = (await this.doFetch(`${serverUrl}/token` , 'GET')).token;
        this.socket.emit('subscribe' , this.token);
        console.log(this.token);
    }

    async shareMyPainting(paintingName) {
        await this.removeMyTokenFromServerIfExistInOneOfThePaintings();
        !this.token && await this.initializationToken();
        await this.doFetch(`${serverUrl}/shareMyPainting` , 'POST', JSON.stringify({paintingName}));
        this.bus.emit('updateMyCurrentPaintingDataForAnyChanges' , true);
    }

    async joinToASharedPainting(paintingName) {
        await this.removeMyTokenFromServerIfExistInOneOfThePaintings();
        !this.token && await this.initializationToken();
        await this.doFetch(`${serverUrl}/joinToASharedPainting` , 'POST', JSON.stringify({paintingName}));
        this.bus.emit('updateMyCurrentPaintingDataForAnyChanges' , false);
    }

    async loadAllPaintingsNames() {
        const data = await this.doFetch(`${serverUrl}/sharesPaintingNames` , 'GET');
        return data;
    }

    updateMySharedPaintingData(paintingName , data) {
        this.socket.emit('updateMySharedPaintingData' , paintingName, JSON.stringify(data) , this.token);
    }

    yourJoiningPaintingUpdated(data) {
        this.bus.emit('fillMyBoard' , JSON.parse(data));
    }

    async loadDataOfRequestedPainting(paintingName) {
        const data = await this.doFetch(`${serverUrl}/loadDataOfRequestedPainting` , 'POST' , JSON.stringify({paintingName}));
        return JSON.parse(data.data);
    }
    //to remove 2 from 3
    async logObjectFromServer() {
        const data = await this.doFetch(`${serverUrl}/print` , 'GET');
        console.log(data);
    }
}