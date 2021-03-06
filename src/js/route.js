export class Route extends EventTarget {
  constructor(params) {
    super(params);
    // this['windowLoad'] = this['windowLoad'].bind(this);
    this['popstateEvent'] = this['popstateEvent'].bind(this);
    this['navigateTo'] = this['navigateTo'].bind(this);
    window.onload = this.windowLoad;
    window.addEventListener('popstate', this.popstateEvent);
  }
  //   windowLoad(event) {
  //     console.log(event);
  //   }
  popstateEvent(event) {
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
    window.history.pushState(detail, detail, `/${detail}`);
    this.dispatchEvent(customEvent);
  }
}
