import {LitElement, html} from '@polymer/lit-element';

import './card-button'

class CardModal extends LitElement {

  static get properties() { return { title: String, href: String}}

  _render({title = "", href = ""}) {
    return html`
    <style>
    .modal-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      background-color: #333;
      visibility: var(--modal-visibility, hidden)
    }

    .modal-content {
      visibility: var(--modal-visibility, hidden);
      position: fixed;
      top: 50%;
      left: 50%;
      width: 50%;
      height: auto;
      transform: translate(-50%, -50%);
      padding: 30px;
      background-color: white;
      border-radius: 0.12em;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    }

    @media all and (max-width: 60em){
      .modal-content {
        display:fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: -webkit-fill-available;
        height: 100vh;
        transform: translate(0%, 0%);
        padding: 5%;
        border-radius: 0;
      }
    }

    header {
      position: relative;
      display: block;
      border-bottom: 1px solid #eee;
    }

    h2 {
      margin: 0 0 10px;
      padding: 0;
      font-size: 28px;
    }

    article {
      position: relative;
      display: block;
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 1.75;
    }

    footer {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      margin: 0;
    }
    
    .inverted {
      --card-button-color: #fff;
      --card-button-background:#333;
    }
    </style>
    <label for="modal" class="modal-bg"></label>
    <div class="modal-content">
      <header>
          <h1>${this.title}</h1>
      </header>
      <article class="content">
        <slot name="content"></slot>
      </article>
      <footer>
        <card-button href="${href}" class="inverted" on-click="${e => this.dispatchEvent(new CustomEvent('close'))}">CLOSE</card-button>
        <slot name="footer"></slot>
      </footer>
    </div>
    `
  }
}

customElements.define('card-modal', CardModal);
