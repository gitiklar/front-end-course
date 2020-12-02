class EventBus {
    constructor() {
        this.listeners = {};
    }

    subscribe(eventName, handler) {
        if(!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(handler);
        return ()=> {this.listeners = this.listeners[eventName].filter(fn=>fn!==handler)};
    }

    emit(eventName, ...arg) {
        for(let fn of (this.listeners[eventName] || [])) {
            fn(...arg);
        }
    }
}