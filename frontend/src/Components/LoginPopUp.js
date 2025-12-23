/* eslint-disable no-alert, no-console */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { userAuhtentication } from "../Actions/UserAuthetication";
import toast from "react-hot-toast";

const defaultProps = {
  showPopUp: false,
};

const LoginPopUp = ({
  showPopUp = defaultProps.showPopUp,
  setShowPopUp,
  setRegisterPopUp,
  setSchedulePopUp,
  setLoginPopUp,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [resStatus, setResStatus] = useState(false);
  const [btnCover, setBtnCover] = useState(false);

  const handleClick = () => {
    setBtnCover(true);
    axios({
      method: "post",
      data: form,
      url: `${process.env.REACT_APP_BACKEND_URI}/api/user/login`,
      withCredentials: true,
      headers: {
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Login Successfull");
          setSchedulePopUp(true);
          setLoginPopUp(false);
          dispatch(userAuhtentication());
        } else {
          setResStatus(true);
          setBtnCover(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log("some error occurred");
        }
        toast.error("Some Error occurred. Please try again later.");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      });
  };

  const [show, setShow] = useState(false);
  return (
    <div
      className={
        showPopUp
          ? "bg-zinc-800 fixed  duration-500 flex justify-center items-center top-0 left-0 h-screen  overflow-y-scroll w-screen z-[9999] bg-opacity-50"
          : "hidden"
      }
    >
      <div
        className="backdrop absolute top-0 left-0 w-full h-full"
        onClick={(e) => setShowPopUp(false)}
      ></div>
      <div className="lg:grid lg:grid-cols-2 relative bg-white rounded-lg w-[95%] sm:w-fit lg:w-[1000px] m-auto lg:py-10">
        <div
          className="close-icon absolute top-2 right-2 bg-white font-medium z-[999] h-6 w-6 border-2 cursor-pointer border-black rounded-full flex justify-center items-center"
          onClick={(e) => setShowPopUp(false)}
        >
          <IoMdClose />
        </div>
        <div className="hidden lg:block">
          <div className="border-[1px] w-[95%] m-auto sm:w-[450px] h-full px-4 bg-gray-50 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] border-gray-600 rounded-lg p-4 flex flex-col justify-start gap-2">
            <h2 className="text-2xl font-bold mb-8 text-center ">
              Welcome Back
            </h2>
            <ul className=" list-disc ml-4 gap-4">
              <li className="pb-2">
                <h3 className="text-xl font-medium">Explore 80000+ Courses</h3>
              </li>
              <li className="pb-2">
                <h3 className="text-xl font-medium pb-2">
                  Apply in just three steps
                </h3>
                <ul className="pl-4">
                  <li>1. Search any course.</li>
                  <li>2. Cart your favourite course.</li>
                  <li>3. Apply in them with the help of our team.</li>
                </ul>
              </li>
              <li className="pb-2">
                <h3 className="text-xl font-medium">Free Councelling</h3>
              </li>
            </ul>
            <img
              className="h-32 mt-8 object-contain"
              src="/images/site-logo.jpg"
              alt="site-logo"
            />
          </div>
        </div>
        <div className={`relative lg:px-4`}>
          <div className="login-box h-full border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg p-6 flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <p
              className={
                resStatus ? "text-red-600 text-sm font-medium " : "hidden"
              }
            >
              * Email or password is incorrect !
            </p>
            <form
              id="login-form"
              className="flex w-full gap-6 flex-col items-center"
              onSubmit={(e) => {
                handleClick();
                e.preventDefault();
              }}
            >
              <div className="email flex flex-col relative w-full">
                <label
                  className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                  htmlFor="login-email"
                >
                  Email
                </label>
                <input
                  required
                  value={form.email}
                  className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                  type="email"
                  name="email"
                  id="login-email"
                  placeholder="Email"
                  onChange={(e) => {
                    setForm((prev) => {
                      return {
                        ...prev,
                        email: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="password flex w-full flex-col relative">
                <label
                  className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                  htmlFor="login-password"
                >
                  Password
                </label>
                <input
                  required
                  value={form.password}
                  autoComplete="off"
                  className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                  type={show ? "text" : "password"}
                  autoFocus={false}
                  name="password"
                  id="login-password"
                  placeholder="Password"
                  onChange={(e) => {
                    setForm((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    });
                  }}
                />
                <span
                  className="absolute right-4 cursor-pointer h-full flex items-center "
                  onClick={(e) => setShow(!show)}
                >
                  {show ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium text-right w-full ">
                <a
                  href="/forget"
                  className="hover:text-red-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
              <div className="relative">
                <button
                  className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
                  type="submit"
                >
                  Login
                </button>
                <span
                  className={
                    btnCover
                      ? "absolute cursor-wait bg-slate-100 bg-opacity-40 scale-110 w-full h-full top-0 left-0"
                      : "hidden"
                  }
                ></span>
              </div>
              {/* <p className="text-sm font-medium text-center w-full">or</p> */}
            </form>
            {/* <a
            href={`${process.env.REACT_APP_BACKEND_URI}/api/auth/google`}
            className="signInButton whitespace-nowrap py-2 w-fit border-gray-400 border-2 rounded-3xl flex gap-2 cursor-pointer items-center text-center text-sm font-medium px-8"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </a> */}
            <div className="flex justify-center gap-2">
              <div className="text-xs font-bold">Don't have an account?</div>
              <button
                className="font-bold text-xs text-sky-600 underline"
                onClick={(e) => {
                  setRegisterPopUp(true);
                  setLoginPopUp(false);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;
