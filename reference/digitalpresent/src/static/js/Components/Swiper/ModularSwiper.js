import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import Swipe from "react-easy-swipe";
import SingleSwipe from "../ProjectSwipe";
import { connect } from "react-redux";
import isMobile from "ismobilejs";
import { throttle, debounce } from "throttle-debounce";

var freezeVp = function(e) {
  e.preventDefault();
};

export const ForMore = () => {
  return (
    <h3 className="onlyMobile forMore">
      Swipe <span />
    </h3>
  );
};

export function stopBodyScrolling(bool) {
  if (bool === true) {
  } else {
    document.body.removeEventListener("touchmove", freezeVp, false);
  }
}

class ModularSwiper extends Component {
  state = {
    slide: 1,
    left: 0,
    swipe: {
      x: 0,
      y: 0
    }
  };

  componentDidMount() {
    this.setState({
      left: this.parent.getBoundingClientRect().left
    });
  }

  swipeRight = async e => {
    console.log(this.state.swipe);
    const margin = this.parent.clientWidth;
    if (this.state.swipe.x > 50) {
      if (this.state.slide > 1) {
        await this.setState({
          slide: this.state.slide - 1
        });
        TweenLite.to(this.parent, 1, {
          x: -(margin * (this.state.slide - 1)),
          ease: Power4.easeOut
        });
      }
    }
  };

  swipeLeft = async e => {
    console.log(this.state.swipe);
    const margin = this.parent.clientWidth;
    if (this.state.swipe.x < -50) {
      if (this.parent.childNodes.length > this.state.slide) {
        TweenLite.to(this.parent, 1, {
          x: -(margin * this.state.slide),
          ease: Power4.easeOut
        });
        await this.setState({
          slide: this.state.slide + 1
        });
      }
    }
  };
  swipeMove = e => {
    this.wrapper.style.touchAction = "pan-y";
    this.wrapper.style.userSelect = "none";
    e.x = e.x / 2;
    this.setState({
      swipe: e
    });
    if (this.state.slide !== 1) {
      if (this.parent.childNodes.length === this.state.slide) {
        if (e.x > 0) {
          TweenLite.to(this.parent, 1, {
            x: this.parent._gsTransform.x + e.x,
            ease: Power4.easeOut
          });
        }
      } else {
        if (this.parent._gsTransform) {
          TweenLite.to(this.parent, 1, {
            x: this.parent._gsTransform.x + e.x,
            ease: Power4.easeOut
          });
        } else {
          TweenLite.to(this.parent, 1, {
            x: e.x,
            ease: Power4.easeOut
          });
        }
      }
    } else {
      if (e.x < 0) {
        TweenLite.to(this.parent, 1, {
          x: e.x,
          ease: Power4.easeOut
        });
      }
    }
  };
  swipeEnd = e => {
    this.wrapper.style = null;
    const margin = this.parent.clientWidth;
    TweenLite.to(this.parent, 1, {
      x: -(margin * (this.state.slide - 1)),
      ease: Power4.easeOut
    });
  };
  swipeStart = () => {};
  render() {
    return (
      <Swipe
        onSwipeLeft={throttle(200, this.swipeLeft)}
        onSwipeRight={throttle(200, this.swipeRight)}
        allowMouseEvents
        onSwipeMove={this.swipeMove}
        onSwipeStart={this.swipeStart}
        onSwipeEnd={this.swipeEnd}
        data-text="drag"
        className={this.props.noFull ? null : "full"}
        tolerance={1}
        data-big
        style={{
          width: "100%"
        }}
      >
        <ForMore />
        <div ref={ref => (this.wrapper = ref)}>
          <div className="testimonial-swiper" ref={ref => (this.parent = ref)}>
            {this.props.children}
          </div>
        </div>
      </Swipe>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  ...null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModularSwiper);
