import {LitElement, html} from '@polymer/lit-element'
import {connect} from 'pwa-helpers'

import store from '../redux/store'

import {listFetchDrive} from '../redux/actions/list-action'
import {cardsFetchDrive, cardsChosed} from '../redux/actions/card-actions'

import '../components/google-sign'
import '../components/card-button'
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
      }
  }

  _listTemplate(){
    if(this.list.isLoading){
      store.dispatch(listFetchDrive())
      return html`<spinner-round></spinner-round>`
    } else {
      return this.list.files.map(file => 
        html`<h2><a href="/set/" on-click="${e => {store.dispatch(cardsChosed()); store.dispatch(cardsFetchDrive(file.name, file.id))}}">${file.name}</a></h2><hr>`)
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
      ${this._template()}`
  }
}

customElements.define('profile-view', ProfileView);
