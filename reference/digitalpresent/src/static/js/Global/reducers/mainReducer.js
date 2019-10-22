export const initialState = {
  bottom: false,
  data: {
    blog: [],
    studies: [],
    people: [],
    services: [],
    loaded: false
  },
  modal: false,
  transitionLink: false,
  modelLoaded: false,
  modelExploded: false
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL":
      let modalState = {};
      if (action.payload === true) {
        if (state.modal) {
          modalState = {
            ...state,
            modal: false
          };
        } else {
          modalState = {
            ...state,
            modal: true
          };
        }
      } else {
        modalState = {
          ...state,
          modal: action.payload
        };
      }
      return modalState;
    case "SET_BOTTOM":
      const itemState = {
        ...state,
        bottom: action.payload
      };
      return itemState;
    case "SET_MODEL_EXPLODED":
      const modelExploded = {
        ...state,
        modelExploded: action.payload
      };
      return modelExploded;
    case "SET_MODEL":
      const modelState = {
        ...state,
        modelLoaded: true
      };
      return modelState;
    case "TRANSITION_LINK":
      const transitionLink = {
        ...state,
        transitionLink: action.payload
      };
      return transitionLink;
    case "SET_POSTS":
      const posts = {
        ...state,
        data: action.payload
      };
      return posts;
    default:
      return state;
  }
};
