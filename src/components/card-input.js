import {LitElement, html} from '@polymer/lit-element';

class CardInput extends LitElement {

  static get properties() { return { text: String, placeholder: String }}

  empty(){
    this.text = ""
  }

  _render({text = "Text", placeholder = ""}) {
    return html`
    <style>
        input {
        font-family: 'Bitter', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: bold;
        color: #333;
        font-size:2em;
        display:block;
        border:none;
        width: -webkit-fill-available;
        background: rgba(0, 0, 0, 0.06);
        padding:0.67em;
        margin-bottom: 1em;
        }

        input:focus {
        outline:none;
        }
    </style>   
    <input type="text" aria-label="${text}" placeholder="${placeholder}"  aria-labelledby="${placeholder}" on-change="${e => {this.text = e.target.value; this.dispatchEvent(new CustomEvent('change', {detail: {'text': this.text}}))}}" aria-placeholder="${placeholder}" value="${text}"></input>`
  }
}

customElements.define('card-input', CardInput);
