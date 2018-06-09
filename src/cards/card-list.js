import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/lib/repeat'

class CardList extends LitElement {

  static get properties() { return { cards: Array, edit: Boolean}}

  async CardListEdit(){
    await import('../components/card-input.js')
    return repeat(this.cards, card => card.id, (card, index) => html`    
    <div class="card">
      <card-input text="${card.text}" on-change="${e => this.cards[index].text = e.detail.text}"></card-input>
      <card-input text="${card.definition}" on-change="${e => this.cards[index].definition = e.detail.text}"></card-input>
    </div>`)
  }

  _render({cards = [], edit = false}) {
    return html `
    <style>
      .card {
        font-family: 'Bitter', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        padding: 2.5vw;
        border: dotted yellow 5px;
        font-size: var(--card-font-size);
        margin-bottom:2.5vw;
        word-break: break-word;
        margin-right: var(--card-margin-right)
      }
  </style>
  ${edit ? this.CardListEdit():  
    repeat(cards, card => card.id, card => html`    
      <div class="card">
        <h1>${card.text}</h1><hr><h1>${card.definition}</h1>
      </div>`)
  }`
  }

}

customElements.define('card-list', CardList);
