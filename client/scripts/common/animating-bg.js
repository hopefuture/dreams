import { addClass } from '../utils/dom-class';
import { win, doc } from '../utils/perfect';

let homeBg;

function _handleMousemove (event) {
  if (!homeBg) {
    return;
  }
  
  const pageX =
    event.clientX - homeBg.getBoundingClientRect().width * 0.5;
  
  const pageY =
    event.clientY - homeBg.getBoundingClientRect().height * 0.5;
  
  if (Math.abs(pageX) < 10 && Math.abs(pageY) < 10) {
    return;
  }
  
  if (Math.abs(pageX) > 10) {
    homeBg.style.setProperty('transform', `perspective(400px) rotate3d(0, 1, 0, ${pageX / 50}deg)`);
  }
}

export default function () {
  win.addEventListener('DOMContentLoaded', (event) => {
    let width;
    if (win.screen) {
      width = win.screen.width;
    } else {
      width = doc.documentElement.clientWidth || doc.body.clientWidth;
    }
    
    const isDesktop = width > 768;
    
    if (isDesktop) {
      addClass(doc.body, 'home-body');
    }
    
    const animatingBg = doc.querySelector('.animating-bg');
    homeBg = animatingBg.querySelector(isDesktop ? '.home-bg.desktop' : '.home-bg.mobile');
    addClass('.animating-bg .animating-loading-logo', 'animating');
    
    setTimeout(() => {
      addClass('.animating-bg .animating-loading', 'hide');
      addClass(homeBg, 'show');
    }, 4500);
  }, false);
  
  win.addEventListener('mousemove', _handleMousemove);
  win.addEventListener(
    'deviceorientation',
    _handleMousemove
  );
};
