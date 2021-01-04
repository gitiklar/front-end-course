class LoginPage {
    constructor(el , bus , service) {
        this.el = el;
        this.bus = bus;
        this.service = service;
        this.setupUi();
    }

    setupUi() {
        this.el.innerHTML = `
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
        `;
        this.form = this.el.querySelector('form');
        this.userNameInput = this.form.querySelector('[name="username"]');
        this.form.addEventListener('submit', this.loginClick.bind(this));
        this.bus.subscribe('giveMeLoginPage' , ()=>{this.el.classList.add('visible');});
    }

    async loginClick(evt) {
        evt.preventDefault();
        const userName = this.userNameInput.value;
        if(userName.length > 0) {
            await this.service.login(userName);
            this.userNameInput.value = '';
            this.el.classList.remove('visible');
            this.bus.emit('giveMeMessagesPage');
        } else {
            alert('User name can not be empty');
        }
    }
}