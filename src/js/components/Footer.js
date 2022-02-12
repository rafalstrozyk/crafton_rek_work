import $ from '../helpers/querySel';

class Footer {
  constructor(data) {
    this.footerLinks = $('#footer-links');
    this.footerMapContainer = $('.footer_map-container');
    this.data = data;
    this.links = data.links;
    this.map = data.map;
  }

  createContainer(childrens) {
    const node = document.createElement('div');
    childrens.forEach((el) => {
      node.appendChild(el);
    });

    return node;
  }
  createAdress() {
    const node = document.createElement('div');
    node.classList = 'footer_map-adress';
    const array = this.map.address.map((el) => {
      return `<span>${el}</span>`;
    });

    node.innerHTML = `${array.join(' ')}`;

    return node;
  }

  createMap() {
    const node = document.createElement('iframe');
    node.src = this.map.mapURL;
    return node;
  }

  createLink(link) {
    const node = document.createElement('div');
    node.innerHTML = `<a href="${link.adres}">${link.title}</a>`;
    return node;
  }

  addContainers() {
    let arr = [];
    this.links.forEach((el, i) => {
      arr.push(this.createLink(el));
      if ((i + 1) % 5 === 0) {
        this.footerLinks.appendChild(this.createContainer(arr));
        arr = [];
      }
    });
  }

  init() {
    this.footerMapContainer.appendChild(this.createAdress());
    this.footerMapContainer.appendChild(this.createMap());
    this.addContainers();
  }
}

export default Footer;
