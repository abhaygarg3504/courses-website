/* eslint-disable no-alert, no-console */

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const { authenticated } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [resStatus, setResStatus] = useState(false);
  const [btnCover, setBtnCover] = useState(false);

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  });

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
          toast.success("Welcome Back");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
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
          window.location.href("/");
        }, 1000);
      });
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <Helmet>
        <title>Login to MGC</title>
        <meta
          name="description"
          content="Join MyGlobalConsultant and take the first step towards achieving your educational and professional goals. Sign in or create an account now to explore our courses and embark on a journey of lifelong learning."
        />
      </Helmet>
      <div className="login min-h-screen w-full flex  justify-center items-center pt-20">
        <div className="login-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg h-max p-6 flex flex-col items-center gap-4">
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
              <a href="/forget" className="hover:text-red-600 hover:underline">
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
            <p className="text-sm font-medium text-center w-full">or</p>
          </form>
          <a
            href={`${process.env.REACT_APP_BACKEND_URI}/api/auth/google`}
            className="signInButton whitespace-nowrap py-2 w-fit border-gray-400 border-2 rounded-3xl flex gap-2 cursor-pointer items-center text-center text-sm font-medium px-8"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </a>
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
    </>
  );
};

export default Login;
