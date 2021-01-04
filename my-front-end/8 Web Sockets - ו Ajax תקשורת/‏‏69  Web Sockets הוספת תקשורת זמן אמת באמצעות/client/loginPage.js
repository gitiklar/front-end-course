import {socket} from './index.js';
export default class LoginPage {
    constructor(bus , service) {
        this.bus = bus;
        this.service = service;
        this.setupUi();
    }

    setupUi() {
        document.body.innerHTML = `
            <div id="login-page" class="page">
                <div class="sidenav">
                    <div class="login-main-text">
                        <h2>My Messages</h2>
                        <p>Login from here to access your messages</p>
                    </div>
                </div>
                <div class="main">
                    <div class="col-md-6 col-sm-12">
                        <div class="login-form">
                            <form>
                                <div class="form-group">
                                <label>User Name</label>
                                <input type="text" name="username" class="form-control" placeholder="User Name">
                                </div>
                                <button type="submit" class="btn btn-black">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.start();
    }

    async signIn(name) {
        await this.service.login(name);
        socket.emit('listen' , {user: name});
        this.bus.emit('replacePage');
    }

    submitLogin(evt) {
        evt.preventDefault();
        const name = this.inputName.value;
        name ? this.signIn(name) : alert('The user name can not be empty');
    }

    start() {
        this.form = document.querySelector('#login-page form');
        this.inputName = this.form.querySelector('input');
        this.form.addEventListener('submit', this.submitLogin.bind(this));
    }
}