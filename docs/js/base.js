const stylesMap = new Map();
export class Base extends HTMLElement {
  constructor() {
    super();
    this.refs = {};
    const { styles } = this.constructor;
    this.addStyle(styles);
    this.attachShadow({ mode: 'open' });
  }
  addStyle(styles, tag = this.tagName) {
    const styleSheets = stylesMap.get(tag);
    if (styles && !styleSheets) {
      stylesMap.set(
        tag,
        styles.map((item) => {
          const styleSheet = new CSSStyleSheet();
          styleSheet.replace(item);
          return styleSheet;
        })
      );
    }
  }
  connectedCallback() {
    if (this.shadowRoot) {
      this.root = this.shadowRoot;
    } else {
      this.root = this;
    }
    this.setStyleMap();
    this.render();
    this.connected();
  }
  setStyleMap(tag = this.tagName) {
    if (stylesMap.get(tag)) {
      this.shadowRoot.adoptedStyleSheets = stylesMap.get(tag);
    }
  }
  bindMethod(methodName) {
    this[methodName] = this[methodName].bind(this);
  }
  bindMethods(methods = []) {
    methods.forEach((method) => this.bindMethod(method));
  }
  buildRefs() {
    if (this.root) {
      this.root.querySelectorAll('[data-ref]').forEach((ref) => {
        this.refs[ref.dataset.ref] = ref;
      });
    }
  }
  /** Default methods so we don't need checks */
  connected() {}
  disconnected() {}
  render() {}
  postRender() {}
}
