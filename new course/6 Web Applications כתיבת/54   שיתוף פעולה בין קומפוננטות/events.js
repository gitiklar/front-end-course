class EventBus {
    constructor() {
        this.listeners = {};
    }

    subscribe(eventName , fn) {
        if(!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(fn);
        return ()=>{
            this.listeners[eventName] = this.listeners[eventName].filter(f=>f!==fn);
        }
    }

    activate(eventName, ...info) {
        const functions = this.listeners[eventName];
        for(let fn of functions) {
            fn(...info);
        }
    }
}

const bus = new EventBus();
