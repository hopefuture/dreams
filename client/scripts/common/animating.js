import { win, doc } from '../utils/perfect';
import { addClass } from '../utils/dom-class';

export default function () {
  win.addEventListener('DOMContentLoaded', (event) => {
    addClass('.animating', 'effect');
    document.querySelector('.animating').classList.add('effect');
    setTimeout(() => {
      addClass(doc.body, 'show');
      addClass('.home-jumbotron-content', 'animating-effect');
    }, 3000);
  }, false);
};
