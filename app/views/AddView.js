import Mood from './Mood.js';

export default class Addview extends HTMLElement {
    constructor(){
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        
        this.root.innerHTML=`
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
            <legend>add mood</legend>
            <label for="mood">mood:
            <input id="mood" required type="text" placeholder="mood"/>
            </label>
            <label for="reason">reason:
            <input id="reason" placeholder="reason" value="why not" />
            </label>
            <input type="submit" value="add"/>
            </fieldset>
        </form>
        `;

        this.moodInput = this.root.querySelector('#mood');
        this.reasonInput = this.root.querySelector('#reason');
        this.root.querySelector('form').onsubmit = e => this.addMood(e);
    }

    async addMood(event){
        event.preventDefault();
        console.log(event);
        const moodValue = this.moodInput.value;
        const reasonValue = this.reasonInput.value;
        const status = await Mood.add(moodValue, reasonValue);
        if (status===201){
            console.log("Mood added!");
        }
        else {
            this.root.innerHTML=`<h1>You do not seem to have permissions to add mood</h1>`;
        }
    }


}

customElements.define('add-view',Addview);