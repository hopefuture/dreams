import React, { Component } from "react";
import { connect } from "react-redux";
import FullPage from "../../Components/FullPage";
import Swiper from "../../Components/Swiper/index";
import Epitaph from "epitaphjs";
import { TimelineMax, Power4 } from "gsap";
import { paused } from "../../Components/Navbar";
import { transitionLink } from "../../Global/actions/mainActions";
import { delay } from "../Work/";
import { withRouter } from "react-router-dom";

class Homes extends Component {
  openTL = new TimelineMax(paused);
  componentDidMount() {
    document.body.classList.remove("blocker");
    document.body.classList.remove("intro-blocker");
    const splits = [
      {
        node: this.welcome,
        split: new Epitaph(this.welcome, {
          split: "word"
        })
      },
      {
        node: this.title,
        split: new Epitaph(this.title, {
          split: "word"
        })
      },
      {
        node: this.subheader,
        split: new Epitaph(this.subheader, {
          split: "word"
        })
      },
      {
        node: this.scroll
      }
    ];
    splits.forEach((split, i) => {
      this.openTL.staggerFrom(
        split.node.childNodes,
        1,
        {
          opacity: 0,
          y: 50,
          ease: Power4.easeOut
        },
        0.01,
        i ? "-=0.5" : null
      );
    });
    this.openTL.play();
  }
  onClick = async () => {
    this.props.transitionLink();
    await delay(0.5);
    this.props.history.push("/about");
  };
  onClick2 = async () => {
    this.props.transitionLink();
    await delay(0.5);
    this.props.history.push("/work");
  };
  render() {
    return (
      <>
        <div className="page">
          <div className="page-landing">
            <div className="title" style={{ display: "none" }}>
              <h3 ref={ref => (this.welcome = ref)}>Welcome</h3>
            </div>
            <div className="page-main">
              <div className="heading">
                <h1
                  data-gradient-stick
                  data-gradient-scale="1"
                  ref={ref => (this.title = ref)}
                >
                  Evolved digital emotions
                </h1>
              </div>
              <div className="subheader">
                <h2 ref={ref => (this.subheader = ref)}>
                  Emotions Are In Our DNA So Why Not DIGITALLY Evolve Them?
                </h2>
              </div>
            </div>
            <div
              ref={ref => (this.scroll = ref)}
              data-big
              data-text="scroll"
              className="explore"
            >
              <div className="line" />
              <p>Scroll to explore</p>
            </div>
          </div>
        </div>
        <FullPage
          data-attr={{
            "data-gradient-stick": true,
            
            "data-gradient-scale-x": "1.3",
            "data-gradient-rotation": "-0.4"
          }}
          alt="artistic facepaint"
          onClick={this.onClick}
          learn="About us"
        >
          <h1 className="glitch">A boutique agency with a dope catalog</h1>
          
          <p>
            We're a focused digital agency that specializes in creating
            experiences that you will adore. We do it all. Web, mobile,
            enterprise.
          </p>
          <p className="noMobile">
            With roots dating back to 2014, we started as a pocket size team of
            enthusiast who were tired of the status quo of how brands
            communicate their idea and personality to their clients.
          </p>
          <p className="noMobile">
            Every single person lives and breathes design and development at our
            offices. No tricks, no gimmicks, just hard work and persistence.
            Diving into the deep end and figuring it should be our company
            motto, but Evolved Digital Emotions sounded catchier.
          </p>
        </FullPage>
        <Swiper style={{ marginTop: "10vh" }} featured />
        <FullPage
          data-attr={{
            "data-gradient-stick": true
          }}
          wide
          onClick={this.onClick2}
          img={require("../../assets/img/img02.jpg")}
          alt="spaceman illustration"
          weAre="what we do"
          learn="Our Work"
        >
          <h1 className="glitch">
            We make web apps, mobile apps. We craft the perfect marketing
            campaigns. We build brands, services and platforms.
          </h1>
          <p className="noMobile">
            In a world of templates and cheap tricks, we do our best to
            differentiate you from the competition. Every single pixel is there
            because we wanted it to be there. In our office, we obsess over the
            minute details that you’ll never notice, but you’ll feel.
          </p>
        </FullPage>
      </>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = { transitionLink };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Homes));
