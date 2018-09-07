import {LitElement, html} from '@polymer/lit-element';

import {installRouter} from 'pwa-helpers/router'

class CardRouter extends LitElement {

  static get properties() { return { location: String}}

  constructor(){
    super()
    installRouter(location => this.location = location.pathname)
  }

  render() {
    switch (this.location) {
      case "/set/":
        import('./set-view')
        return html`<set-view></set-view>`

      case "/profile/":
        import('./profile-view')
        return html`<profile-view></profile-view>`

      case "/":
        import('./home-view')
        return html`<home-view></home-view>`
    }
  }
}

customElements.define('card-router', CardRouter);
