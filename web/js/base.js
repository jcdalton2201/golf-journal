const stylesMap = new Map();
export class Base extends HTMLElement {
  constructor() {
    super();
    const styleSheets = stylesMap.get(this.tagName);
    const { styles } = this.constructor;
    if (styles && !styleSheets) {
      stylesMap.set(
        this.tagName,
        styles.map((item) => {
          const styleSheet = new CSSStyleSheet();
          styleSheet.replace(item);
          return styleSheet;
        })
      );
    }
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    if (this.shadowRoot) {
      this.root = this.shadowRoot;
    } else {
      this.root = this;
    }
    this.shadowRoot.adoptedStyleSheets = stylesMap.get(this.tagName);
    this.render();
    this.connected();
  }
  /** Default methods so we don't need checks */
  connected() {}
  disconnected() {}
  render() {}
  postRender() {}
}
