import $ from '../helpers/querySel';

function Slider() {
  this.def = {
    target: $('.slides'),
    dotsWrapper: $('.dots-wrapper'),
    arrowLeft: $('.arrow-left'),
    arrowRight: $('.arrow-right'),
    transition: {
      speed: 700,
    },
  };
  this.currSlide = 0;
  this.totalSlides = this.def.target.querySelectorAll('.slide').length;
}

Slider.prototype.resetSlides = function () {
  [].slice.call(this.def.target.children).forEach((el, i) => {
    if (i != 0 && i != this.totalSlides - 1) {
      el.style.transform = 'translateX(-100%)';
      el.style.zIndex = '-1';
    } else if (i === 0) {
      el.style.transform = 'translateX(0%)';
      el.style.zIndex = '1';
    } else {
      el.style.transform = 'translateX(100%)';
      el.style.zIndex = '-1';
    }
  });
};

Slider.prototype.changeSlide = function (moveTo, moveType) {
  if (moveTo >= this.totalSlides) {
    moveTo = 0;
  }
  if (moveTo < 0) {
    moveTo = this.totalSlides - 1;
  }

  this.def.dotsWrapper.children[this.currSlide].classList.toggle('active');
  if (moveType) {
    this.def.target.children[this.currSlide].style.transform =
      'translateX(100%)';
    this.def.target.children[this.currSlide].style.zIndex = '-1';
    setTimeout(() => {
      this.def.target.children[
        moveTo + 1 > this.totalSlides - 1 ? 0 : moveTo + 1
      ].style.transform = 'translateX(-100%)';
    }, 600);
  } else {
    this.def.target.children[this.currSlide].style.transform =
      'translateX(-100%)';
    this.def.target.children[this.currSlide].style.zIndex = '-1';
    setTimeout(() => {
      this.def.target.children[
        moveTo - 1 < 0 ? this.totalSlides - 1 : moveTo - 1
      ].style.transform = 'translateX(100%)';
    }, 600);
  }

  this.def.target.children[moveTo].style.zIndex = '1';
  this.def.target.children[moveTo].style.transform = 'translateX(0%)';

  this.def.dotsWrapper.children[moveTo].classList.toggle('active');
  this.currSlide = moveTo;
};

Slider.prototype.btnEveR = function () {
  this.def.arrowRight.addEventListener('click', () => {
    this.changeSlide(this.currSlide + 1, true);
  });
};

Slider.prototype.btnEveL = function () {
  this.def.arrowLeft.addEventListener('click', () => {
    this.changeSlide(this.currSlide - 1, false);
  });
};

Slider.prototype.dotsEve = function () {
  [].slice
    .call(this.def.dotsWrapper.children)
    .forEach((bullet, bulletIndex) => {
      bullet.addEventListener('click', () => {
        if (this.currSlide !== bulletIndex) {
          this.changeSlide(bulletIndex);
        }
      });
    });
};

Slider.prototype.genArrows = function () {
  this.def.arrowLeft.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <title>arrow-thin-left</title>
  <path d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z"></path>
  </svg>`;
  this.def.arrowRight.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <title>arrow-thin-right</title>
  <path d="M16.172 9l-6.071-6.071 1.414-1.414 8.485 8.485-8.485 8.485-1.414-1.414 6.071-6.071h-16.172v-2z"></path>
  </svg>
  `;
};

Slider.prototype.timer = function () {
  setInterval(() => this.changeSlide(this.currSlide + 1, true), 6000);
};

Slider.prototype.init = function () {
  this.genArrows();
  this.resetSlides();
  this.btnEveR();
  this.btnEveL();
  this.dotsEve();
  this.timer();
};

export default Slider;
