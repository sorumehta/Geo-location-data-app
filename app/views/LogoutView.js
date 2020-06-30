import User from './User.js';

export default class LogoutView extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.root.innerHTML = `
        <h1>You have been logged out.</h1>
        <h2>Bye, have a great day!</h2>
        <p>(Unless you want to log back in)</p>
        `;
        this.logoutUser();
    }

    logoutUser(){
        User.logout();
    }

}

customElements.define('logout-view', LogoutView);