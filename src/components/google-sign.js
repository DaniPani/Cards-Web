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
      await gapi.auth2.getAuthInstance().isSignedIn.listen(this._signInHandler.bind(this))
      this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    })
  }

  _signInHandler(isSignedIn){
    this.isSignedIn = isSignedIn
  }

  _render({isSignedIn = false, signedInText, signInText}) {
    if(isSignedIn){
      this.dispatchEvent(new CustomEvent('login', {detail: gapi.auth2.getAuthInstance()}))
      return html`<span>${signedInText}</span>`
    } else {
      return html`<span on-click="${e => gapi.auth2.getAuthInstance().signIn()}">${signInText}</span>`
    }
  }
}

customElements.define('google-sign', GoogleSign);
