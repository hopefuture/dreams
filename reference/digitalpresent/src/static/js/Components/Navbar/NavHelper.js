import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { TimelineMax, Power4 } from "gsap";
import { connect } from "react-redux";
import { paused, fadeIn } from "./index";
import { Socials } from "../Footer";
import { delay } from "../../Routes/Work/";

class NavHelper extends Component {
  openTL = new TimelineMax(paused);
  entryTL = new TimelineMax(paused);
  fadeTL = new TimelineMax(paused);
  state = {
    open: false,
    light: false
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        document.body.classList.add("blocker");
      } else {
        document.body.classList.remove("blocker");
      }
    }
    if (
      prevProps.main.transitionLink !== this.props.main.transitionLink &&
      this.props.main.transitionLink
    ) {
      this.clickButton();
    }
  }
  handleBurger = async e => {
    await this.setState({
      open: !this.state.open
    });
    
    if (this.state.open) {
      this.openTL.timeScale(1).play();
    } else {
      this.openTL.timeScale(2).reverse();
    }
  };
  buildAnim = () => {
    this.openTL.from(this.menuWrapper, 0.5, {
      height: 0,
      ease: Power4.easeOut,
      onReverseComplete: () => {
        this.setState({
          open: false
        });
        document.body.classList.remove("open");
      },
      onStart: () => {
        this.setState({
          open: true
        });
        document.body.classList.add("open");
      }
    });
    this.openTL.staggerFrom(
      this.menuLinks.childNodes,
      1,
      {
        opacity: 0,
        y: 50,
        ease: Power4.easeOut
      },
      0.1,
      "-=1"
    );
  };
  buildEntry = () => {
    this.entryTL.staggerFrom(this.nav.childNodes, 1, { ...fadeIn }, 0.1);
    this.fadeTL.from(this.overlay, 0.5, {
      scaleY: 0,
      transformOrigin: "bottom center",
      ease: Power4.easeIn,
      onComplete: async () => {
        this.openTL.pause(0);
        await this.setState({
          open: false
        });
      },
      clearProps: "all"
    });
    this.fadeTL.to(
      this.overlay,
      0.5,
      {
        scaleY: 0,
        transformOrigin: "top center",
        ease: Power4.easeOut,
        clearProps: "all",
        onComplete: async () => {
          this.fadeTL.pause(0);
        }
      },
      "+=0.5"
    );
  };
  componentDidMount() {
    this.buildAnim();
    this.buildEntry();
    this.entryTL.play();
  }
  
  clickButton = async e => {
    this.fadeTL.play();
    document.body.classList.remove("light");
    document.body.classList.remove("open");
  };
  realClick = async e => {
    e.persist();
    
    let to;
    if (e.target.attributes.href) {
      to = e.target.attributes.href.value;
    } else {
      to = e.target.closest("[href]").attributes.href.value;
    }
    e.preventDefault();
    this.clickButton();
    await delay(0.5);
    this.props.history.push(to);
  };
  render() {
    return (
      <>
        <div className="navbar-overlay" ref={ref => (this.overlay = ref)} />
        {/* <div className="navbar-overlay-two" /> */}
        <div className="navbar">
          <div className="navbar-wrapper " ref={ref => (this.nav = ref)}>
            <div className="logo" onClick={this.realClick} href="/">
              <img
                alt={"Logo Dark"}
                className="logo-dark"
                src={require("../../assets/img/logo.svg")}
              />{" "}
              <img
                alt={"Logo Dark"}
                className="logo-light"
                src={require("../../assets/img/symbol.svg")}
              />
            </div>
            <div className="navbar-burger">
              <button
                aria-label="Navbar Burger Menu"
                data-big
                data-text="menu"
                ref={ref => (this.burger = ref)}
                className={this.state.open ? "active" : null}
                onClick={this.handleBurger}
              />
            </div>
          </div>
        </div>
        <div className="navbar-menu" ref={ref => (this.menuWrapper = ref)}>
          <div className="navbar-menu_wrapper wrapper">
            <div className="social-link-menu">
              <Socials noSkype names />
            </div>
            
            <div className="navbar-links">
              <ul ref={ref => (this.menuLinks = ref)}>
                <li>
                  <Link
                    className={
                      this.props.history.location.pathname === "/"
                        ? "active"
                        : null
                    }
                    data-underline
                    onClick={this.realClick}
                    data-hover="Home"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    data-underline
                    className={
                      this.props.history.location.pathname === "/work"
                        ? "active"
                        : null
                    }
                    onClick={this.realClick}
                    data-hover="Our Work"
                    to="/work"
                  >
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link
                    data-underline
                    className={
                      this.props.history.location.pathname === "/about"
                        ? "active"
                        : null
                    }
                    onClick={this.realClick}
                    data-hover="About"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                
                <li>
                  <Link
                    data-underline
                    onClick={this.realClick}
                    className={
                      this.props.history.location.pathname === "/blog"
                        ? "active"
                        : null
                    }
                    data-hover="Blog"
                    to="/blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    data-underline
                    onClick={this.realClick}
                    data-hover="Contact"
                    className={
                      this.props.history.location.pathname === "/contact"
                        ? "active"
                        : null
                    }
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
)(withRouter(NavHelper));
