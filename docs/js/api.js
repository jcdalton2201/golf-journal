export class Api {
  constructor() {
    this.myHeader = new Headers();
    this.myHeader.append('Content-Type', 'application/json');
    this.myHeader.append('usereid', '');
    this.webContext = window.location.hostname.includes('jcdalton2201')
      ? '/golf-journal'
      : '';
  }
  getCall(url) {
    let options = {
      headers: this.myHeader,
    };
    return fetch(this.webContext + url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
