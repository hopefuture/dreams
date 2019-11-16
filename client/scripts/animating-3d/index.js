import { win, doc } from '../utils/perfect';

import '../../scss/animating-3d.scss';

function grid () {
  const width = doc.documentElement.clientWidth;
  const height = doc.documentElement.clientHeight;
  
  const gridContainer = doc.querySelector('.grid');
  gridContainer.innerHTML = '';
  
  // line-horizontal
  for (let i = 0; i < 20; i++) {
    const el = doc.createElement('div');
    el.classList.add('line-horizontal');
    el.style.setProperty('top', `${height / 20 * (i + 1)}px`);
    if (i === 9) {
      el.style.setProperty('border-color', '#a71d2a');
    }
    gridContainer.appendChild(el);
  }
  
  // line-vertical
  for (let i = 0; i < 20; i++) {
    const el = doc.createElement('div');
    el.classList.add('line-vertical');
    el.style.setProperty('left', `${width / 20 * (i + 1)}px`);
    if (i === 9) {
      el.style.setProperty('border-color', '#a71d2a');
    }
    gridContainer.appendChild(el);
  }
}

function gridText () {
  const width = doc.documentElement.clientWidth;
  const height = doc.documentElement.clientHeight;
  
  const gridTextContainer = doc.querySelector('.grid-panel');
  gridTextContainer.innerHTML = '';
  
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const el = doc.createElement('div');
      el.classList.add('grid-panel-text');
      el.style.setProperty('width', `${width / 20}px`);
      el.style.setProperty('height', `${height / 20}px`);
      el.innerHTML = `${i + 1} - ${j + 1}`;
      gridTextContainer.appendChild(el);
    }
  }
}

function animating () {
  const widthBase = 1920;
  const heightBase = 1080;
  const wHRate = widthBase / heightBase;
  const width = doc.documentElement.clientWidth;
  const height = doc.documentElement.clientHeight;
  
  const actualRateW = width / widthBase;
  const actualRateH = height / heightBase;
  
  // 所有碎片数据，基于画布 1920 * 1080
  const data = [
    {
      width: 86,
      height: 72,
      x: -288,
      y: -540
    },
    {
      width: 156,
      height: 189,
      x: -70,
      y: -540
    }
  ];
  
  data.forEach((item, index) => {
    const { width, height, x, y } = item;
    const el = doc.querySelector(`.animation-debris${index + 1}`);
    
    el.style.setProperty('width', `${width * actualRateW}px`);
    el.style.setProperty('height', `${height * actualRateW}px`);
  
    const coordinateX = (x + (x > 0 ? -width : +width) / 2) * actualRateW;
    const coordinateY = (y + (y > 0 ? -height : +height) / 2) * actualRateH;
    
    const transform = `translate(${coordinateX}px, ${coordinateY}px)`;
    el.style.setProperty('transform', transform);
  });
}

function draw () {
  grid();
  gridText();
  animating();
}

draw();

win.addEventListener('resize', draw, false);
