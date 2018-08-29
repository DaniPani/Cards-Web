import {LitElement, html} from '@polymer/lit-element';

import {GoogleApiKey, GoogleClientId} from '../../config'

import '../components/google-sign'
import '../components/card-button'


class HomeView extends LitElement {

  render() {
    return html`<card-button href="/profile/" target="_self"><google-sign signedInText="Go to your profile" signInText="Sign in with Google" apiKey=${GoogleApiKey} clientId=${GoogleClientId} scope="profile" .discoveryDocs=${["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}></google-sign></card-button>`
  }
}

customElements.define('home-view', HomeView);
