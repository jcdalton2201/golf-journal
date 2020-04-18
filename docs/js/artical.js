/* eslint-disable prettier/prettier */
import { render, html } from '../lit-html/lit-html.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import { Base } from './base.js';
import { Api } from './api.js';
export class Artical extends Base {
//   static get styles() {
//     // prettier-ignore
//     return [];
//   }
  static get observedAttributes() {
    return ['articalname'];
  }
  constructor() {
    super();
    this.api = new Api();
    this.bindMethods(['renderArctical']);
    this.baseTemplate = (content) => html`${content}`;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (newValue) {
      this.renderArctical( newValue );
    }
  }
  render() {
    render(this.baseTemplate(''), this.root);
  }
  async renderArctical(articalName){
    const articalJson =await this.api.getCall(`stories/${articalName}.json`);
    this.addStyle(articalJson.css, articalName);
    this.setStyleMap(articalName);
    const content = html`${unsafeHTML(articalJson.html)}`;
    render(this.baseTemplate(content), this.root);
  }
}

if (!customElements.get('gj-artical')) {
  customElements.define('gj-artical', Artical);
} else {
  console.warn('gj-artical has already been define.');
}
