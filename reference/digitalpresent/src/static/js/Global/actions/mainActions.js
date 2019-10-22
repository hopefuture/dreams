const blogApi = "https://insights.digitalpresent.io/wp-json/wp/v2/";
const apiLinks = [
  "case-studies",
  "posts?per_page=20",
  "people",
  "services",
  "testimonials",
  "clients"
];

export const setBottom = input => dispatch => {
  dispatch({
    type: "SET_BOTTOM",
    payload: input
  });
};

export const modalTrigger = input => dispatch => {
  if (input === "apply") {
    dispatch({
      type: "SET_MODAL",
      payload: input
    });
  } else {
    dispatch({
      type: "SET_MODAL",
      payload: true
    });
  }
};

export const modelLoaded = input => dispatch => {
  dispatch({
    type: "SET_MODEL",
    payload: input
  });
};

export const modelExploded = input => dispatch => {
  dispatch({
    type: "SET_MODEL_EXPLODED",
    payload: input
  });
};

export const transitionLink = input => dispatch => {
  dispatch({
    type: "TRANSITION_LINK",
    payload: true
  });
  setTimeout(() => {
    dispatch({
      type: "TRANSITION_LINK",
      payload: false
    });
  }, 500);
};

export const fetchPosts = input => async dispatch => {
  let results = [];
  results = await Promise.all(
    apiLinks.map(link => fetch(blogApi + link).then(res => res.json()))
  );
  const payload = {
    blog: results[1],
    studies: results[0],
    people: results[2],
    services: results[3],
    testimonials: results[4],
    clients: results[5],
    loaded: true
  };
  console.log(payload);
  
  dispatch({
    type: "SET_POSTS",
    payload: payload
  });
};
