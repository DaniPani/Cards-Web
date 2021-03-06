import {LitElement, html} from '@polymer/lit-element';


class GoogleSign extends LitElement {

  static get properties() { return { apiKey: String, clientId: String, scope: String, discoveryDocs: Array, isSignedIn: Boolean, signInText: String, signedInText: String}}

  constructor(){
    super()
    gapi.load('client:auth2', async() => {
      await gapi.client.init({
        apiKey: this.apiKey,
        clientId: this.clientId,
        scope: this.scope,
        discoveryDocs: this.discoveryDocs
      })
      this.dispatchEvent(new CustomEvent('loaded', {detail: gapi.auth2.getAuthInstance().isSignedIn.get()}))
      await gapi.auth2.getAuthInstance().isSignedIn.listen(this._signInHandler.bind(this))
      this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    })
  }

  _signInHandler(isSignedIn){
    this.isSignedIn = isSignedIn
  }

  render() {
    if(this.isSignedIn){
      this.dispatchEvent(new CustomEvent('login', {detail: gapi.auth2.getAuthInstance()}))
      return html`<span>${this.signedInText}</span>`
    } else {
      return html`<span @click="${e => gapi.auth2.getAuthInstance().signIn()}">${this.signInText}</span>`
    }
  }

}

customElements.define('google-sign', GoogleSign);
