import { render, html } from '../lit-html/lit-html.js';
import { Base } from './base.js';
import { Route } from './route.js';
import './artical.js';
const courses = [
  { short: 'pebble', name: 'Pebble Beach', width: '75' },
  { short: 'spy', name: 'SpyGlass Hill', width: '144' },
  { short: 'pacific', name: 'Pacific Dunes', width: '105' },
  { short: 'mac', name: 'Old Macdonald', width: '130' },
  { short: 'dunes', name: 'Bandon Dunes', width: '130' },
  { short: 'trails', name: 'Bandon Trails', width: '130' },
  { short: 'erin', name: 'Erin Hills', width: '80' },
  { short: 'backwolf', name: 'Blackwolf Run River', width: '47' },
  { short: 'wistling', name: 'Whistling Straits', width: '80' },
  { short: 'pinehurst2', name: 'Pinehurst #2', width: '64' },
  { short: 'kiawah', name: 'Kiawah Island Ocean', width: '80' },
  { short: 'sawgrass', name: 'TPC Sawgrass', width: '50' },
  { short: 'clinks', name: 'Cabot Links', width: '80' },
  { short: 'cclifts', name: 'Cabot Cliffs', width: '80' },
  { short: 'grindelwald', name: 'Golf Grindelwald', width: '80' },
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
    .sink {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top:125px;
    }
    .sink > div {

    }
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
    .headerImageWrapper {
      background: #3c3ff43;
      overflow: hidden;
      margin: -18px 0 0 0;
    }
    .headerImageWrapper .innerLayoutWrapper {
      width:100%;
      margin:auto;
    }
    .headerImageWrapper .innerLayoutWrapper img{
      width: 100%;
      height: auto;
      border:0;
      display:block;
    }
    .innerImageWrapper {
      display:grid;
    }
    .header-hero {
      grid-column: 1/2;
      grid-row: 1/2;
      font-size: 2rem;
    }
    .hero-text::first-letter {
      color: #903;
      float: left;
      font-family: Georgia;
      font-size: 75px;
      line-height: 60px;
      padding-top: 4px;
      padding-right: 8px;
      padding-left: 3px;
    }
    .hero-text {
      padding:16px;
      height:100%;
      width: 55vw;
      justify-self: center;
      font-family: 'Gotu';
    }
    
    
    @media only screen and (max-width: 600px) {
        .container{
            grid-template-columns: 350px;
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
        .header-hero {
          font-size: 1rem;
        }
        .hero-text {
          width: 80vw;
          font-family: 'Gotu';
        }
        
    }
    `,
    ];
  }
  constructor() {
    super();
    this.bindMethods(['linkNavigation', 'loadPage']);
    this.route = new Route();
    this.route.addEventListener('loadPage', this.loadPage);
    // prettier-ignore
    this.coreTemplate = () => html` 
    <div class='sink' data-ref='sink'>
      
    </div>`;
    this.articalTemplate = (name) =>
      html`<gj-artical articalname="${name}"></gj-artical>`;
    // prettier-ignore
    this.homeTemplate = () => html`<div data-ref='headerImageWrapper' class='headerImageWrapper'>
    <div data-ref='innerImageWrapper' class='innerImageWrapper'>
      <img class='header-hero' src='./images/main_splash.webp' alt='header'>
      <div class='header-hero hero-text'>
      In 2015, I read the article in Golf magazine on the 100 best public golf courses in the United States. After reading this list, I decided that I want to start playing some of these courses. So I began a quest with my family to play as many of the top ten courses as we could. This web site is some pictures and thoughts around the courses we have played. I hope you enjoy it and hit them straight.
      </div>
    </div>
  </div>
  
  <div class="container" data-ref='container'>
    ${courses.map((item) => html`
  <div class='${item.short} img' data='${item.short}' @click=${this.linkNavigation}>
    
    <picture>
      <source media="(max-width: 400px)" srcset="images/${item.short}-350.webp" type="image/webp">
      <source media="(max-width: 401px)"  srcset="images/${item.short}-350.jpg" type="image/jpeg">
      <source media="(max-width: 400px)" srcset="images/${item.short}-700.webp" type="image/webp">
      <source media="(max-width: 401px)" srcset="images/${item.short}-700.jpg" type="image/jpeg">  
      <img src="/images/${item.short}-700.webp" alt="${item.short}" class='frame' >
    </picture>
  </div>
  <div class='${item.short} title'>${item.name}</div>
  <div class='${item.short} logo' ><img src='./images/${item.short}_logo.webp' width='${item.width}px' height='75px'></div>
  `)}
  </div>`
  }
  render() {
    render(this.coreTemplate(), this.root);
    this.buildRefs();
    render(this.homeTemplate(), this.refs['sink']);
  }
  linkNavigation(evt) {
    this.route.navigateTo(evt.currentTarget.getAttribute('data'));
  }
  loadPage(event) {
    const { sink } = this.refs;
    if (event.detail) {
      render(this.articalTemplate(event.detail), sink);
    } else {
      render(this.homeTemplate(), sink);
    }
  }
}
if (!customElements.get('gj-app')) {
  customElements.define('gj-app', App);
} else {
  console.warn('gj-app has already been define.');
}
