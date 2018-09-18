import {LitElement, html} from '@polymer/lit-element'
import {connect} from 'pwa-helpers/connect-mixin'

import store from '../redux/store'

import {cardsFetch, cardsChosed} from '../redux/actions/card-actions'
import {signIn} from '../redux/actions/user-actions'

import '../components/spinner-round'

let requestSets = []

class ProfileView extends connect(store)(LitElement) {

  static get properties() { return { list: Array, user: Object}}

  // Redux
  _stateChanged(state) {
    this.user = state.user
    this.list = state.list
    this.cards = state.cards
  }

  async _template(){
    if(this.user.ISLOGGEDIN){
        return html`
          <h1 class="title">Hi ${this.user.name},</h1>
          <h2 class="center">YOUR SETS</h2>
          <hr>
          ${this._listTemplate()}`
      } else {
        return html`<button @click=${e => store.dispatch(signIn())}>Login with Google</button>`
      }}

  _listTemplate(){
    if(this.list.ISLOADING){
      return html`<spinner-round></spinner-round>`
    } else {
      return this.list.files.map(file => {
        if(!requestSets.includes(file.id)){store.dispatch(cardsFetch(file.name, file.id, this.user.provider)); requestSets.push(file.id)}
        return html`<h2><a href="/set/" @click=${e => store.dispatch(cardsChosed(file.id))}>${file.name}</a></h2><hr>`})
      }
    }

  render() {
    return html`
      <style>
        .title {
          font-size: 5vw
        }
      
        .center {
          text-align: center
        }

        a {
        display:inline-block;
        text-decoration:none;
        color: #333;
        cursor: pointer
        }
        a:hover {
          color: #333
        }
      </style>
      ${this._template()}`
  }
}

customElements.define('profile-view', ProfileView);
