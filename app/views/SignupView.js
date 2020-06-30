import User from './User.js';

export default class SignupView extends HTMLElement {
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
            <legend>Sign Up</legend>
            
            <label for="mood">Username:
                <input required id="username" placeholder="username" />
            </label>
            <label for="password">Password:
                <input id="password" type="password" placeholder="password" />
            </label>
            <label for="password2">Re-type Password:
                <input id="password2" type="password" placeholder="password" />
            </label>
            <input type="submit" value="Register"/>
        
            </fieldset>
        </form>
        `;
        this.username = this.root.querySelector('#username');
        this.password = this.root.querySelector('#password');
        this.password2 = this.root.querySelector('#password2');

        this.root.querySelector('form').onsubmit = e => this.addUser(e);
    }

    async addUser(event){
        event.preventDefault();
        console.log(event);
        const user = this.username.value;
        const pass = this.password.value;
        const pass2 = this.password2.value;

        if (pass === pass2) {
            const status = await User.signup(user, pass);
            
        } else {
            alert("Passwords do not match");
        }

        
    }
}

customElements.define('signup-view', SignupView);