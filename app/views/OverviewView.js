export default class OverviewView extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = `
            <output>
                <h2>You can record how you are feeling today.
                Here are some possibilies:
                </h2>
                <ul>
                    <li>Happy</li>
                    <li>Sad</li>
                    <li>Anxious</li>
                    <li>Confused</li>
                </ul>
            </output>
        `;
    }
}

customElements.define('overview-view',OverviewView);