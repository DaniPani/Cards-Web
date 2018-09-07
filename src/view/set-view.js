import {LitElement, html} from '@polymer/lit-element';

import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'

import '../components/spinner-round'
import '../components/card-button'

import '../cards/card-list'

class SetView extends connect(store)(LitElement) {

  static get properties() { return {cards: Object}}

  // Redux
  _stateChanged(state) {
    if(!state.cards.FILESELECTED){
      return window.location = '/profile/'
    }
    this.cards = state.cards
  }


  _template() {
    if(this.cards.ISLOADING){
      return html`<spinner-round></spinner-round>`
    }

    return html`
        <h2 class="title">${this.cards.title}</h2>
        <card-button href="/profile/">BACK</card-button>
        <card-button class="edit" target="_blank" href="${this.cards.editUrl}">EDIT</card-button>
        <card-button>STUDY</card-button>
        ${this.cards.words.length? html`<card-list .cards=${this.cards.words}></card-list>` : html`<h3 class="center">- Oops there are no cards -</h3>`}`
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
      ${this._template()}`
  }
}

customElements.define('set-view', SetView);
