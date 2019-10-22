import React, { Component } from "react";
// import Progress from "../Progress";
import { connect } from "react-redux";
// import { TweenLite, Power4 } from "gsap";
import { transitionLink } from "../../Global/actions/mainActions";
import { delay } from "../../Routes/Work/";
import { withRouter } from "react-router-dom";

export const Socials = props => {
  return (
    <ul className="socials-links">
      <li>
        <a href="https://www.facebook.com/digitalpresent/?ref=br_rs">
          {props.noIcon ? null : (
            <img
              className="noMobile"
              alt="Facebook icon"
              src={require("../../assets/img/icons/fb.svg")}
            />
          )}
          {props.noText ? null : props.names ? (
            <p
              style={{
                marginLeft: "10px"
              }}
            >
              Facebook
            </p>
          ) : (
            <p
              style={{
                marginLeft: "10px"
              }}
            >
              Fb
            </p>
          )}
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/digital-present---design-and-development">
          {props.noIcon ? null : (
            <img
              className="noMobile"
              alt="Linkedin icon"
              src={require("../../assets/img/icons/li.svg")}
            />
          )}
          {props.noText ? null : props.names ? (
            <p
              style={{
                marginLeft: "10px"
              }}
            >
              LinkedIn
            </p>
          ) : (
            <p
              style={{
                marginLeft: "10px"
              }}
            >
              Li
            </p>
          )}
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/digital_present/">
          {props.noIcon ? null : (
            <img
              className="noMobile"
              alt="Instagram icon"
              src={require("../../assets/img/icons/ig.svg")}
            />
          )}
          {props.noText ? null : props.names ? (
            <p
              style={{
                marginLeft: "10px"
              }}
            >
              Instagram
            </p>
          ) : (
            <p
              style={{
                marginLeft: "10px"
              }}
            >
              Ig
            </p>
          )}
        </a>
      </li>
      <li>
        {props.whatsApp ? (
          <a href="https://wa.me/0038970309129">
            {props.noIcon ? null : (
              <img
                className="noMobile"
                alt="Behance icon"
                src={require("../../assets/img/icons/wa.svg")}
              />
            )}
            {props.noText ? null : props.names ? (
              <p
                style={{
                  marginLeft: "10px"
                }}
              >
                WhatsApp
              </p>
            ) : (
              <p
                style={{
                  marginLeft: "10px"
                }}
              >
                Wa
              </p>
            )}
          </a>
        ) : (
          <a href="https://www.behance.net/digitalpresent">
            {props.noIcon ? null : (
              <img
                className="noMobile"
                alt="Behance icon"
                src={require("../../assets/img/icons/be.svg")}
              />
            )}
            {props.noText ? null : props.names ? (
              <p
                style={{
                  marginLeft: "10px"
                }}
              >
                Behance
              </p>
            ) : (
              <p
                style={{
                  marginLeft: "10px"
                }}
              >
                Be
              </p>
            )}
          </a>
        )}
      </li>
      {props.noSkype ? null : (
        <li>
          <a href="skype:live:contact_98294?chat">
            {props.noIcon ? null : (
              <img
                className="noMobile"
                alt="Skype icon"
                src={require("../../assets/img/icons/sk.svg")}
              />
            )}
            {props.noText ? null : props.names ? (
              <p
                style={{
                  marginLeft: "10px"
                }}
              >
                Skype
              </p>
            ) : (
              <p
                style={{
                  marginLeft: "10px"
                }}
              >
                Sk
              </p>
            )}
          </a>
        </li>
      )}
    </ul>
  );
};

export const Copyright = () => {
  return (
    <p>
      © Copyright 2019.
      <br className="break-copyright" /> All Rights Reserved
    </p>
  );
};

class Footer extends Component {
  state = {
    completion: 0
  };
  componentDidUpdate(prevProps) {
    // if (this.props.main.bottom !== prevProps.main.bottom) {
    //   if (this.props.main.bottom) {
    //     this.starTimer();
    //   } else {
    //     this.resetTimer();
    //   }
    // }
  }
  completion = {
    val: 0
  };
  resetTimer = () => {
    // TweenLite.to(this.completion, 1, {
    //   val: 0,
    //   ease: Power4.easeOut,
    //   onUpdate: () => {
    //     this.setState({
    //       completion: parseInt(this.completion.val)
    //     });
    //   }
    // });
  };
  starTimer = () => {
    // TweenLite.to(this.completion, 10, {
    //   val: 100,
    //   ease: Power4.easeOut,
    //   onUpdate: () => {
    //     this.setState({
    //       completion: this.completion.val
    //     });
    //   },
    //   onComplete: this.completeTimer
    // });
  };
  
  completeTimer = async () => {
    if (process.env.NODE_ENV !== "development") {
      if (window.innerWidth > 768) {
        this.props.transitionLink();
        await delay(0.5);
        this.props.history.push("/contact");
      }
    }
  };
  
  goToContact = async e => {
    e.preventDefault();
    this.props.transitionLink();
    await delay(0.5);
    this.props.history.push("/contact");
  };
  render() {
    return (
      <div
        className="footer"
        style={
          this.props.location.pathname.includes("contact")
            ? {
              opacity: 0
            }
            : this.props.main.bottom
            ? {
              opacity: 1
            }
            : { opacity: 0 }
        }
      >
        <div className="wrapper">
          <div className="footer-header">
            <h3>Let's build tomorrow, today.</h3>
          </div>
          <div className="footer-contact">
            <h2>
              <a
                className="underline red"
                onClick={this.goToContact}
                href="/contact"
              >
                Find out how
              </a>
            </h2>
          </div>
          <div className="footer-links">
            <Socials noIcon names />
          </div>
          <div className="footer-copyright">
            <Copyright />
          </div>
          {/* {window.innerWidth > 768 ? (
           <div className="footer-loading">
           <Progress
           radius={50}
           stroke={1}
           progress={this.state.completion}
           />
           </div>
           ) : null} */}
        </div>
        <div className="footer-bg" />
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
)(withRouter(Footer));
