// importing data
import React, { useEffect, useState } from "react";
import ScheduleCall from "./ScheduleCall";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

const Apply = () => {
  // defining constants
  const { authenticated } = useSelector((state) => state.authentication);
  const location = useLocation();
  const navigate = useNavigate();

  // Checking if user is authenticated or not
  useEffect(() => {
    if (!authenticated) {
        navigate("/");
    }
  }, [authenticated]);

  return (
    <>
      {/* changing meta data */}
      <Helmet>
        <title>Apply to different courses.</title>
        <meta
          name="description"
          content="Apply with us to different courses provided by countries worldwide enjoys perks of working with us."
        />
      </Helmet>
      {/* meta data change complete */}

      {/* Page content starts here */}
      {<div className="py-20 min-h-[600px]">
        <div className="w-full border-b-2 border-gray-400 relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative w-1/2">
            <h1 className="text-6xl relative z-10 font-semibold w-4/5 text-black">
              Apply
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
            {`Home > Apply`}
          </div>
        </div>
        <div className="congratualtion-wrapper flex flex-col gap-8 items-center justify-center py-20">
          <div className="w-24 h-24 bg-green-500 rounded-full grid place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              fill="white"
              y="0px"
              width="80"
              height="80"
              viewBox="0 0 50 50"
              className="rotate-[15deg]"
            >
              <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
            </svg>
          </div>
          <span className="text-3xl sm:text-5xl font-semibold">Congratulation!!</span>
          <div className="px-3">
            <h3 className="text-center text-lg font-medium py-2">Application Submitted Successfully</h3>
            <p className="py-2">
              Our team will now handle all necessary processes. You will be
              notified of any updates regarding your application via email.
            </p>
            If you have any questions or need further assistance, please feel
            free to contact us at <a className="text-sky-600 hover:underline" href="mailto:info@myglobalconsultant.com">info@myglobalconsultant.com</a>.
          </div>
        </div>
        <p className="text-center mb-10 text-lg font-medium">
          Fill the below form if you want to hire a free councellor.
        </p>
        {/* Component for scheduling call */}
        <ScheduleCall reason="Hire councellor" />
      </div>}
      {/* Page content ends here */}
    </>
  );
};

export default Apply;
