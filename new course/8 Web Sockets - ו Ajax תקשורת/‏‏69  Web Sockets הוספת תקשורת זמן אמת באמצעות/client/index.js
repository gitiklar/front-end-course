import App from './application.js';
import Bus from './eventBus.js';
import Service from './serviceMessages.js';
export const serverUrl = 'http://localhost:8080';
export const socket = new io('http://localhost:8080');
const appliction = new App(new Bus() , new Service());