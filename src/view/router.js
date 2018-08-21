import {LitElement, html} from '@polymer/lit-element';

import {installRouter} from 'pwa-helpers/router'

import './profile-view'
import './set-view'
import './home-view'
import './auto-auth'

class CardRouter extends LitElement {

  static get properties() { return { location: String}}

  // Router
  _firstRendered() {
    installRouter(location => this.location = location.pathname)
  }

  _render() {
    switch (this.location) {
      case "/set/":
      return html`<set-view></set-view>`

      case "/profile/":
        return html`<profile-view></profile-view>`

      case "/":
        return html`<home-view></home-view>`

      case "":
        return html`<home-view></home-view>`

      default:
        return html`<auto-auth></auto-auth>`
    }
  }
}

customElements.define('card-router', CardRouter);
