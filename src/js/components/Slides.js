import $ from '../helpers/querySel';

class Slides {
  constructor(slides) {
    this.slides = slides;
    this.totalSlides = slides.length;
    this.doc = $('.slides');
    this.dotsWrapper = $('.dots-wrapper');
  }

  createSlide(slide, index) {
    const node = document.createElement('div');
    const style = document.createElement('style');
    style.innerHTML = `.slide${index} {
        background-image: linear-gradient(
            var(--backgroud-darkening),
            var(--backgroud-darkening)
          ),
          url('${slide.img}');
      }`;
    document.getElementsByTagName('head')[0].appendChild(style);
    node.classList = `slide slide${index}`;
    node.innerHTML = `
      <div class="slide_content">
          <h1>${slide.content.title.first}<span>${
      slide.content.title.second
    }</span></h1>
          <div class="slide_btn-group">
              ${slide.content.buttons
                .map(
                  (btn) =>
                    `<button class="btn_rounded btn_${btn.type}">${btn.content}</button>`
                )
                .join('')}
          </div>
      </div>
`;
    return node;
  }

  createDot() {
    return document.createElement('li');
  }
  createSlides() {
    this.slides.forEach((slide, i) => {
      this.doc.appendChild(this.createSlide(slide, i));
      let dot = this.createDot();
      i === 0 ? (dot.classList = 'active') : null;
      this.dotsWrapper.appendChild(dot);
    });
  }
}

export default Slides;
