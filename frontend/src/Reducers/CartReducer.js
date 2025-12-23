const initialState = {
  courses: [],
  length: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART_DATA":
      return {
        ...state,
        courses: action.payload.data,
        length: action.payload.length,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        courses: action.payload,
        length: state.length + 1,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        courses: action.payload,
        length: state.length - 1,
      };
    case "ADD_TO_DB":
      return {
        ...state,
        courses : state.courses.concat(action.payload),
        length: state.length + 1,
      };
    case "REMOVE_FROM_DB":
      return {
        ...state,
        courses : state.courses.filter(obj=>{
          return obj._id !== action.payload
        }),
        length: state.length - 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
