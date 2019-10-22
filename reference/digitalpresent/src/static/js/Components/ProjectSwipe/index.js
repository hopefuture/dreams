import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import InviewTransition from "../InviewTransition";
import { Arrow, linear, ArrowAnimated } from "../FullPage";
import { random } from "../RotateImage";
import { createMarkup } from "../helpers/markup";
import { connect } from "react-redux";
import { transitionLink } from "../../Global/actions/mainActions";
import { withRouter } from "react-router-dom";

class SingleSwipe extends Component {
  random = random(300, 500);
  mouseMove = e => {
    const left = linear(e.clientX, 0, window.innerWidth, -45, 45),
      top = linear(e.clientY, 0, window.innerHeight, -25, 25);
    TweenLite.to(this.img, 1, {
      rotationX: top,
      rotationY: left,
      ease: Power4.easeOut,
      transformPerspective: this.random,
      transformStyle: "preserve-3d"
    });
    TweenLite.to(this.img2, 1, {
      rotationX: top,
      rotationY: left,
      ease: Power4.easeOut,
      transformPerspective: this.random,
      transformStyle: "preserve-3d"
    });
  };
  componentDidMount() {}
  onClick = e => {
    e.preventDefault();
    const id = this.props.data.slug;
    this.props.transitionLink();
    setTimeout(() => {
      this.props.history.push("/case-study/" + id);
    }, 500);
  };
  render() {
    const { acf } = this.props.data;
    const img = this.props.data.better_featured_image.source_url || null;
    const imgTitle = this.props.data.better_featured_image.alt_text;
    
    return (
      <div className="swiper-inner" onMouseMove={this.mouseMove}>
        <div className="full-swiper" draggable="false">
          <InviewTransition
            props={{
              scale: 0.65,
              opacity: 0.4
            }}
            ease="easeOut"
            stagger="0"
            className="full-image"
            viewMargin="-20%"
          >
            <img
              draggable="false"
              className="full-image_logo"
              ref={ref => (this.img2 = ref)}
              alt={"Logo" + img}
              src={acf.logo}
            />
            <a
              data-text="click"
              onClick={this.onClick}
              href={"/case-study/" + this.props.data.slug}
            >
              <img
                rel="preload"
                draggable="false"
                className="full-image_image"
                ref={ref => (this.img = ref)}
                src={img}
                alt={imgTitle}
              />
            </a>
          </InviewTransition>
          <InviewTransition
            props={{
              x: "50%",
              opacity: 0
            }}
            ease="easeOut"
            stagger="0.1"
            time={1}
            className="full-side"
            viewMargin="200%"
          >
            <div className="full-header">
              <h3 data-number={"0" + this.props.i}>project</h3>
            </div>
            <div className="full-text">
              <h1>{acf.content.title}</h1>
              <p
                className="noMobile"
                data-gradient-stick
                data-gradient-scale-x="1.4"
                data-gradient-rotation="2.4"
                data-gradient-color={acf.color}
                dangerouslySetInnerHTML={createMarkup(acf.content.cta_desc)}
              />
            </div>{" "}
            <a
              onClick={e => e.preventDefault()}
              href={"/case-study/" + this.props.data.slug}
            >
              <ArrowAnimated
                onClick={this.onClick}
                className="full-learn"
                data-text="click"
                data-big
                color={acf.color}
              >
                The Case Study
              </ArrowAnimated>
            </a>
          </InviewTransition>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  transitionLink
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleSwipe));
