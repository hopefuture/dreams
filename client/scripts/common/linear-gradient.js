import { doc } from '../utils/perfect';

export default function () {
  window.addEventListener('scroll', (event) => {
    const { scrollTop } = doc.documentElement;
    const gradient = doc.querySelector('.dreams-container-gradient');
    gradient.style.top = `-${scrollTop}px`;
    gradient.style.height = `${scrollTop}px`;
  }, false);
};
