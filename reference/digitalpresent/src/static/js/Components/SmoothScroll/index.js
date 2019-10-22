import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setBottom } from "../../Global/actions/mainActions";
import ResizeObserver from "resize-observer-polyfill";
import isMobile from "ismobilejs";

class SmoothScroll extends Component {
  componentDidUpdate(prevProps) {}
  state = {
    height: window.innerHeight
  };
  
  ro = new ResizeObserver(entries => {
    for (let entry of entries) {
      const crx = entry.contentRect;
      
      if (this.props.location.pathname.includes("contact")) {
        this.setState({
          height: crx.height
        });
      } else {
        this.setState({
          height: crx.height + window.innerHeight
        });
      }
    }
  });
  
  componentDidMount() {
    this.ro.observe(this.inner);
    this.props.history.listen(() => {
      window.scrollTo(0, 0);
    });
    if (!isMobile.any) {
      window.addEventListener("scroll", this.onScroll);
    } else {
      window.addEventListener("scroll", this.mobileScroll);
    }
  }
  onScroll = () => {
    const top = window.pageYOffset;
    const limit = this.state.height - window.innerHeight * 2.5;
    const arg = Math.round(top) >= Math.round(limit);
    if (arg && arg !== this.props.main.bottom) {
      this.props.setBottom(arg);
    }
    if (document.querySelector(".navbar")) {
      if (top > 100) {
        document.querySelector(".navbar").classList.add("small");
      } else {
        document.querySelector(".navbar").classList.remove("small");
      }
    }
    TweenLite.to(this.inner, 1, {
      y: -top,
      ease: Power4.easeOut
    });
  };
  mobileScroll = () => {
    const top = window.pageYOffset;
    const limit = this.state.height - window.innerHeight * 2.5;
    console.log(limit, top);
    const arg = Math.round(top) >= Math.round(limit);
    
    if (arg !== this.props.main.bottom) {
      this.props.setBottom(arg);
    }
    
    if (document.querySelector(".navbar")) {
      if (top > 100) {
        document.querySelector(".navbar").classList.add("small");
      } else {
        document.querySelector(".navbar").classList.remove("small");
      }
    }
  };
  render() {
    return (
      <>
        <div
          style={
            isMobile.any
              ? this.props.location.pathname.includes("contact")
              ? {
                marginBottom: 0
              }
              : {
                marginBottom: window.innerHeight
              }
              : null
          }
          className={
            isMobile.any ? "viewport-container mobile" : "viewport-container"
          }
          ref={ref => (this.inner = ref)}
        >
          {this.props.children}
        </div>
        {isMobile.any ? null : (
          <div
            className="fake-scroll"
            style={{
              height: this.state.height
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  setBottom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SmoothScroll));
