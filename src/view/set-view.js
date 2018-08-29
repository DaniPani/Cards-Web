import {LitElement, html} from '@polymer/lit-element';

import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux/store'

import '../components/spinner-round'
import '../components/card-button'

import '../cards/card-list'

class SetView extends connect(store)(LitElement) {

  static get properties() { return {data: Object, provider: String}}

  // Redux
  _stateChanged(state) {
    this.data = state.data
    this.provider = state.provider
  }


  _template() {
    if(!this.data.fileSelected){
      window.location = '/profile/'
      return
    }

    if(this.data.isLoading){
      return html`<spinner-round></spinner-round>`
    }

    return html`
        <h2 class="title">${this.data.title  || "..."}}</h2>
        <card-button href="/profile/">BACK</card-button>
        <card-button class="edit" target="_blank">EDIT</card-button>
        <card-button>STUDY</card-button>
        ${this.data.cards.length? html`<card-list cards="${this.data.cards}"></card-list>` : html`<h3 class="center">- Oops there are no cards -</h3>`}`
  }

  async _didRender(){
    if(this.data.spreadsheetId && !this.isLoading){
      let response = await gapi.client.sheets.spreadsheets.get({spreadsheetId:this.data.spreadsheetId})
      if(response.status == 200){
        this.shadowRoot.querySelector('.edit').href = response.result.spreadsheetUrl
      }
    }
  }

  render() {
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
      ${this._template()}`
  }
}

customElements.define('set-view', SetView);
