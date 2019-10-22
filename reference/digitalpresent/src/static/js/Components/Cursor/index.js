import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import { connect } from "react-redux";

class Cursor extends Component {
  componentDidMount() {
    // this.buildAnim();
    window.addEventListener("mousemove", this.onMove);
  }
  state = {
    text: null
  };
  buildAnim = () => {
    this.helperTL.from(this.helper, 0.5, {
      opacity: 0
    });
  };
  
  onMove = async e => {
    const { height } = this.cursor.getBoundingClientRect();
    const { width } = this.helper.getBoundingClientRect();
    const x = e.clientX,
      y = e.clientY;
    this.cursor.classList.remove("red");
    
    if (e.target.closest("[data-underline]")) {
      this.cursor.classList.add("red");
      const targs = e.target.closest("[data-underline]");
      const bounder = targs.getBoundingClientRect();
      TweenLite.to(this.cursor, 0.5, {
        x: bounder.left - width / 2,
        y: bounder.bottom + 10,
        width: bounder.width,
        borderRadius: 0,
        height: 0.5,
        ease: Power4.easeOut
      });
    } else if (e.target.closest("[data-big]")) {
      const targs = e.target.closest("[data-big]");
      TweenLite.to(this.cursor, 0.5, {
        x: x - height / 2,
        y: y - height / 2,
        borderRadius: "100%",
        width: 50,
        height: 50,
        ease: Power4.easeOut
      });
      TweenLite.to(this.helper, 1, {
        x: x - width / 2,
        y: y + 50,
        ease: Power4.easeOut
      });
    } else {
      TweenLite.to(this.cursor, 0.25, {
        width: 10,
        borderRadius: "100%",
        height: 10,
        x: x - height / 2,
        y: y - height / 2,
        ease: Power4.easeOut
      });
      TweenLite.to(this.helper, 1, {
        x: x - width / 2,
        y: y + 50,
        ease: Power4.easeOut
      });
    }
    if (e.target.closest("[data-text]")) {
      await this.setState({
        text: e.target.closest("[data-text]").getAttribute("data-text")
      });
    } else {
      await this.setState({
        text: null
      });
    }
  };
  render() {
    const style = this.props.main.data.loaded ? { opacity: 1 } : { opacity: 0 };
    return (
      <>
        <div
          style={style}
          ref={ref => (this.cursor = ref)}
          className="cursor"
        />
        <p style={style} className="cursor" ref={ref => (this.helper = ref)}>
          {this.state.text}
        </p>
      </>
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
)(Cursor);
