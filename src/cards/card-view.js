import {LitElement, html} from '@polymer/lit-element';
import {until} from 'lit-html/lib/until'

import {installRouter} from 'pwa-helpers/router';
import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'
import {navigate} from '../redux/actions/router-actions'
import {cardsLoaded, cardsAdded, cardsSaved} from '../redux/actions/card-actions'

import {UUID} from '../miscellaneous/random'

import '../components/spinner-round'
import '../components/card-button'

import './card-list'

class CardView extends connect(store)(LitElement) {

  static get properties() { return { edit: Boolean, add: Boolean, data: Object}}

  _shouldRender(props, changedProps, prevProps){
  }

  // Redux
  _stateChanged(state) {
    ({edit: this.edit, add: this.add} = state.router)
    this.data = state.data
  }

  // Router
  _firstRendered() {
    installRouter((location) => this._locationChanged(location));
  }

  async _locationChanged(location) {
    if(location.pathname == '/add/'){
      await import('../components/card-modal.js');
      await import('../components/card-input.js'); 
    }
    if(location.pathname == '/remove/'){
      await import('../components/card-modal.js');
    }
    store.dispatch(navigate(location.pathname))
  }

  async RequestCards() {
    if(Object.keys(this.data).length === 0){
      let response = await fetch('/data/card-tiny.json')
      let data = await response.json()
      await store.dispatch(cardsLoaded(data))
    }
    return html `
      <h2 class="title">${this.data.title}</h2>
      ${this.edit ? this.EditButtonsBar : this.DefaultButtonsBar}
      <card-list edit="${this.edit}" cards="${this.data.cards}"></card-list>`
  }

  addCard() {
    store.dispatch(cardsAdded([{
      "id": UUID(),
      "text": this.shadowRoot.querySelectorAll('card-input')[0].text,
      "definition": this.shadowRoot.querySelectorAll('card-input')[1].text
    }]))

    this.shadowRoot.querySelectorAll('card-input')[0].empty()
    this.shadowRoot.querySelectorAll('card-input')[1].empty()
  }

  saveCard(){
    store.dispatch(cardsSaved(this.shadowRoot.querySelector('card-list').cards))
  }

  get EditButtonsBar() {
    return html `
  <card-button href="/" on-click="${e => this.saveCard()}">SAVE</card-button>
  <card-button class="inverted" href="/add/">ADD</card-button>
  <card-button class="inverted" href="/remove/">REMOVE/MOVE</card-button>
  `
  }

  get DefaultButtonsBar() {
    return html `
  <card-button href="/edit/">EDIT</card-button>
  <card-button>STUDY</card-button>
  `
  }

  _render({edit = false, add = false, data = {}}) {
    console.log('ehehe')
    return html`
      <style>
        .title {
          font-size: 5vw
        }
        .inverted {
          --card-button-color: #fff;
          --card-button-background:#333;
        }

        .visible {
          --modal-visibility: visible
        }

        card-modal {
          visibility: hidden
        }
      </style>
      ${until(this.RequestCards(), html`<spinner-round></spinner-round>`)}
      <card-modal class$="${add ? `visible`: ``}" title="ADD CARDS:" href="/edit/">
      <div slot="content">
        <p>Word:</p>
          <card-input placeholder="Word" text=""></card-input>
          <p>Definition:</p>
          <card-input placeholder="Definition" text=""></card-input>
      </div>
      <card-button slot="footer" on-click="${e => this.addCard()}">ADD</card-button>
      </card-modal>`
  }
}

customElements.define('card-view', CardView);
