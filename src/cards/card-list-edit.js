import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/lib/repeat'

import '../components/card-input.js'

class CardListEdit extends LitElement {

  static get properties() { return { cards: Array}}

  _render({cards = []}) {
    return html `
    <style>
      .card {
        padding: 2.5vw;
        border: dotted yellow 5px;
        font-size: var(--card-font-size);
        margin-bottom:2.5vw;
        word-break: break-word;
        margin-right: var(--card-margin-right)
      }
  </style>
    ${repeat(cards, card => card.id, card => html`    
    <div class="card">
      <card-input text="${card.text}" on-change="${e => card.text = e.detail.text}"></card-input>
      <card-input text="${card.definition}" on-change="${e => card.definition = e.detail.text}"></card-input>
    </div>`)
    }`
  }

}

customElements.define('card-list-edit', CardListEdit);
