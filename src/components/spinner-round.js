import {LitElement, html} from '@polymer/lit-element';

class SpinnerRound extends LitElement {

    render() {
        return html`
            <style>
        .lds-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        height: 64px;
        }
        .lds-ripple div {
        background: purple;
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
        0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
        }
        }
        </style>
        <div class="lds-ripple"><div></div><div></div></div>`
  }
}
  customElements.define('spinner-round', SpinnerRound);
  