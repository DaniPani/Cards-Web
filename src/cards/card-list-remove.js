import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/lib/repeat'

class CardListRemove extends LitElement {

  static get properties() { return { cards: Array }}

  _removeHandler(e, index){
    e.path[1].classList.add('hidden');
    setTimeout(() => {e.path[1].classList.add('removed'); this.dispatchEvent(new CustomEvent('remove', {detail: index}))}, 200)
  }

  _render({cards = []}) {
    return html `
    <style>
      .card {
        padding: 2vw;
        border: solid 2px;
        font-size: var(--card-font-size);
        margin-bottom:2vw;
        word-break: break-word;
        margin-right: var(--card-margin-right);
        position: relative;
        transition: opacity 300ms;
        opacity: 1;
      }
      .remove {
        height: 2em;
        width: 2em;
        line-height: 2;
        font-size: 2em;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        transition: all 300ms;
        color: #333;
        }

        .hidden {
          opacity: 0;
        }
        .removed {
          display: none;
        }
        .remove::before {
          content: "\\0000D7"
        }
        .remove:hover {
          color: red
        }
        .remove:active {
          color: green
        }
  </style>
    ${repeat(cards, card => card.id, (card, index) => html`    
    <div class="card">
      <h1>${card.text}</h1><hr><h1>${card.definition}</h1>
      <a class="remove" onclick="${e => this._removeHandler(e, index)}"></a>
    </div>`)
  }`
  }

}

customElements.define('card-list-remove', CardListRemove);
