import React, { useEffect, useState } from "react";
import Preloader from "../Components/Preloader";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import axios from "axios";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
      }, 500);
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

  return (
    <>
      <div className="preloader" id="preloader">
        <Preloader />
      </div>
      <div className="layout content hidden" id="content">
        <Navbar />
        <Outlet />
        <Footer />
        <div><Toaster position="bottom-center"/></div>
      </div>
    </>
  );
};

export default AdminLayout;
