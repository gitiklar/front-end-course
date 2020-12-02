class LocalStorage {
    constructor(bus) {
        this.bus = bus;
        this.bus.subscribe('saveDataToLocalStorage', this.saveDataToLocalStorage);
        this.bus.subscribe('getDataFromLocalStorage', this.getDataFromLocalStorage);
    }

    saveDataToLocalStorage = (tabeDataHTML) => {
        localStorage.setItem('tabeData' , tabeDataHTML);
    }

    getDataFromLocalStorage = (tableElement)=> {
        tableElement.innerHTML = localStorage.getItem('tabeData');
    }
}