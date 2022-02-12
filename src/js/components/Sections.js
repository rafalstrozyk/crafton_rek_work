import Popup from './Popup';

class Sections {
  constructor(sections) {
    this.main = document.getElementById('main');
    this.sections = sections;
    this.isPopup = false;
    this.popup = null;
  }

  createTitle(title) {
    const node = document.createElement('h2');
    node.innerHTML = title;
    return node;
  }

  createParagraphs(paragraphs) {
    const node = document.createElement('div');
    node.classList = 'section_paragraphs';
    const arr = [];
    paragraphs.forEach((el) => {
      arr.push(`<p>${el}</p>`);
    });

    node.innerHTML = arr.join('');
    return node;
  }

  createImg(img) {
    const node = document.createElement('img');
    node.src = img.src;
    node.alt = img.alt;
    return node;
  }

  createList(list) {
    const node = document.createElement('div');
    node.classList = 'section_list';
    const title = document.createElement('div');
    title.innerHTML = list.title;
    node.appendChild(title);
    const arr = [];
    list.elements.forEach((el) => {
      arr.push(`<li>${el}</li>`);
    });

    const nodeList = document.createElement('ul');
    nodeList.innerHTML = `${arr.join('')}`;

    node.appendChild(nodeList);

    return node;
  }

  createPlayerPopup(img, playerPopup) {
    const node = document.createElement('div');
    node.classList = 'section_player-img';
    node.appendChild(img);
    const btn = document.createElement('button');
    btn.classList = playerPopup.class;
    btn.dataset.playerOpen;
    node.appendChild(btn);

    return node;
  }

  createSection(section) {
    const node = document.createElement('section');
    node.classList = 'section';
    const content = document.createElement('div');
    content.classList = 'section_content';
    content.appendChild(this.createTitle(section.title));
    content.appendChild(this.createParagraphs(section.paragraphs));
    if (section.list) {
      content.appendChild(this.createList(section.list));
    }

    if (section.popup) {
      this.isPopup = true;
      this.popup = {
        id: section.popup.id,
        content: section.popup.content,
        title: section.popup.title,
      };
    } else {
      this.isPopup = false;
      this.popup = null;
    }

    if (section.reverse) {
      if (section.popup) {
        node.appendChild(
          this.createPlayerPopup(this.createImg(section.img), section.popup)
        );
      } else {
        node.appendChild(this.createImg(section.img));
      }
      node.appendChild(content);
    } else {
      node.appendChild(content);
      if (section.popup) {
        node.appendChild(
          this.createPlayerPopup(this.createImg(section.img), section.popup)
        );
      } else {
        node.appendChild(this.createImg(section.img));
      }
    }
    return node;
  }

  init() {
    this.sections.reverse().forEach((section) => {
      this.main.insertBefore(
        this.createSection(section),
        this.main.childNodes[0]
      );

      if (this.isPopup && this.popup) {
        const popup = new Popup(
          this.popup.id,
          this.popup.title,
          this.popup.content
        );
        popup.init();
      }
    });
  }
}

export default Sections;
