import React, { Component } from "react";
import CanvasBG from "../../Components/CanvasBG";
import Homes from "./Homes";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const defaultTags = [
  {
    name: "title",
    content: "Digital Present | Digital Agency | Skopje & Rotterdam"
  },
  {
    name: "description",
    content:
      "Digital Present is a digital agency specialized in web, mobile and digital marketing solutions, enabling your product to bloom"
  },
  {
    rel: "canonical",
    href: window.location.href
  },
  {
    name: "robots",
    content: "index,follow"
  },
  {
    property: "og:locale",
    content: "en_US"
  },
  {
    property: "og:title",
    content: "Digital Present | Digital Agency | Skopje & Rotterdam"
  },
  {
    property: "og:site_name",
    content: "Digital Present | Digital Agency | Skopje & Rotterdam"
  },
  {
    property: "og:description",
    content:
      "Digital Present is a digital agency specialized in web, mobile and digital marketing solutions, enabling your product to bloom"
  },
  {
    property: "og:url",
    content: "https://digitalpresent.io/"
  },
  {
    property: "og:image",
    content: "https://digitalpresent.io/images/meta/image.jpg"
  },
  {
    property: "twitter:card",
    content: "summary_large_image"
  },
  {
    property: "twitter:url",
    content: "https://digitalpresent.io/"
  },
  {
    property: "twitter:title",
    content: "Digital Present | Digital Agency | Skopje & Rotterdam"
  },
  {
    property: "twitter:description",
    content:
      "Digital Present is a digital agency specialized in web, mobile and digital marketing solutions, enabling your product to bloom"
  },
  {
    property: "twitter:image",
    content: "https://digitalpresent.io/images/meta/image.jpg"
  },
  {
    property: "og:type",
    content: "website"
  }
];

export const Tags = ({
                       title,
                       middleware,
                       withAddition,
                       description,
                       json
                     }) => {
  return (
    <Helmet>
      <title>
        {title
          ? title.toString()
          : "Digital Present | Digital Agency | Skopje & Rotterdam"}
        {withAddition ? ` | Digital Present` : ""}
      </title>
      {json
        ? json.map((tag, i) => {
          let tagZ = tag;
          if (tag.property && tag.property.includes(":url")) {
            tagZ.content = tagZ.content.replace(
              "insights.digitalpresent.io",
              "digitalpresent.io" + middleware
            );
            if (middleware === "/case-study") {
              tagZ.content = tagZ.content.replace("case-studies/", "");
            }
            console.log(tagZ);
          }
          return <meta key={tag.content + i} {...tagZ} />;
        })
        : defaultTags.map((tag, i) => {
          return <meta key={tag.content + i} {...tag} />;
        })}
    </Helmet>
  );
};

export class index extends Component {
  render() {
    return (
      <>
        <Tags title="Digital Present | Digital Agency" />
        <CanvasBG />
        {this.props.main.modelExploded ? <Homes /> : null}
        {/* <Homes /> */}
      </>
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
)(index);
