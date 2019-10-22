import React, { Component } from "react";
import { TimelineMax, Power4, TweenLite } from "gsap";
import { paused } from "../Navbar";

export default class Loading extends Component {
  state = {
    loading: 0
  };
  loading = {
    val: 0
  };
  componentDidMount() {
    this.loading.val = 0;
    TweenLite.to(this.loading, 2, {
      val: 100,
      ease: Power4.easeOut,
      onUpdate: () => {
        this.setState({
          loading: this.loading.val
        });
      }
    });
    this.timeline.play();
  }
  outTL = new TimelineMax(paused);
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && !this.props.loading) {
      this.outTL.to(
        this.wrapper.childNodes,
        0.5,
        {
          opacity: 0,
          ease: Power4.easeOut
        },
        0.1
      );
      this.outTL.to(this.wrapper, 0.5, {
        opacity: 0,
        ease: Power4.easeOut,
        onComplete: () => {
          if (this.props.unmounted) {
            this.props.unmounted();
          }
        }
      });
      this.outTL.play();
    }
  }
  timeline = new TimelineMax({
    onComplete: () => {
      this.timeline.restart();
    }
  });
  render() {
    const text = <></>;
    return (
      <div className="page-loading" ref={ref => (this.wrapper = ref)}>
        {this.props.progress ? (
          <>
            <div className="progress-bar">
              <div
                className="progress-bar_inner"
                style={{
                  width: this.props.progress + "%"
                }}
              />
            </div>
            <div className="page-loading_text_wrapper">{text}</div>
          </>
        ) : (
          <>
            <div className="progress-bar">
              <div
                className="progress-bar_inner"
                style={{
                  transition: "0s",
                  width: this.state.loading + "%"
                }}
              />
            </div>
            <div className="page-loading_text_wrapper">{text}</div>
          </>
        )}
      </div>
    );
  }
}
