export default class CustCrumb extends HTMLElement {
    constructor(){
    super();
}

connectedCallback(){
    document.addEventListener('cust-event',e=>this.onNavigation(e));
    

}
onNavigation({detail}){
    const {hash} = detail;
    this.displayCurrent(hash);
}

displayCurrent(linkName) {
    this.innerText = `>${linkName}`;
}

}

customElements.define('cust-crumb',CustCrumb);