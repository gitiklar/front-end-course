"use strict";
class EventBus {
    constructor() {
        this.listeners = {};
        this.number = 1;
    }

    subscribe(eventName, handler) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(handler);
        return ()=> {this.listeners[eventName] = this.listeners[eventName].filter(fn=> fn!==handler)};
    }

    emit(eventName, ...arg) {
        const handlers = this.listeners[eventName] || [];
        for(let fn of handlers) {
            fn(...arg);
        }
    }
}

const bus = new EventBus();