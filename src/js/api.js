export class Api {
  constructor() {
    this.myHeader = new Headers();
    this.myHeader.append('Content-Type', 'application/json');
    this.myHeader.append('usereid', '');
  }
  getCall(url) {
    let options = {
      headers: this.myHeader,
    };
    return fetch(url, options)
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
