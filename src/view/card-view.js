import {LitElement, html} from '@polymer/lit-element';

import {connect} from 'pwa-helpers/connect-mixin'
import {installRouter} from 'pwa-helpers/router'
import store from '../redux/store'

import '../components/spinner-round'
import '../components/card-button'

import '../cards/card-list'

import './profile-view'

class CardView extends connect(store)(LitElement) {

  static get properties() { return { location: String, data: Object}}

  // Redux
  _stateChanged(state) {
    this.data = state.data
  }

  // Router
  _firstRendered() {
    installRouter(location => this.location = location.pathname)
  }

  async _routerView() {
    switch (this.location) {
      case "/set/":
        if(this.data.isLoading){
          return html`<spinner-round></spinner-round>`
        }
        return html`
          <h2 class="title">${this.data.title  || "..."}}</h2>
          <card-button href="/edit/">EDIT</card-button>
          <card-button class$="${this.location}">STUDY</card-button>
          ${this.data.cards.length? html`<card-list cards="${this.data.cards}"></card-list>` : html`<h3 class="center">- Oops there are no cards -</h3>`}`

      case "/profile/":
        return html`<profile-view></profile-view>`
    }
  }

  _render() {
    return html`
      <style>
        .title {
          font-size: 5vw
        }
        
        .inverted {
          --card-button-color: #fff;
          --card-button-background:#333;
        }

        .center {
          text-align: center
        }
      </style>
      ${this._routerView()}`
  }
}

customElements.define('card-view', CardView);
