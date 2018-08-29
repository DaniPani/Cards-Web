import {LitElement, html} from '@polymer/lit-element';

import {GoogleApiKey, GoogleClientId} from '../../config'

import store from '../redux/store'

import {userSignedIn} from '../redux/actions/user-actions'

import '../components/google-sign'
import { providerChosed } from '../redux/actions/provider-actions';


class AutoAuth extends LitElement {

  _loadedHandler({detail}){
    if(!detail && location.pathname != '/'){
      return window.location = '/'
    }
  }

  _loginHandler({detail}){
    store.dispatch(providerChosed('GOOGLE'))
    return store.dispatch(userSignedIn(detail))
  }

  render() {
    return html`<google-sign @loaded=${e => {this._loadedHandler(e)}} @login=${e => this._loginHandler(e)} apiKey=${GoogleApiKey} clientId=${GoogleClientId} scope="profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive" .discoveryDocs=${["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}></google-sign>`
  }
}

customElements.define('auto-auth', AutoAuth);
