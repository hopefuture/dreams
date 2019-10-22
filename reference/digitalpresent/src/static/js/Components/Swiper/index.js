import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import Swipe from "react-easy-swipe";
import SingleSwipe from "../ProjectSwipe";
import { connect } from "react-redux";
import isMobile from "ismobilejs";

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

class Swiper extends Component {
  state = {
    slide: 1,
    swipe: {
      x: 0,
      y: 0
    }
  };
  
  swipeRight = async e => {
    const margin =
      window.innerWidth <= 768
        ? this.parent.clientWidth + window.innerWidth / 10
        : this.parent.clientWidth;
    console.log(this.state.swipe, "right");
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
    const margin =
      window.innerWidth <= 768
        ? this.parent.clientWidth + window.innerWidth / 10
        : this.parent.clientWidth;
    console.log(this.state.swipe, "left");
    
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
    const margin =
      window.innerWidth <= 768
        ? this.parent.clientWidth + window.innerWidth / 10
        : this.parent.clientWidth;
    TweenLite.to(this.parent, 1, {
      x: -(margin * (this.state.slide - 1)),
      ease: Power4.easeOut
    });
  };
  swipeStart = () => {
    this.setState({
      swipe: {
        x: 0,
        y: 0
      }
    });
  };
  render() {
    const style = isMobile.any
      ? {
        overflowX: "hidden"
      }
      : null;
    return (
      <Swipe
        onSwipeLeft={this.swipeLeft}
        onSwipeRight={this.swipeRight}
        allowMouseEvents
        onSwipeMove={this.swipeMove}
        onSwipeStart={this.swipeStart}
        onSwipeEnd={this.swipeEnd}
        data-text="drag"
        data-big
        style={{
          ...style,
          ...this.props.style
        }}
      >
        <ForMore />
        <div ref={ref => (this.wrapper = ref)}>
          <div
            className="swiper-wrapper wrapper"
            ref={ref => (this.parent = ref)}
          >
            {this.props.main.data.studies.length !== 0
              ? this.props.main.data.studies.map((study, i) => {
                if (this.props.featured) {
                  if (study.acf.featured) {
                    return (
                      <SingleSwipe
                        i={i + 1}
                        key={study.title.rendered}
                        data={study}
                      />
                    );
                  } else {
                    return null;
                  }
                } else {
                  return (
                    <SingleSwipe
                      i={i + 1}
                      key={study.title.rendered}
                      data={study}
                    />
                  );
                }
              })
              : null}
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
)(Swiper);
