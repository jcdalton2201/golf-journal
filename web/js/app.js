import { render, html } from '../lit-html/lit-html.js';
import { Base } from './base.js';
const courses = [
  { short: 'pebble', name: 'Pebble Beach', width: '75' },
  { short: 'spy', name: 'SpyGlass Hill', width: '144' },
  { short: 'pacific', name: 'Pacific Dunes', width: '105' },
  { short: 'mac', name: 'Old Macdonald', width: '130' },
  { short: 'dunes', name: 'Bandon Dunes', width: '130' },
  { short: 'trails', name: 'Bandon Trails', width: '130' },
  { short: 'erin', name: 'Erin Hills', width: '80' },
];
export class App extends Base {
  /**
   * Set initial value for boundAttributes
   * to bind attributes and properties together
   */
  static get boundAttributes() {
    return [];
  }

  /** Set default observed attributes to include boundAttributes */
  static get observedAttributes() {
    return [...this.boundAttributes];
  }

  /** Specify boolean attributes */
  static get booleanAttributes() {
    return [];
  }
  static get styles() {
    // prettier-ignore
    return [
      `
    
    .container{
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(300px,700px));
        grid-auto-rows: minmax(400px,auto);
        grid-column-gap: 24px;
        grid-row-gap: 24px;
    }
    .frame {
        border: 5px white solid;
        border-radius: 4px;
        box-shadow: 1px 1px 1px 2px #617762;
    }
    img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
    ${courses.map((item,index) => `
      .${item.short}{
        grid-column: ${index%2 +1}/${index%2 +2};
        grid-row: ${parseInt(index/2) +1}/${parseInt(index/2) +2};

        }`).join('')}
    .pebble {
        font-family: 'Goudy Bookletter 1911', serif;
    }
    .spy {
        font-family: 'Goudy Bookletter 1911', serif;
    }
    .erin.logo img {
        margin-bottom: 59px;
    }
    .title {
        font-size: 3rem;
        text-align: center;
    }
    .logo {
        display:flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    
    @media only screen and (max-width: 600px) {
        .container{
            grid-template-columns: 95vw;
            grid-auto-rows: 200px;
            grid-gap: 16px;
            padding:4px;
        }
        ${courses.map((item,index) => `
      .${item.short}{
        grid-column: 1/2;
        grid-row: ${parseInt(index) +1}/${parseInt(index) +2};

        }`).join('')}
        .logo img {
            display:block;
        }
        .erin.logo img {
            margin-bottom: 8px;
        }
    }
    `,
    ];
  }
  constructor() {
    super();
    // prettier-ignore
    this.coreTemplate = () => html` <div class="container">
      ${courses.map((item) => html`
    <div class='${item.short} img'><img class='frame' src='./images/${item.short}.webp' width='700px'></img></div>
    <div class='${item.short} title'>${item.name}</div>
    <div class='${item.short} logo'><img src='./images/${item.short}_logo.webp' width='${item.width}px' height='75px'></div>
    `)}
    </div>`;
  }
  render() {
    render(this.coreTemplate(), this.root);
  }
}
if (!customElements.get('gj-app')) {
  customElements.define('gj-app', App);
} else {
  console.warn('gj-app has already been define.');
}
