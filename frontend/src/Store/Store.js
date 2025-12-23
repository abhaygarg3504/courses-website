import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Reducers/CartReducer";
import UserAuthentication from "../Reducers/UserAuthenticateReducer";
import cartActivites from "../Reducers/CartActivities";
import showNotification from "../Reducers/NotificationReducer";
import loaderReducer from "../Reducers/LoaderReducer";
import AdminAuthentication from "../Reducers/AdminAuthenticationReducer";
import footerReducer from "../Reducers/FooterReducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
    cartShow : cartActivites,
    authentication : UserAuthentication,
    notify : showNotification,
    loader : loaderReducer,
    adminAuthentication : AdminAuthentication,
    footer:footerReducer
  },
});
