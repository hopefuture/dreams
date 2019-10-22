import React, { Component } from "react";
import {
  Switch,
  Redirect,
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Services from "./Work";
import Navbar from "../Components/Navbar";
import Home, { Tags } from "./Home";
import SmoothScroll from "../Components/SmoothScroll";
import Footer from "../Components/Footer";
import Blog from "./Blog";
import SinglePost from "./Post";
import Study from "./Study";
import { connect } from "react-redux";
import { fetchPosts } from "../Global/actions/mainActions";
import Loading from "../Components/Loading";
import Gradient from "../Components/Gradient";
import { gpuDetect } from "../Components/helpers/gpu-detect";
import ScrollMemory from "react-router-scroll-memory";
import Modal from "../Components/Modal";
import FourOhFour from "./404";
import Helmet from "react-helmet";
import Privacy from "./Privacy";

class Insights extends React.Component {
  render() {
    return (
      <Helmet>
        <meta
          http-equiv="refresh"
          content={`0;url=${window.location.protocol}//${
            window.location.host
          }/post/${this.props.match.params.id}`}
        />
      </Helmet>
    );
  }
}

export const SwitchRouter = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/work" component={Services} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/post/:id?" component={SinglePost} />
      <Route exact path="/case-study/:id?" component={Study} />
      <Route exact path="/insights/:id?" component={Insights} />
      <Route exact path="/privacy" component={Privacy} />
      <Route component={FourOhFour} />
    </Switch>
  );
};

class Routes extends Component {
  state = {
    loading: true,
    secondary: true
  };
  componentDidMount() {
    this.props.fetchPosts();
    if (window.location.pathname === "/") {
      this.setState({
        secondary: false
      });
    }
  }
  
  unmounted = () => {
    this.setState({
      loading: false
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.main.data.blog !== this.props.main.data.blog &&
      this.props.main.data.blog.length !== 0
    ) {
      setTimeout(() => {
        this.setState({
          secondary: false
        });
      }, 1000);
    }
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          this.state.secondary ? (
            <Loading
              unmounted={this.unmounted}
              loading={!this.props.main.data.loaded}
            />
          ) : null
        ) : null}
        <Router>
          <Modal />
          <ScrollMemory />
          {gpuDetect().any ? <Gradient /> : null}
          <Navbar />
          
          <SmoothScroll>
            <SwitchRouter />
          </SmoothScroll>
          <Footer />
        </Router>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = { fetchPosts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
