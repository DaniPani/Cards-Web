import {LitElement, html} from '@polymer/lit-element';

import {GoogleApiKey, GoogleClientId} from '../../config'

import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'
import {userSignedIn} from '../redux/actions/user-actions'

import '../components/google-sign'
import '../components/card-button'


class ProfileView extends connect(store)(LitElement) {

  static get properties() { return {user: Object}}

  // Redux
  _stateChanged(state) {
    this.user = state.user
  }

  async _routerUser(){
      return html`<card-button class="google-sign-button"><google-sign on-login="${({detail}) => store.dispatch(userSignedIn(detail)) }" signedInText="Signed in with Google" signInText="Sign in with Google" apiKey="${GoogleApiKey}" clientId="${GoogleClientId}" scope="profile"></google-sign></card-button>`
  }

  _render() {
    return html`
      <style>
        .google-sign-button {
          width: 240px;
          --card-button-background: #dd4b39;
          --card-button-color: white;
        }
      </style>
      ${this._routerUser()}`
  }
}

customElements.define('profile-view', ProfileView);
