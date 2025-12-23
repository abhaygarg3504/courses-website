const initialState = {
  progress: 0,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};

export default loaderReducer;
