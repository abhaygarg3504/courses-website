import axios from "axios";

export const adminAuthenticationSuccess = (authenticate) => ({
  type: "USER_AUTHENTICATION_SUCCESS",
  payload: authenticate,
});

export const adminAuthenticationError = (error) => ({
  type: "USER_AUTHENTICATION_FAILURE",
  payload: error,
});

export const adminAuthentication = () => async (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URI}/api/authenticate/admin`, {
      withCredentials: true,
      headers : {
        "X-API-KEY" :`${process.env.REACT_APP_API_KEY}`
      }
    })
    .then((res) => {
      dispatch(adminAuthenticationSuccess(true));
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 400) {
        dispatch(adminAuthenticationError(err.response.data.message));
      } else {
        dispatch(adminAuthenticationError(err.message));
      }
      console.log(err.message);
    });
};