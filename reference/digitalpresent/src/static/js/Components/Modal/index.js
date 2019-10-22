import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { modalTrigger } from "../../Global/actions/mainActions";
import { TimelineMax } from "gsap";
import { paused, fadeIn } from "../Navbar";
import { delay } from "../../Routes/Work";
import { toast } from "react-toastify";

class Modal extends Component {
  anim = new TimelineMax(paused);
  erorrTL = new TimelineMax(paused);
  build = () => {
    this.anim.from(this.full, 0.5, {
      ...fadeIn,
      display: "none"
    });
    this.anim.staggerFrom(
      this.body.childNodes,
      1,
      {
        ...fadeIn,
        onComplete: () => {
          this.firstInput.focus();
        }
      },
      0.1,
      "-=0.5"
    );
  };
  componentDidMount() {
    this.build();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.main.modal !== this.props.main.modal) {
      if (this.props.main.modal) {
        this.erorrTL.pause(0);
        this.setState(this.initialState);
        this.anim.play();
        document.body.classList.add("modal-blocker");
        this.setState({
          modal: this.props.main.modal
        });
      } else {
        this.anim.reverse();
        document.body.classList.remove("modal-blocker");
        await delay(2);
        this.setState({
          modal: false
        });
      }
    }
  }
  state = {
    error: "",
    modal: false
  };
  initialState = {
    error: ""
  };
  onChange = async e => {
    const { name, value } = e.target;
    await this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    });
  };
  checkPromise = e => {
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    return new Promise((resolve, reject) => {
      for (let state in e) {
        if (!e[state]) {
          reject("This form won't work unless you fill everything.");
        } else if (state === "contact_email") {
          if (!validateEmail(e["contact_email"])) {
            reject(
              "We can't contact you if you don't give us your email address right?"
            );
          }
        }
      }
      resolve();
    });
  };
  test = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var object = {};
    formData.forEach(function(value, key) {
      object[key] = value;
    });
    this.Submit(object, e.target, formData);
  };
  Submit = async (e, form) => {
    console.log("submit");
    let rejection = false;
    try {
      await this.checkPromise(e);
      form.reset();
      this.erorrTL.reverse();
      const result = await fetch(
        "https://insights.digitalpresent.io/wp-json/contact/v1/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(e)
        }
      );
      const json = await result.json();
      if (json.status !== 200) {
        this.setState({
          error: "We're sorry! Something went wrong"
        });
        toast(this.state.error);
      } else if (json.status === 200) {
        if (json.status === 200) {
          var trackers = window.ga.getAll();
          var trackerName = trackers[0].a.data.values[":name"];
          window.ga(
            trackerName + ".send",
            "event",
            "contact",
            "submit",
            "sent",
            1
          );
          await this.setState({
            error: "We'll be in touch with you!"
          });
          toast(this.state.error);
        }
      }
    } catch (e) {
      console.log(e);
      if (!rejection) {
        if (typeof e === "string") {
          await this.setState({
            error: e
          });
          toast(this.state.error);
          rejection = true;
        }
      }
    }
  };
  render() {
    const { modal } = this.state;
    const title = modal === "apply" ? "Apply" : "Get a Quote";
    const subject = modal === "apply" ? "Position" : "Subject";
    const options =
      modal === "apply" ? (
        <>
          <option value="Front End Developer">Front End Developer</option>
          <option value="Back End Developer">Back End Developer</option>
          <option value="Web/Graphic Designer">Web/Graphic Designer</option>
          <option value="Marketing Specialist">Marketing Specialist</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Other">Other</option>
        </>
      ) : (
        <>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Branding Services">Branding Services</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Complaints/Compliments">Complaints/Compliments</option>
          <option value="Other">Other</option>
        </>
      );
    return ReactDOM.createPortal(
      <div className="modal" ref={ref => (this.full = ref)}>
        <div className="modal-body" ref={ref => (this.body = ref)}>
          <div
            className="modal-exit"
            onClick={() => {
              this.props.modalTrigger(false);
            }}
          >
            x
          </div>
          <div className="modal-title">
            <h1>{title}</h1>
          </div>
          <div className="modal-content">
            <form onSubmit={this.test}>
              <p>Name</p>
              <input
                ref={ref => (this.firstInput = ref)}
                name="contact_name"
                autoCapitalize="all"
                type="text"
              />
              <p>Email</p>
              <input name="contact_email" type="email" />
              
              <p>{subject}</p>
              
              <select name="contact_subject">
                <option>Please select</option>
                {options}
              </select>
              <p>Short Description</p>
              
              <textarea name="contact_message" type="text" rows="4" />
              
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>,
      document.querySelector("digitalpresent")
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  modalTrigger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
