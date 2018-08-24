import {LitElement, html} from '@polymer/lit-element';

import {GoogleApiKey, GoogleClientId} from '../../config'

import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'

import {userSignedIn} from '../redux/actions/user-actions'

import '../components/google-sign'
import '../components/card-button'


class HomeView extends LitElement {

  _render() {
    return html`<card-button href="/profile/"><google-sign on-login="${({detail}) => store.dispatch(userSignedIn(detail))}}" signedInText="Go to your profile" signInText="Sign in with Google" apiKey="${GoogleApiKey}" clientId="${GoogleClientId}" scope="profile" discoveryDocs="${["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}"></google-sign></card-button>`
  }
}

customElements.define('home-view', HomeView);
