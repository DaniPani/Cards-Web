import {LitElement, html} from '@polymer/lit-element';

import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'

import '../components/spinner-round'
import '../components/card-button'

import '../cards/card-list'

import { cardsReset } from '../redux/actions/card-actions';

class SetView extends connect(store)(LitElement) {

  static get properties() { return {cards: Object}}

  // Redux
  _stateChanged(state) {
    this.cards = state.cards
  }
  
  render() {
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
      ${this.cards.ISLOADING ? html`<spinner-round></spinner-round>` :
      html`
        <h2 class="title">${this.cards.sets[this.cards.idSelected].title}</h2>
        <card-button href="/profile/" @click=${() => store.dispatch(cardsReset())}>BACK</card-button>
        <card-button class="edit" target="_blank" href="${this.cards.sets[this.cards.idSelected].editUrl}">EDIT</card-button>
        <card-button>STUDY</card-button>
        ${this.cards.sets[this.cards.idSelected].words.length? html`<card-list .cards="${this.cards.sets[this.cards.idSelected].words}"></card-list>` : html`<h3 class="center">- Oops there are no cards -</h3>`}`
        }`
  }
}

customElements.define('set-view', SetView);
