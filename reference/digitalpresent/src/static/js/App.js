import React from "react";
import "./assets/css/style.scss";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./Global/store";
import ImagePreloader from "./Components/ImagePreloader";
import Cursor from "./Components/Cursor";
import { delay } from "./Routes/Work";
import { Tags } from "./Routes/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

async function addConsoles() {
  const oldLog = console.log;
  
  if (process.env.NODE_ENV !== "development") {
    console.warn = () => {
      return null;
    };
    console.warn = () => {
      return null;
    };
    console.log = () => {
      return null;
    };
  }
  const consoleBog = i => {
    oldLog(
      `%c${i}`,
      "padding:1rem 2rem;background: #050b2b; color: white;font-family: sans-serif; font-size:1rem;"
    );
  };
  
  const consoles = [
    "Oh damn, you're a curious bunch 😎",
    "Want to know how we made this? 🤔",
    "Think you got what it takes? 🤩",
    "Are you a creative developer/designer/dope dude? 😈",
    "partoftheteam@digitalpresent.mk"
  ];
  (function(url) {
    var image = new Image();
    image.onload = function() {
      oldLog(
        "%c x",
        [
          "font-size: 0px;",
          "line-height: " + this.height + "px;",
          "padding: " + this.height + "px " + this.width + "px;",
          "background-size: cover " + this.width + "px " + this.height + "px;",
          "background: #000000 url(" + url + ");",
          "background-position: center",
          "background-repeat: no-repeat"
        ].join(" ")
      );
    };
    image.src = url;
  })("https://i.imgur.com/Wj4vOFk.gif");
  for (let LOG in consoles) {
    await delay(1);
    consoleBog(consoles[LOG]);
  }
}

const CloseButton = ({ closeToast }) => {
  return (
    <p className="toastify__close" onClick={closeToast}>
    +
    </p>
);
};

function App() {
  addConsoles();
  const images = [
    require("./assets/img/composition.jpg"),
    require("./assets/img/compostions-3.jpg"),
    require("./assets/img/compostions-2.jpg")
  ];
  return (
    <>
    <Tags />
    <Provider store={store}>
    <ToastContainer
  position="bottom-center"
  hideProgressBar={true}
  autoClose={10000}
  closeButton={<CloseButton />}
  />
  <Routes />
  <ImagePreloader images={images} />
  {window.innerWidth >= 769 ? <Cursor /> : null}
</Provider>
  </>
);
}

export default App;
