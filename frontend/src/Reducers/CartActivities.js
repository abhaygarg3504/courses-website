const intialState = {
  show: false,
};

export default function cartActivites(state = intialState, action) {
  switch (action.type) {
    case "SHOW_CART":
      return {
        ...state,
        show: true,
      };
    case "HIDE_CART":
      return {
        ...state,
        show: false,
      };
    case "TOOGLE_CART":
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state
  }
}
