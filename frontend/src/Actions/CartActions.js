import axios from "axios";
import toast from "react-hot-toast";

export const addToCart = (product_data) => ({
  type: "ADD_TO_CART",
  payload: product_data,
});

export const removeFromCart = (product_data) => ({
  type: "REMOVE_FROM_CART",
  payload: product_data,
});

export const addToDB = (product_data) => ({
  type: "ADD_TO_DB",
  payload: product_data,
});

export const removeFromDB = (product_data) => ({
  type: "REMOVE_FROM_DB",
  payload: product_data,
});

export const cartActions = (action) => ({
  type: action,
});

export const cartData = (data, length) => ({
  type: "FETCH_CART_DATA",
  payload: {
    data: data,
    length: length,
  },
});

export const fetchCartData = (authenticated) => async (dispatch) => {
  try {
    if (authenticated) {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/api/cart`,
        {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      let length = response.data.courses.length;
      dispatch(cartData(response.data.courses, length));
    } else {
      if(localStorage.getItem("cart")){
        const courses = JSON.parse(localStorage.getItem("cart")).courses;
        let length = courses.length;
        dispatch(cartData(courses, length));
      }
    }
  } catch (error) {
    toast.error("Unable to change cart.");
    console.log(error);
  }
};

export const updateAddedCart =
  (authenticated, product_data) => async (dispatch) => {
    try {
      if (authenticated) {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACKEND_URI}/api/cart/add?id=${product_data._id}`,
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            dispatch(addToDB(product_data));
          }
          if (res.status === 201) {
            dispatch(removeFromDB(product_data._id));
          }
        });
      } else {
        let courses = [];
        if (localStorage.getItem("cart")) {
          courses = JSON.parse(localStorage.getItem("cart")).courses;
          if (courses.findIndex((obj) => obj._id === product_data._id) === -1) {
            courses.push(product_data);
            localStorage.setItem("cart", JSON.stringify({ courses: courses }));
            dispatch(addToCart(courses));
          } else {
            courses.splice(
              courses.findIndex((obj) => obj._id === product_data._id),
              1
            );
            localStorage.setItem("cart", JSON.stringify({ courses: courses }));
            dispatch(removeFromCart(courses));
          }
        } else {
          courses.push(product_data);
          localStorage.setItem("cart", JSON.stringify({ courses: courses }));
          dispatch(addToCart(courses));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteCartItem =
  (authenticated, product_id) => async (dispatch) => {
    if (authenticated) {
      try {
        axios.get(
          `${process.env.REACT_APP_BACKEND_URI}/api/cart/delete?id=${product_id}`,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        );
        dispatch(removeFromDB(product_id));
      } catch (error) {
        console.log(error);
      }
    } else {
      let courses = JSON.parse(localStorage.getItem("cart")).courses;
      courses.splice(
        courses.findIndex((obj) => obj._id === product_id),
        1
      );
      localStorage.setItem("cart", JSON.stringify({ courses: courses }));
      dispatch(removeFromCart(courses));
    }
  };
