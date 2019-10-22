import React, { Component } from "react";
import * as THREE from "three";
import { linear } from "../FullPage";
import { TweenLite, TimelineLite, Power4 } from "gsap";
import { connect } from "react-redux";
import { modelLoaded, modelExploded } from "../../Global/actions/mainActions";
import { paused } from "../Navbar";
import GLTFLoader from "three-gltf-loader";
import Loading from "../Loading";

const gltFLoader = new GLTFLoader();

class CanvasBG extends Component {
  state = {
    loaded: false,
    progressLoaded: 0,
    vector: {
      x: 0,
      y: 0
    }
  };
  
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    window.removeEventListener("scroll", this._handleScroll);
    window.removeEventListener("resize", this._handleResize, false);
    if (window.DeviceOrientationEvent && "ontouchstart" in window) {
      window.removeEventListener(
        "deviceorientation",
        this._handleDeviceOrientation
      );
    } else {
      window.removeEventListener("mousemove", this._handleMousemove);
    }
  }
  async componentDidMount() {
    window.addEventListener("resize", this._handleResize, false);
    document.body.classList.add("intro-blocker");
    const width = this.mount.clientWidth,
      height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    
    this.geometry();
    this.lights();
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 4;
    this.renderer.setSize(width, height);
    this.renderer.gammaOutput = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.mount.appendChild(this.renderer.domElement);
    
    this.animate();
    
    TweenLite.from(this.mount.querySelector("canvas"), 1, {
      opacity: 0,
      ease: Power4.easeOut
    });
  }
  
  traverseMaterials = (object, callback, xOr) => {
    object.traverse(node => {
      if (!node.isMesh) return;
      if (callback) {
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach(callback);
      }
      if (xOr) {
        xOr(node);
      }
    });
  };

  _cubeMap = new THREE.CubeTextureLoader().load([
    require("../../assets/obj/env/px.jpg"),
    require("../../assets/obj/env/nx.jpg"),
    require("../../assets/obj/env/py.jpg"),
    require("../../assets/obj/env/ny.jpg"),
    require("../../assets/obj/env/pz.jpg"),
    require("../../assets/obj/env/nz.jpg")
  ]);

  _handleResize = () => {
    const width = this.mount.clientWidth,
      height = this.mount.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
  
  objectLoader = object => {
    const setProgress = i => {
      this.setState({
        progressLoaded: 100
      });
    };
    return new Promise((resolve, reject) => {
      gltFLoader.load(
        object,
        obj => {
          setProgress();
          resolve(obj);
        },
        // called while loading is progressing
        function(xhr) {},
        // called when loading has errors
        function(error) {
          reject(error);
        }
      );
    });
  };

  geometry = async () => {
    const scene = await this.objectLoader(require("../../assets/obj/out.glb"));
    scene.scene.scale.set(1, 1, 1);
    scene.scene.position.set(0, 0, -500);
    this.traverseMaterials(scene.scene, material => {
      if (
        material.isMeshStandardMaterial ||
        material.isGLTFSpecularGlossinessMaterial
      ) {
        material.envMap = this._cubeMap;
        material.needsUpdate = true;
      }
    });
    this.object = scene.scene;
    this.scene.add(scene.scene);
    this.mixer = new THREE.AnimationMixer(scene.scene);
    this.clips = scene.animations;
    this.clips.forEach(clip => {
      if (!this.animation) {
        this.animation = this.mixer.clipAction(clip);
        this.animation.setLoop(THREE.LoopOnce);
      }
    });
    this.animation.timeScale = 1;
    this.animation.clampWhenFinished = true;
    await this.setState({
      loaded: true
    });
    this.objectAnim();
  };

  entryAnim = new TimelineLite(paused);

  objectAnim = () => {
    if (this.props.main.modelExploded === false) {
      this.entryAnim.to(this.camera.position, 2, {
        z: 100,
        ease: Power4.easeInOut,

        onComplete: () => {
          this.animation.play();
        }
      });
      this.entryAnim.to(
        this.camera.position,
        2,
        {
          z: -400,
          ease: Power4.easeInOut,
          onComplete: () => {
            this.props.modelExploded(true);
            window.addEventListener("scroll", this._handleScroll);
            if (window.DeviceOrientationEvent && "ontouchstart" in window) {
              window.addEventListener(
                "deviceorientation",
                this._handleDeviceOrientation
              );
            } else {
              window.addEventListener("mousemove", this._handleMousemove);
            }
            setTimeout(() => {
              this.traverseMaterials(this.scene, null, object => {
                object.matrixAutoUpdate = false;
              });
            }, 2000);
          }
        },
        "+=1.5"
      );
      this.entryAnim.play();
    } else {
      this.animation.time = 5;
      TweenLite.to(this.camera.position, 0.5, {
        z: -400,
        ease: Power4.easeInOut
      });
      this.animation.play();
      this.updateMixer(0.01);

      window.addEventListener("scroll", this._handleScroll);
      if (window.DeviceOrientationEvent && "ontouchstart" in window) {
        window.addEventListener(
          "deviceorientation",
          this._handleDeviceOrientation
        );
      } else {
        window.addEventListener("mousemove", this._handleMousemove);
      }
    }
  };

  mouse = {};

  _handleDeviceOrientation = event => {
    if (event) {
      const x = linear(event.beta, -180, 180, -0.1, 0.1);
      const y = linear(event.gamma, -90, 90, -1, 1);
      if (this.object) {
        TweenLite.to(this.camera.rotation, 0.6, {
          x: x,
          y: y,
          ease: Power4.easeOut
        });
      }
    } else {
    }
  };
  
  _handleMousemove = event => {
    const pageX =
      event.clientX - this.mount.getBoundingClientRect().width * 0.5;

    // same here, get the y. use  to see the values
    const pageY =
      event.clientY - this.mount.getBoundingClientRect().height * 0.5;
    TweenLite.to(this.camera.position, 0.6, {
      x: pageX / 70,
      y: pageY / 70,
      ease: Power4.easeOut
    });
    TweenLite.to(this.camera.rotation, 0.6, {
      x: 0 - pageY / 1000,
      y: 0 - pageX / 5000,
      ease: Power4.easeOut
    });
  };

  lights = () => {
    const light = new THREE.PointLight("white", 1.5);
    light.position.set(10, 50, 100);
    this.scene.add(light);
  };
  
  _handleScroll = () => {
    const top = linear(window.pageYOffset, 0, window.innerHeight, 400, 1000);
    TweenLite.to(this.camera.position, 0.6, {
      z: -top,
      ease: Power4.easeOut
    });
    TweenLite.to(this.mount, 1, {
      y: window.pageYOffset,
      ease: Power4.easeOut
    });
    if (top >= 1000) {
      this.mount.style.opacity = 0;
    } else {
      this.mount.style.opacity = 1;
    }
  };
  
  updateMixer = frameId => {
    this.mixer.update(frameId);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.mixer) {
      this.updateMixer(0.01);
    }
    this.renderer.render(this.scene, this.camera);
  };
  cancel = () => {
    cancelAnimationFrame(this.animate);
  };
  render() {
    return (
      <div className="canvas-mount" ref={ref => (this.mount = ref)}>
        {!this.props.main.modelExploded ? (
          <Loading
            progress={this.state.progressLoaded}
            loading={this.state.progressLoaded < 100}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  modelLoaded,
  modelExploded
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasBG);
