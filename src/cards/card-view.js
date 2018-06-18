import {LitElement, html} from '@polymer/lit-element';
import {until} from 'lit-html/lib/until'

import {installRouter} from 'pwa-helpers/router';
import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'
import {navigate} from '../redux/actions/router-actions'
import {cardsFetch, cardsAdded, cardsSaved} from '../redux/actions/card-actions'

import {UUID} from '../miscellaneous/random'

import '../components/spinner-round'
import '../components/card-button'

import './card-list'

class CardView extends connect(store)(LitElement) {

  static get properties() { return { edit: Boolean, add: Boolean, data: Object}}

  // Redux
  _stateChanged(state) {
    ({edit: this.edit, add: this.add} = state.router)
    this.data = state.data
  }

  // Router
  _firstRendered() {
    //Initialize Cards
    store.dispatch(cardsFetch())

    installRouter(location => {
      store.dispatch(navigate(location.pathname))
      this._locationChanged(location)
    })
  }

  async _locationChanged(location) {
    switch(location.pathname){
      case '/':
        if(!Object.is(this.shadowRoot.querySelector('card-list').cards, this.data.cards)){
          store.dispatch(cardsSaved(this.shadowRoot.querySelector('card-list').cards))
        }

      case '/add/':
        await import('../components/card-modal.js')
        await import('../components/card-input.js')

      case '/remove/':
        await import('../components/card-modal.js');
    }
  }

  //Handlers

  addCard() {
    store.dispatch(cardsAdded({
      "id": UUID(),
      "text": this.shadowRoot.querySelectorAll('card-input')[0].text,
      "definition": this.shadowRoot.querySelectorAll('card-input')[1].text
    }))
    this.shadowRoot.querySelectorAll('card-input').forEach(item => item.empty())
  }

  //Templates

get RequestCards() {
    return html `
      <h2 class="title">${this.data.title}</h2>
      ${this.edit ? this.EditButtonsBar : this.DefaultButtonsBar}
      <card-list edit="${this.edit}" cards="${this.data.cards}"></card-list>`
  }

  get EditButtonsBar() {
    return html `
  <card-button href="/">SAVE</card-button>
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

  _render({edit, add, data}) {
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
          --modal-display: block
        }

        card-modal {
          display: var(--modal-display, none)
        }
      </style>
      ${this.data.isLoading ? html`<spinner-round></spinner-round>` : this.RequestCards}
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
