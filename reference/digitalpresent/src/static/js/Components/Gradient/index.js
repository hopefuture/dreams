import React, { Component } from "react";
import { TweenLite, Power4 } from "gsap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const isInViewport = function(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
    (window.innerWidth || document.documentElement.clientWidth)
  );
};

class BigGradient extends Component {
  state = {
    color: "#c50473",
    scale: 1,
    r: 100,
    x: 0,
    y: 0,
    stickies: []
  };
  
  animate = () => {
    this.state.stickies.forEach(sticky => {
      if (isInViewport(sticky)) {
        const { left, width } = sticky.getBoundingClientRect();
        
        TweenLite.to(this.gradient, 1, {
          x: left - window.innerWidth / 2 + width / 2,
          scaleY: sticky.getAttribute("data-gradient-scale-y") || 1,
          scale: sticky.getAttribute("data-gradient-scale") || 1,
          scaleX: sticky.getAttribute("data-gradient-scale-x") || 1,
          rotation: sticky.getAttribute("data-gradient-rotation") * 90 || 0,
          ease: Power4.easeOut
        });
        
        if (sticky.getAttribute("data-gradient-color")) {
          TweenLite.to(this.color, 2, {
            val: sticky.getAttribute("data-gradient-color"),
            ease: Power4.easeOut,
            onUpdate: () => {
              this.setState({
                color: this.color.val
              });
            }
          });
        } else {
          TweenLite.to(this.color, 1, {
            val: this.color.base,
            ease: Power4.easeOut,
            
            onUpdate: () => {
              this.setState({
                color: this.color.val
              });
            }
          });
        }
      } else if (this.props.main.bottom) {
        TweenLite.to(this.gradient, 1, {
          x: 0,
          scaleY: 1,
          scale: 1,
          scaleX: 1,
          rotation: 0,
          ease: Power4.easeOut
        });
        TweenLite.to(this.color, 1, {
          val: this.color.base,
          ease: Power4.easeOut,
          
          onUpdate: () => {
            this.setState({
              color: this.color.val
            });
          }
        });
      }
    });
  };
  setSticky = () => {
    this.setState({
      stickies: document.querySelectorAll("[data-gradient-stick]")
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.main.modelExploded !== prevProps.main.modelExploded) {
      this.setSticky();
    }
    if (
      this.props.main.data.blog.length !== prevProps.main.data.blog.length &&
      this.props.main.data.blog.length !== 0
    ) {
      this.setSticky();
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("mousemove", this.onScroll);
    this.props.history.listen(() => {
      setTimeout(() => {
        this.setSticky();
      }, 200);
    });
  }
  
  onScroll = () => {
    requestAnimationFrame(this.animate);
  };
  
  color = {
    val: "#c50473",
    scale: 1,
    r: 700,
    x: window.innerWidth / 2 + 50,
    y: window.innerHeight / 2 + 50,
    base: "#c50473"
  };
  
  render() {
    return (
      <div ref={ref => (this.gradient = ref)} className="overlay-gradient">
        <svg
          width={window.innerWidth}
          height={window.innerHeight}
          viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        >
          <defs>
            <radialGradient
              id="radial-gradient"
              cx="0.5"
              cy="0.5"
              r="0.422"
              gradientUnits="objectBoundingBox"
            >
              <stop
                offset="0"
                stopColor={this.state.color}
                stopOpacity="0.25"
              />
              <stop offset="1" stopColor={this.state.color} stopOpacity="0" />
            </radialGradient>
            <feBlend in="radial-gradient" mode="screen" />
          </defs>
          <circle
            id="Ellipse_13"
            data-name="Ellipse 13"
            cx={window.innerWidth / 2}
            cy={window.innerHeight / 2}
            r={this.state.r * 4}
            fill="url(#radial-gradient)"
          />
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BigGradient));

//NEW STICKY CODE
// TweenLite.to(this.color, 1, {
//   val: sticky.getAttribute("data-gradient-color") || this.color.base,
//   x: left - window.innerWidth / 2 + width / 2 + this.state.r,
//   scale: sticky.getAttribute("data-gradient-scale") || 1,
//   r: 700,
//   ease: Power4.easeOut,
//   onUpdate: () => {
//     this.setState({
//       color: this.color.val,
//       x: this.color.x,
//       y: this.color.y,
//       r: this.color.r
//     });
//   }
// });

// OLD STICKY CODE
// TweenLite.to(this.gradient, 1, {
//   x: left - window.innerWidth / 2 + width / 2,
//   scaleY: sticky.getAttribute("data-gradient-scale-y") || 1,
//   scale: sticky.getAttribute("data-gradient-scale") || 1,
//   scaleX: sticky.getAttribute("data-gradient-scale-x") || 1,
//   rotation: sticky.getAttribute("data-gradient-rotation") * 90 || 0,
//   ease: Power4.easeOut
// });

//   if (sticky.getAttribute("data-gradient-color")) {
//     TweenLite.to(this.color, 2, {
//       val: sticky.getAttribute("data-gradient-color"),
//       ease: Power4.easeOut,
//       onUpdate: () => {
//         this.setState({
//           color: this.color.val
//         });
//       }
//     });
//   } else {
//     TweenLite.to(this.color, 1, {
//       val: this.color.base,
//       ease: Power4.easeOut,

//       onUpdate: () => {
//         this.setState({
//           color: this.color.val
//         });
//       }
//     });
//   }
// } else if (this.props.main.bottom) {
//   TweenLite.to(this.gradient, 1, {
//     x: 0,
//     scaleY: 1,
//     scale: 1,
//     scaleX: 1,
//     rotation: 0,
//     ease: Power4.easeOut
//   });
//   TweenLite.to(this.color, 1, {
//     val: this.color.base,
//     ease: Power4.easeOut,

//     onUpdate: () => {
//       this.setState({
//         color: this.color.val
//       });
//     }
//   });
// }
