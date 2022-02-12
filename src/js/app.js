import Slider from './components/Slider';
import Slides from './components/Slides';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Sections from './components/Sections';
import data from '../data/data.json';

const slides = new Slides(data.slides);
slides.createSlides();
const slider = new Slider();
slider.init();
const navigation = new Navigation(data.navigation);
const sections = new Sections(data.sections);
navigation.init();
sections.init();
const footer = new Footer(data.footer);
footer.init();

function ajaxpost() {

  const form = document.getElementById('form');
  const formData = new FormData(form);


  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'dummy.php');

  xhr.onload = function () {
    console.log(this.response);
    if(this.response === 'OK') {
        document.getElementById('form').reset();
        alert('ok')
    } else {
        alert('error')
    }
  };
  xhr.send(formData);

  return false;
}
