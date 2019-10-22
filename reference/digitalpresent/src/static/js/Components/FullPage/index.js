import React, { Component } from "react";
import InviewTransition from "../InviewTransition";
import RotateImage from "../RotateImage";
export const linear = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export const Arrow = props => {
  const className = props.outline ? "arrow outline" : "arrow";
  let rotation = props.right ? 0 : 0;
  rotation = props.left ? -180 : rotation;
  rotation = props.up ? -90 : rotation;
  rotation = props.down ? 90 : rotation;
  return (
    <div
      className={className}
      style={{ ...props.style, background: props.color }}
    >
      <img
        alt={"arrow"}
        rel="preload"
        style={{
          transform: "rotate(" + rotation + "deg)"
        }}
        src={require("../../assets/img/arrow.svg")}
      />
    </div>
  );
};

export class ArrowAnimated extends Component {
  render() {
    return (
      <div
        data-text={this.props["data-text"]}
        data-big={this.props["data-big"]}
        onClick={this.props.onClick ? this.props.onClick : null}
        className={this.props.className}
      >
        <div className="arrow-parent">
          <div
            style={{
              backgroundColor: this.props.color
            }}
            className="arrow-bg"
          />
          <Arrow right />
          <p>{this.props.children}</p>
        </div>
      </div>
    );
  }
}

export default class FullPage extends Component {
  render() {
    return (
      <div className="full">
        <div className="full-inner wrapper">
          <InviewTransition className="full-side">
            <div className="full-header">
              <h3>{this.props.weAre || "who we are"}</h3>
            </div>
            <div
              {...this.props["data-attr"]}
              className={this.props.wide ? "wide full-text" : "full-text"}
            >
              {this.props.children}
            </div>
            <ArrowAnimated
              data-text="click"
              data-big
              color="#ff0044"
              className="full-learn"
              onClick={this.props.onClick}
            >
              {this.props.learn || "Learn more"}
            </ArrowAnimated>
          </InviewTransition>
          <InviewTransition className="full-image">
            <RotateImage
              className="bottom"
              alt={this.props.alt}
              src={this.props.img || require("../../assets/img/img01.jpg")}
            />
          </InviewTransition>
        </div>
      </div>
    );
  }
}
