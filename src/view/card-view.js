import {LitElement, html} from '@polymer/lit-element';

import {connect} from 'pwa-helpers/connect-mixin'
import {installRouter} from 'pwa-helpers/router'
import store from '../redux/store'
import {cardsFetch, cardsAdded, cardsSaved, cardsRemoved} from '../redux/actions/card-actions'

import '../components/spinner-round'
import '../components/card-button'

import '../cards/card-list'

import './profile-view'

class CardView extends connect(store)(LitElement) {

  static get properties() { return { location: String, data: Object, user: Object}}

  // Redux
  _stateChanged(state) {
    this.data = state.data
    this.user = state.user
  }

  // Router
  _firstRendered() {
    installRouter(location => this.location = location.pathname)
    //Initialize Cards
    store.dispatch(cardsFetch())
  }

  async _routerView() {
    switch (this.location) {
      case '/remove/':
        if(this.data.isLoading){
          return html`<spinner-round></spinner-round>`
        }
        await import('../cards/card-list-remove.js')
        return html`
        <h2 class="title">${this.data.title || "..."}}</h2>
        <card-button href="/set/" onclick="${() => store.dispatch(cardsSaved(this.data.cards))}">SAVE</card-button>
        <card-button class="inverted" href="/add/">ADD</card-button>
        <card-button class="inverted" href="/edit/">EDIT</card-button>
        ${this.data.cards.length? html`<card-list-remove cards="${this.data.cards}" on-remove="${e => store.dispatch(cardsRemoved(e.detail.index))}"></card-list-remove>` : html`<h3 class="center">- Oops there are no cards -</h3>`}`

      case '/edit/':
      if(this.data.isLoading){
        return html`<spinner-round></spinner-round>`
      }
      await import ('../cards/card-list-edit.js')
      return html`
        <h2 class="title">${this.data.title || "..."}}</h2>
        <card-button href="/set/" onclick="${() => store.dispatch(cardsSaved(this.data.cards))}">SAVE</card-button>
        <card-button class="inverted" href="/add/">ADD</card-button>
        <card-button class="inverted" href="/remove/">REMOVE/MOVE</card-button>
        ${this.data.cards.length? html`<card-list-edit cards="${this.data.cards}"></card-list-edit>` : html`<h3 class="center">- Oops there are no cards -</h3>`}`

      case '/add/':
        if(this.data.isLoading){
          return html`<spinner-round></spinner-round>`
        }
        await import ('../components/card-input.js')
        return html`
          <h2 class="title">${this.data.title || "..."}}</h2>
          <card-button class="inverted" href="/" onclick="${() => store.dispatch(cardsSaved(this.data.cards))}">SAVE</card-button>
          <card-button class="inverted" href="/edit/">EDIT</card-button>
          <card-button href="/remove/">REMOVE/MOVE</card-button>
          <h1>ADD CARDS:</h1>
          <hr>
          <div>
            <p>Word:</p>
              <card-input placeholder="Word"></card-input>
              <p>Definition:</p>
              <card-input placeholder="Definition"></card-input>
          </div>
          <card-button onclick="${e => this.addCard()}">ADD</card-button>
          <h1>ADD MORE:</h1>
          <hr>`

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

  //Handlers

  async addCard() {
    store.dispatch(cardsAdded({
      "id": await import('../miscellaneous/random').then(result => result.UUID()),
      "text": this.shadowRoot.querySelector('card-input:first-of-type').text,
      "definition": this.shadowRoot.querySelector('card-input:last-of-type').text
    }))
    this.shadowRoot.querySelectorAll('card-input').forEach(item => item.text = "")
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
