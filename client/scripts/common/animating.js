import { win, doc } from '../utils/perfect';
import { addClass } from '../utils/dom-class';
import { setCookie, getCookie } from './cookie';

export default function () {
  // 首页动画效果隔天加载一次，并且从2、3级页面返回到首页时无爆炸效果
  const animating = getCookie('animating');
  if (!animating) {
    win.addEventListener('DOMContentLoaded', (event) => {
      addClass('.home-animating', 'effect');
      setTimeout(() => {
        addClass(doc.body, 'show');
        addClass('.home-jumbotron-content', 'animating-effect');
      }, 3000);
    }, false);
    setCookie({ name: 'animating', value: true, expires: 86400000 });
  } else {
    addClass('.home-animating', 'show');
    addClass(doc.body, 'show');
    addClass('.home-jumbotron-content', 'show');
  }
};
