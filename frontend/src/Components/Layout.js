/* eslint-disable no-alert, no-console */

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Preloader from "./Preloader";
import Notify from "../Notifications/Notify";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import {Toaster} from 'react-hot-toast'
import { dataLoading } from "../Actions/LoaderAction";

const Layout = () => {
  const { progress } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const onPageLoad = () => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => {
        window.removeEventListener("load", onPageLoad, false);
      };
    }
  }, []);

  useEffect(() => {
    dispatch(dataLoading(60));
    setTimeout(() => {
      dispatch(dataLoading(100));
    }, [200]);
  }, [location.pathname]);

  return (
    <>
      <LoadingBar
        color="#1976D2"
        height={3}
        shadow={false}
        progress={progress}
        transitionTime={500}
        loaderSpeed={0.2}
      />
      <div className="preloader" id="preloader">
        <Preloader />
      </div>
      <div className="layout content hidden" id="content">
        <Navbar />
        <Outlet />
        <Footer />
        <Notify />
        <div><Toaster position="bottom-center"/></div>
      </div>
    </>
  );
};

export default Layout;
