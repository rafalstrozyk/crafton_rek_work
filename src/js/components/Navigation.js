import $ from '../helpers/querySel';
import reportWindowSize from '../helpers/windowSize';
class Navigation {
  constructor(data) {
    this.burger = $('.navigation_burger');
    this.checkbox = $('#burger-check');
    this.navigation = $('#nav');
    this.navsList = data;
  }

  createNavLink(el) {
    const node = document.createElement('li');
    node.innerHTML = `<li><a href="${el.link}">${el.title}</a></li>`;
    return node;
  }

  addNavLinksToNavigation() {
    this.navsList.forEach((el) => {
      this.navigation.appendChild(this.createNavLink(el));
    });
  }

  burgerStateOnResize() {
    if (reportWindowSize().x < 1000) {
      this.burger.style.display = 'flex';
      this.navigation.classList.remove('navigation_nav');

      this.navigation.classList.add('navigation_nav-burger');
      if (this.checkbox.checked) {
        $('.navigation_nav-burger').style.opacity = '1';
      } else {
        $('.navigation_nav-burger').style.opacity = '0';
        this.navigation.style.transform = 'translateX(100%)';
      }
    } else {
      this.burger.style.display = 'none';
      this.navigation.classList.add('navigation_nav');
      this.navigation.classList.remove('navigation_nav-burger');
      this.navigation.style.transform = 'translateX(0%)';
      $('.navigation_nav').style.opacity = '1';
    }
  }

  burgerOnWindowSize() {
    window.addEventListener('resize', () => {
      this.burgerStateOnResize();
    });
  }

  showBurger() {
    window.addEventListener('scroll', () => {
      const elementTarget = document.getElementsByTagName('header')[0];

      if (reportWindowSize().x > 1000) {
        if (
          window.scrollY >
          elementTarget.offsetTop + elementTarget.offsetHeight - 100
        ) {
          this.burger.style.display = 'flex';
          this.navigation.classList.remove('navigation_nav');
          this.navigation.classList.add('navigation_nav-burger');
          if (this.checkbox.checked) {
            $('.navigation_nav-burger').style.opacity = '1';
          } else {
            $('.navigation_nav-burger').style.opacity = '0';
            this.navigation.style.transform = 'translateX(100%)';
          }
        } else {
          this.burger.style.display = 'none';
          this.navigation.classList.add('navigation_nav');
          this.navigation.classList.remove('navigation_nav-burger');
          this.navigation.style.transform = 'translateX(0%)';
          $('.navigation_nav').style.opacity = '1';
        }
      }
    });
  }

  onClickBurger() {
    this.checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        $('.navigation_nav-burger').style.opacity = '1';
        this.navigation.style.transform = 'translateX(0%)';
      } else {
        this.navigation.style.transform = 'translateX(100%)';
      }
    });
  }

  onScrollToContent() {
    this.burgerOnWindowSize();
  }

  init() {
    this.addNavLinksToNavigation();
    this.burgerStateOnResize();
    this.showBurger();
    this.onScrollToContent();
    this.onClickBurger();
  }
}

export default Navigation;
