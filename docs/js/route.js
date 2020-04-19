export class Route extends EventTarget {
  constructor(params) {
    super(params);
    this['windowLoad'] = this['windowLoad'].bind(this);
    this['popstateEvent'] = this['popstateEvent'].bind(this);
    this['navigateTo'] = this['navigateTo'].bind(this);
    window.onload = this.windowLoad;
    window.addEventListener('popstate', this.popstateEvent);
    this.webContext = window.location.hostname.includes('jcdalton2201')
      ? 'golf-journal'
      : '';
  }
  windowLoad() {
    console.log(window.location);
    if (window.location.pathname.length > 1) {
      this.navigateTo(
        window.location.pathname.replace(`/${this.webContext}`, '')
      );
    }
  }
  popstateEvent(event) {
    console.log(event);
    const detail = event.state;
    const customEvent = new CustomEvent('loadPage', {
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  }

  navigateTo(detail) {
    const customEvent = new CustomEvent('loadPage', {
      detail,
      bubbles: true,
      composed: true,
    });
    console.log(detail);
    document.title = detail;
    window.history.pushState(detail, detail, `/${this.webContext}/${detail}`);
    this.dispatchEvent(customEvent);
  }
}
