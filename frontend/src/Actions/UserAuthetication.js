import axios from "axios";

export const userAuthenticationSuccess = (authenticate) => ({
  type: "USER_AUTHENTICATION_SUCCESS",
  payload: authenticate,
});

export const userAuthenticationError = (error) => ({
  type: "USER_AUTHENTICATION_FAILURE",
  payload: error,
});

export const userAuhtentication = () => async (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URI}/api/authenticate/user`, {
      withCredentials: true,
      headers: {
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
      },
    })
    .then((res) => {
      if (res.data.status) {
        dispatch(userAuthenticationSuccess(true));
      } else {
        dispatch(userAuthenticationError(res.data.message));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(userAuthenticationError(err.response.data));
      } else {
        console.log("some error occurred");
      }
    });
};
