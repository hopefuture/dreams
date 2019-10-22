import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import { linear } from "../FullPage";
export function between(x, min, max) {
  return x >= min && x <= max;
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class RotateImage extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    this.halfWindow = window.innerHeight / 2;
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }
  
  randomValues = {
    rotation: random(0, 10),
    perspective: random(500, 600)
  };
  
  onScroll = e => {
    if (this.img) {
      const boundingBox = this.img.getBoundingClientRect();
      this.height = boundingBox.top + boundingBox.height / 2;
      const rotation = {
        rotationX: linear(
          this.height,
          0,
          this.halfWindow - 100,
          this.randomValues.rotation,
          0
        ),
        rotationY: linear(
          this.height,
          0,
          this.halfWindow - 100,
          this.randomValues.rotation,
          0
        ),
        y: -linear(this.height, 0, this.halfWindow, 150, 0),
        transformPerspective: this.randomValues.perspective
      };
      TweenLite.to(this.img, 1, {
        ...rotation,
        ease: Power4.easeOut
      });
    }
  };
  render() {
    return (
      <img
        alt={this.props.alt}
        className={this.props.className}
        ref={ref => (this.img = ref)}
        src={this.props.src}
      />
    );
  }
}
