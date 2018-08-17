import {LitElement, html} from '@polymer/lit-element'
import {repeat} from 'lit-html/lib/repeat'

import {GoogleApiKey, GoogleClientId} from '../../config'

import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'
import {userSignedIn} from '../redux/actions/user-actions'
import {driveListFetch} from '../redux/actions/drive-action'

import '../components/google-sign'
import '../components/card-button'
import '../components/spinner-round'

class ProfileView extends connect(store)(LitElement) {

  // Redux
  _stateChanged(state) {
    this.user = state.user
    this.drive = state.drive

  }

  async _routerUser(){
      if(!this.user.auth2){
          return html`<card-button class="google-sign-button"><google-sign on-login="${({detail}) => {store.dispatch(userSignedIn(detail)); store.dispatch(driveListFetch())}}" signedInText="Signed in with Google" signInText="Sign in with Google" apiKey="${GoogleApiKey}" clientId="${GoogleClientId}" scope="profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive" discoveryDocs="${["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}"></google-sign></card-button>`
      }
      else {
        return html`
          <h1 class="title">Hi ${this.user.auth2.currentUser.get().getBasicProfile().getGivenName()},</h1>
          <h2 class="center">YOUR SETS</h2>
          <hr>
          ${this.drive.isLoading? html`<spinner-round></spinner-round>` :
          html`${
            repeat(this.drive, file => file.id, file => html`<h2>${file.name}</h2><hr>`)
          }`
          }`
      }
  }

  _render() {
    return html`
      <style>
        .google-sign-button {
          width: 240px;
          --card-button-background: #dd4b39;
          --card-button-color: white;
        }

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
      ${this._routerUser()}`
  }
}

customElements.define('profile-view', ProfileView);
