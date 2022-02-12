

class Popup {
  constructor(openBtns, title, content) {
    this.def = {
      title: `popup-${title}`,
      content: content,
      openBtns: document.querySelectorAll(openBtns),
      target: null,
      closeBtn: null,
    };

    this.isOpen = false;
  }

  createPopup() {
    const node = document.createElement('div');
    node.classList = 'popup';
    node.setAttribute('id', this.def.title);
    node.innerHTML = ` 
      <div class="popup_content">
           ${this.def.content}
            <button class="btn_close" data-player-close-${this.def.title}></button>
        </div>
      `;
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  setTarget() {
    this.def.target = document.getElementById(this.def.title);
  }
  setCloseButton() {
    this.def.closeBtn = document.querySelector(
      `[data-player-close-${this.def.title}]`
    );
  }

  setDisPopup() {
    this.isOpen && this.def.target
      ? (this.def.target.style.display = 'block')
      : (this.def.target.style.display = 'none');
  }

  handleOpenPopup() {
    this.def.openBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.isOpen = true;
        this.setDisPopup();
      });
    });
  }

  handleClosePopup() {
    this.def.closeBtn
      ? this.def.closeBtn.addEventListener('click', () => {
          this.isOpen = false;
          this.setDisPopup();
        })
      : null;
  }

  init() {
    this.createPopup();
    this.setTarget();
    this.setCloseButton();
    this.handleOpenPopup();
    this.handleClosePopup();
  }
}

export default Popup;
