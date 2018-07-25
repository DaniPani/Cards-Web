import {LitElement, html} from '@polymer/lit-element';

class CardInput extends LitElement {

  static get properties() { return { text: String, placeholder: String }}

  _render({text = "", placeholder = ""}) {
    return html`
    <style>
        input {
        font-family: 'Bitter';
        font-size:2em;
        font-weight: bold;
        color: #333;
        background: rgba(0, 0, 0, 0.06);
        width: -webkit-fill-available;
        padding:0.67em;
        margin-bottom: 1em;
        border:none;
        }

        input:focus {
        outline:none;
        }
    </style>   
    <input type="text" value="${text}" placeholder="${placeholder}" on-change="${e => {this.text = e.target.value; this.dispatchEvent(new CustomEvent('change', {detail: {'text': this.text}}))}}"></input>`
  }
}

customElements.define('card-input', CardInput);
