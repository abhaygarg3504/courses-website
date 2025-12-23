/* eslint-disable no-alert, no-console */

import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [btnCover, setBtnCover] = useState(false);

  const handleClick = () => {
    setBtnCover(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/api/email/forgot/password`,
        {
          email: email,
        },
        {
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((res) => {
        toast.success("Email Sent");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        toast.error("Some error occurred. Please try again later.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <div className="login w-full flex  justify-center items-center py-40">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="login-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg h-max p-6 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Reset your Password</h1>
        <p
          className={
            wrongEmail ? "text-red-600 text-sm font-medium " : "hidden"
          }
        >
          * Email is incorrect !
        </p>
        <form
          className="flex w-full gap-6 flex-col items-center"
          id="forget-password"
          onSubmit={(e) => {
            handleClick();
            e.preventDefault();
          }}
        >
          <div className="email flex flex-col relative w-full">
            <label
              className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              value={email}
              className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
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
        <div className="flex justify-center gap-2">
          <div className="text-xs font-bold">Don't have an account?</div>
          <Link
            className="font-bold text-xs text-sky-600 underline"
            to="/register"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
