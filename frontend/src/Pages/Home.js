/* eslint-disable no-alert, no-console */

import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCartData } from "../Actions/CartActions";
import { Helmet } from "react-helmet";
import SearchCourse from "../Components/SearchCourse";
import toast from "react-hot-toast";

const Home = () => {
  // defining constants
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  const { courses } = useSelector((state) => state.cart);

  // adding item to cart if user login for first time
  async function manageCart() {
    if (authenticated && courses.length === 0) {
      if (localStorage.getItem("cart")) {
        let data = [];
        let courses = JSON.parse(localStorage.getItem("cart")).courses;
        courses.forEach((course) => {
          data.push(course._id);
        });
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URI}/api/cart/add/items`,
            { data: data },
            {
              withCredentials: true,
              headers: {
                "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              dispatch(fetchCartData(authenticated));
            }
          })
          .catch((err) => {
            toast.error("Some error occurred");
            console.log(err);
          });
      }
    }
  }

  // calling cart function if authentication changed
  useEffect(() => {
    manageCart();
  }, [authenticated]);

  return (
    <>
      {/* changing meta data */}
      <Helmet>
        <title>MyGlobalConsultant-Home</title>
        <meta
          name="description"
          content="At MyGlobalConsultant, we're dedicated to making the process of finding and applying for courses abroad as seamless and straightforward as possible. Whether you're dreaming of studying at a prestigious university in Europe, pursuing a specialized program in Asia, or immersing yourself in a cultural exchange opportunity in South America, we're here to help you turn your educational aspirations into reality."
        />
      </Helmet>

      {/* Cookies Permission */}

      {/* Cookies permission section ends here */}

      {/* hero section starts here */}
      <div className="hero-section w-full relative h-fit pt-16 sm:pt-32">
        <div className="w-full">
          <div className="h-min p-6 flex flex-col justify-center w-full items-center">
            <h1 className="text-xl sm:text-3xl text-center   relative font-bold w-full capitalize">
              Explore the courses worldwide
            </h1>
            <div className="text-sm sm:text-lg py-2 text-center">
              Apply for your dream university in 3 simple steps
            </div>
          </div>
          <SearchCourse />
        </div>
      </div>
      {/* hero section ends here */}
    </>
  );
};

export default Home;
