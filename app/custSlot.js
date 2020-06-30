import AddStock from './views/AddView.js'
import ListStocks from './views/ListView.js'
export default class CustSlot extends HTMLElement {
    constructor(){
        super();
        this.oldChild = null;
        //this.root = this.attachShadow({mode:'open'}); //hidden DOM from the regular DOM tree
    }

    connectedCallback(){
        
        this.oldChild = this.querySelector("[name=view]");
        document.addEventListener('cust-event',e=>this.onCustNavigation(e));
    }

    onCustNavigation(evt){
        
        const { detail } = evt;
        const { hash:linkName } = detail;
        
        
        const header_el = this.querySelector("[name=header]");
        header_el.textContent = `${linkName} Mood`;
        const footer_el = this.querySelector("[name=footer]");
        footer_el.textContent = `This site is powered by... you!`;
        this.loadView(linkName);
        
    }
    //lazy import 
    async loadView(linkName) {
        console.log("loading",`./views/${linkName}View.js ...`);
        const {default: View} = await import(`./views/${linkName}View.js`);
        console.log("Loaded!")
        const newChild =  new View();
        console.log("linkName: ",linkName);
        

        if (this.oldChild){

            this.replaceChild(newChild, this.oldChild);
        }
        else{
            this.appendChild(newChild);
        }
        this.oldChild = newChild;
    }
}

customElements.define('cust-slot', CustSlot);