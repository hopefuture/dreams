import React, { Component } from "react";
import { connect } from "react-redux";
import NavHelper from "./NavHelper";
import { Power4 } from "gsap";
import { withRouter } from "react-router-dom";

export const fadeIn = {
  opacity: 0,
  y: 100,
  ease: Power4.easeOut
};

export const paused = { paused: true };

class Navbar extends Component {
  componentDidMount() {}
  render() {
    // return <NavHelper />;
    if (this.props.location.pathname === "/") {
      if (this.props.main.modelExploded) {
        return <NavHelper />;
      } else {
        return null;
      }
    } else {
      return <NavHelper />;
    }
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
