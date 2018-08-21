import {LitElement, html} from '@polymer/lit-element';

class CardButton extends LitElement {

  static get properties() { return { href: String, target: String}}
  /**
   * @param  {string} href The redirect link
   */
  _render({href, target = ""}) {
    return html`
    <style>
      a {
        font-size: 1.5em;
        display:inline-block;
        padding:0.35em 1.2em;
        border: 0.1em solid #333;
        margin:0 0.3em 0.3em 0;
        border-radius:0.12em;
        text-decoration:none;
        text-align:center;
        transition: all 0.2s;
        color: var(--card-button-color, #333);
        background: var(--card-button-background, #fff);
        cursor: pointer
      }
      a:hover {
        color: var(--card-button-background, #fff);
        background: var(--card-button-color, #333)
      }
    
      @media all and (max-width: 30em){
        a {
          display:block;
          margin:0.4em 0.2em;
          font-size: 1.2em
        }
      }
    </style>
    <a href="${href}" target="${target}"><slot></slot></a>
    `
  }
}

customElements.define('card-button', CardButton);
