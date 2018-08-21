import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/lib/repeat'

class CardList extends LitElement {

  static get properties() { return { cards: Array }}

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
      <h1>${card[0]}</h1><hr><h1>${card[1]}</h1>
    </div>`)
  }`
  }

}

customElements.define('card-list', CardList);
