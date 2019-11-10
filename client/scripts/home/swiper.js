import Swiper from 'swiper';

export default function () {
  new Swiper('#swiper-about', {
    autoplay: {
      delay: 6000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
      reverseDirection: false,
      waitForTransition: true
    },
    loop: true,
    speed: 300,
    allowTouchMove: true,
    touchAngle: 45,
    mousewheel: {
      sensitivity: 1
    },
    pagination: {
      el: '#swiper-about .swiper-pagination',
      clickable: true
    }
  });
  
  new Swiper('#swiper-overview', {
    autoplay: {
      delay: 6000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
      reverseDirection: false,
      waitForTransition: true
    },
    loop: true,
    speed: 300,
    allowTouchMove: true,
    touchAngle: 45,
    mousewheel: {
      sensitivity: 1
    },
    pagination: {
      el: '#swiper-overview .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '#swiper-overview .swiper-button-next',
      prevEl: '#swiper-overview .swiper-button-prev'
    }
  });
};
