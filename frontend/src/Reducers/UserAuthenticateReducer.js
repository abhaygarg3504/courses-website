const initialState = {
  authenticated: null,
  error: null,
};

const UserAuthentication = (state = initialState, action) => {
  switch (action.type) {
    case "USER_AUTHENTICATION_SUCCESS":
      return {
        authenticated: action.payload,
        error: null,
      };
    case "USER_AUTHENTICATION_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default UserAuthentication;
