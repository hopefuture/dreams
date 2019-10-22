import { TimelineMax, Power4, TweenLite } from 'gsap';

export default class Loading {
  constructor () {
    this.pageLoading = document.querySelector('#pageLoading');
    this.loading = {
      val: 0
    };
    
    this.timeline = new TimelineMax({
      onComplete: () => {
        this.timeline.restart();
      }
    });
    this.outTL = new TimelineMax({ paused: true });
    
    setTimeout(() => {
      this.init();
    }, 100);
  }
  
  init () {
    this.loading.val = 0;
    TweenLite.to(this.loading, 2, {
      val: 100,
      ease: Power4.easeOut,
      onUpdate: () => {
        const val = this.loading.val;
        this.pageLoading.querySelector('.progress-bar_inner').style.width = `${val}%`;
      }
    });
    this.timeline.play();
  }
  
  animating () {
    this.outTL.to(
      this.pageLoading.childNodes,
      0.5,
      {
        opacity: 0,
        ease: Power4.easeOut
      },
      0.1
    );
    this.outTL.to(this.pageLoading, 0.5, {
      opacity: 0,
      ease: Power4.easeOut,
      onComplete: () => {}
    });
    this.outTL.play();
  }
  
  destroy () {
    const parentDom = this.pageLoading.parentElement;
    parentDom.removeChild(this.pageLoading);
  }
}
