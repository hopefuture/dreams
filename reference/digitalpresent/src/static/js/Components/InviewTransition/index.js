import React, { Component } from "react";
import InviewMonitor from "react-inview-monitor";
import { TimelineMax, Power4 } from "gsap";
import { paused } from "../Navbar";

export default class InviewTransition extends Component {
  entryTL = new TimelineMax(paused);
  buildAnim = () => {
    const props = this.props.props
      ? {
        ...this.props.props,
        ease: this.props.ease ? Power4[this.props.ease] : Power4.easeOut,
        clearProps: "all"
      }
      : {
        opacity: this.props.opacity || 0,
        y: this.props.noY ? 0 : 100,
        ease: this.props.ease ? Power4[this.props.ease] : Power4.easeOut,
        clearProps: "all"
      };
    const stagger = this.props.stagger ? this.props.stagger : 0.2;
    this.entryTL.staggerFrom(
      this.inner.childNodes,
      this.props.time ? this.props.time : 1,
      props,
      stagger
    );
  };
  componentDidMount() {
    this.buildAnim();
  }
  onInView = () => {
    this.entryTL.play();
    if (this.props.inView) {
      this.props.inView();
    }
  };
  onNotInView = () => {
    this.entryTL.reverse();
    if (this.props.onNotInView) {
      this.props.onNotInView();
    }
  };
  
  render() {
    return (
      <InviewMonitor
        onNotInView={this.onNotInView}
        repeatOnInView={this.props.repeat}
        intoViewMargin={this.props.viewMargin}
        classNameInView={this.props.parentClass}
        classNameNotInView={this.props.parentClass}
        onInView={this.onInView}
      >
        <div
          className={this.props.className}
          dangerouslySetInnerHTML={
            this.props.dangerouslySetInnerHTML
              ? this.props.dangerouslySetInnerHTML
              : null
          }
          ref={ref => (this.inner = ref)}
        >
          {this.props.children}
        </div>
      </InviewMonitor>
    );
  }
}
