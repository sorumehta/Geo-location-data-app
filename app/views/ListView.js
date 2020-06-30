import Mood from './Mood.js'

export default class ListView extends HTMLElement {
    constructor(){
        super();
        
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        header{
            background: var(--cust-brown, red); 
        }
        </style>
        <header>
        <h2> Previous Moods</h2>
        </header>
        
        `;
        this.listData();
        
    }

    async listData(){
        const data = await Mood.getAll();
        console.log("Data returned from getAll:");
        console.log(data);
        if (!data){
            this.innerHTML = `
            <h1>
            You do not seem authorized to view this page
            </h1>
            `;
        }
        this.dataList(data);
    }

    dataList(data){
        data.forEach(item => {
            console.log("Adding data to list");
            const root = document.createElement('div');
            const mood = document.createElement('div')
            mood.textContent = `Mood: ${item.mood}`;
            const geo = document.createElement('div');
            geo.textContent = `Reason: ${item.reason}`;
            const date = document.createElement('div');
            const dateString = new Date(item.timestamp).toLocaleString();
            date.textContent = dateString;
            const br = document.createElement("BR");
            root.append(mood,geo,date,br);
            this.appendChild(root);
        });
            
    }
        
}

customElements.define('list-view',ListView);

