/* eslint-disable no-alert, no-console */

// importing elements
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import ContactField from "../Components/ContactField";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNumber = () => {
  // defining constants
  const [btnCover, setBtnCover] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.authentication);
  const [formData, setFormData] = useState({
    number: "",
    country: "India",
  });

  // function if user click submit
  const handleSubmit = (e) => {
    setBtnCover(true);
    e.preventDefault();
    if (authenticated) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URI}/api/user/info/add-number`,
          formData,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/apply";
          }
        })
        .catch((err) => {
          // if error show to console and set btn cover false
          setBtnCover(false);
          if (err.response && err.response.status === 409) {
            setMessage(err.response.data.message);
          } else {
            toast.error("Some error occured. Please try again later.");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        });
    }
  };

  //funtion to get user info
  function userInfo() {
    if (authenticated) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/user/info/contact`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/";
          }
        });
    }
  }

  // run userinfo function each time authentication changed
  useEffect(() => {
    userInfo();
  }, authenticated);

  return (
    <div className="login w-full flex  justify-center items-center py-40">
      {/* meta tag change start her */}
      <Helmet>
        <title>Add your number</title>
      </Helmet>
      {/* meta tag change ends here */}

      {/* Form container starts here */}
      <div className="login-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg h-max p-6 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Add your number</h1>

        {/* show warning if any */}
        <p
          className={
            message !== null ? "text-red-600 text-sm font-medium " : "hidden"
          }
        >
          {message}
        </p>

        {/* form starts here */}

        <form
          className="flex w-full gap-6 flex-col items-center"
          id="forget-password"
          // call handle submit function if user click handle submit
          onSubmit={handleSubmit}
        >
          <ContactField
            number={formData.number}
            setFormData={setFormData}
            country={formData.country}
          />

          {/* Submit button */}

          <div className="relative">
            <button
              className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="submit"
            >
              Submit
            </button>
            <span
              className={
                btnCover
                  ? "absolute cursor-wait bg-slate-100 bg-opacity-40 scale-110 w-full h-full top-0 left-0"
                  : "hidden"
              }
            ></span>
          </div>
        </form>
        {/* Form ends here */}
      </div>
    </div>
    // Form container ends here
  );
};

export default AddNumber;
