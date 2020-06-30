import User from './User.js';

export default class LoginView extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.root.innerHTML = `
        <style>
            form {
                width: 50%;
            }
            label{
                display: flex;
                justify-content: space-between;
            }
        </style>
        <form>
            <fieldset>
            <legend>Login</legend>
            
            <label for="mood">Username:
                <input required id="username" placeholder="username" />
            </label>
            <label for="password">Password:
                <input id="password" type="password" placeholder="password" />
            </label>
            
            <input type="submit" value="Login"/>
        
            </fieldset>
        </form>
        `;
        this.username = this.root.querySelector('#username');
        this.password = this.root.querySelector('#password');
        

        this.root.querySelector('form').onsubmit = e => this.loginUser(e);
    }

    async loginUser(event){
        event.preventDefault();
        console.log(event);
        const user = this.username.value;
        const pass = this.password.value;
        const status = await User.login(user, pass);
        console.log("login returned ",status);
        if (status === 200){
            //console.log("User authorized yo");
            const auth_nav = document.getElementById("authorization")
            console.log("auth_nav classes before",auth_nav.classList);
            auth_nav.classList.toggle("auth-only");
            console.log("auth_nav classes after",auth_nav.classList);

            const main_nav = document.getElementById("main-navigation")
            console.log("main_nav classes before",main_nav.classList);
            main_nav.classList.toggle("auth-only");
            console.log("main_nav classes after",main_nav.classList);

        }
    }
}

customElements.define('login-view', LoginView);

