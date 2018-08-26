import {LitElement, html} from '@polymer/lit-element'
import {connect} from 'pwa-helpers/connect-mixin'

import store from '../redux/store'

import {listFetch} from '../redux/actions/list-action'
import {cardsFetch} from '../redux/actions/card-actions'

import '../components/spinner-round'

class ProfileView extends connect(store)(LitElement) {

  static get properties() { return { list: Array, user: Object}}

  // Redux
  _stateChanged(state) {
    this.user = state.user
    this.list = state.list

  }

  async _template(){
    if(this.user.auth2){
        return html`
          <h1 class="title">Hi ${this.user.auth2.currentUser.get().getBasicProfile().getGivenName()},</h1>
          <h2 class="center">YOUR SETS</h2>
          <hr>
          ${this._listTemplate()}`
      }}

  _listTemplate(){
    if(this.list.isLoading){
      if(this.user.auth2){
        store.dispatch(listFetch('1vcrEWntFMeBdJyRoOArepg-j8G7ZkCln', 'GOOGLE'))
      }
      return html`<spinner-round></spinner-round>`
    } else {
      return this.list.files.map(file => 
        html`<h2><a href="/set/" on-click="${e => store.dispatch(cardsFetch(file.name, file.id, 'GOOGLE'))}">${file.name}</a></h2><hr>`)
    }
  }

  _render() {
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
      <h1 class="title">${this.user.auth2 ? `Hi ${this.user.auth2.currentUser.get().getBasicProfile().getGivenName()},` : `...`}</h1>
      <h2 class="center">YOUR SETS</h2>
      <hr>
      ${this._listTemplate()}`
  }
}

customElements.define('profile-view', ProfileView);
