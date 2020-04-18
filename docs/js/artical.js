/* eslint-disable prettier/prettier */
import { render, html } from '../lit-html/lit-html.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import { Base } from './base.js';
import { Api } from './api.js';
export class Artical extends Base {

  static get observedAttributes() {
    return ['articalname'];
  }
  constructor() {
    super();
    this.api = new Api();
    this.bindMethods(['renderArctical','_onPage']);
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
    this.buildRefs();
    this.buildAnimation(articalJson.translateObj);
  }
  buildAnimation(objs){
    objs.forEach(item => {
      this.ob = new IntersectionObserver(this._onPage);
      this.ob.observe(this.refs[item]);
    });

  }
  _onPage(entries) {
    for (const entry of entries) {
      entry.target.classList.toggle('show',entry.isIntersecting);
      entry.target.visible = entry.isIntersecting;
    }
  }
}

if (!customElements.get('gj-artical')) {
  customElements.define('gj-artical', Artical);
} else {
  console.warn('gj-artical has already been define.');
}
