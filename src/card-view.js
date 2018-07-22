import {LitElement, html} from '@polymer/lit-element';

import {installRouter} from 'pwa-helpers/router';
import {connect} from 'pwa-helpers/connect-mixin'
import store from './redux/store'
import {cardsFetch, cardsAdded, cardsSaved} from './redux/actions/card-actions'

import './components/spinner-round'
import './components/card-button'

import './cards/card-list'

class CardView extends connect(store)(LitElement) {

  static get properties() { return { location: String, data: Object}}

  // Redux
  _stateChanged(state) {
    this.data = state.data
  }

  // Router
  _firstRendered() {
    //Initialize Cards
    store.dispatch(cardsFetch())

    installRouter(location => this.location = location.pathname)
  }

  async _routerView() {
    switch (this.location) {
      case '/edit/':
        await import ('./cards/card-list-edit.js')
        return html`
          <h2 class="title">${this.data.title || "..."}</h2>
          <card-button href="/" onclick="${() => store.dispatch(cardsSaved(this.data.cards))}">SAVE</card-button>
          <card-button class="inverted" href="/add/">ADD</card-button>
          <card-button class="inverted" href="/remove/">REMOVE/MOVE</card-button>
          <card-list-edit cards="${this.data.cards}"></card-list-edit>`
      case '/add/':
        await import ('./components/card-input.js')
        return this.ModalTemplateAdd
      default:
        return html`
          <h2 class="title">${this.data.title}</h2>
          <card-button href="/edit/">EDIT</card-button>
          <card-button>STUDY</card-button>
          <card-list cards="${this.data.cards}"></card-list>`
    }
  }

  //Handlers

  async addCard() {
    store.dispatch(cardsAdded({
      "id": await import('./miscellaneous/random').then(result => result.UUID()),
      "text": this.shadowRoot.querySelector('card-input:first-of-type').text,
      "definition": this.shadowRoot.querySelector('card-input:last-of-type').text
    }))
    this.shadowRoot.querySelectorAll('card-input').forEach(item => item.text = "")
  }

  //Templates

  get ModalTemplateAdd(){
    return html`
    <h2 class="title">${this.data.title}</h2>
    <card-button class="inverted" href="/edit/">EDIT</card-button>
    <card-button class="inverted" href="/save/" onclick="${() => store.dispatch(cardsSaved(this.data.cards))}">SAVE</card-button>
    <h1>ADD CARDS:</h1>
    <hr>
    <div>
      <p>Word:</p>
        <card-input placeholder="Word"></card-input>
        <p>Definition:</p>
        <card-input placeholder="Definition"></card-input>
    </div>
    <card-button on-click="${e => this.addCard()}">ADD</card-button>
    <h1>ADD MORE:</h1>
    <hr>
    `
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
      </style>
      ${this.data.isLoading ? html`<spinner-round></spinner-round>` : this._routerView()}`
  }
}

customElements.define('card-view', CardView);
