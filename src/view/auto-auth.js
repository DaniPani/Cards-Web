import {LitElement, html} from '@polymer/lit-element';

import {GoogleApiKey, GoogleClientId} from '../../config'

import store from '../redux/store'

import {userSignedIn} from '../redux/actions/user-actions'

import '../components/google-sign'


class AutoAuth extends LitElement {

  _loadedHandler({detail}){
    if(!detail && location.pathname != '/'){
      return window.location = '/'
    }
  }

  _loginHandler({detail}){
    return store.dispatch(userSignedIn(detail))
  }

  _render() {
    return html`<google-sign on-loaded="${e => this._loadedHandler(e)}" on-login="${e => this._loginHandler(e)}" apiKey="${GoogleApiKey}" clientId="${GoogleClientId}" scope="profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive" discoveryDocs="${["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}"></google-sign>`
  }
}

customElements.define('auto-auth', AutoAuth);
