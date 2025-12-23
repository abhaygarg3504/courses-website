/* eslint-disable no-alert, no-console */

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CountryFlag from "../Data/CountryFlag";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import ContactField from "../Components/ContactField";

const Register = () => {
  const { authenticated } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    cnfPassword: "",
    country: "India",
  });

  const [btnCover, setBtnCover] = useState(false);

  const [res, setRes] = useState("");

  const location = useLocation();

  const [show, setShow] = useState(false);

  const [dropDown, setDropDown] = useState(false);

  const handleClick = () => {
    if (formData.password === formData.cnfPassword) {
      setBtnCover(true);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URI}/api/user/register`,
          formData,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          if (res.data === "success" && res.status === 200) {
            if (localStorage.getItem("cart")) {
              let courses = JSON.parse(localStorage.getItem("cart")).courses;
              let data = [];
              courses.forEach((elem) => {
                data.push(elem._id);
              });
              axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/api/cart/add/items`,
                { data: data },
                {
                  withCredentials: true,
                  headers: {
                    "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
                  },
                }
              );
            }
            window.location.href = "/email-confirmation";
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            setRes(err.response.data.message);
            setBtnCover(false);
          } else {
            toast.error("Some error occurred.Please try again later");
            setBtnCover(false);
          }
        });
    } else {
      setBtnCover(false);
      setRes("Password not matching.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Register to MGC</title>
        <meta
          name="description"
          content="Join MyGlobalConsultant and take the first step towards achieving your educational and professional goals. Sign in or create an account now to explore our courses and embark on a journey of lifelong learning."
        />
      </Helmet>
      <div
        className={`login w-full flex ${
          location.pathname === "/register" ? "pt-20 min-h-screen" : "py-10"
        } justify-center items-center`}
      >
        <div
          className={
            dropDown
              ? "w-screen h-screen z-[99] absolute top-0 left-0"
              : "hidden"
          }
          onClick={(e) => setDropDown(false)}
        ></div>
        <div className="register-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] border-gray-600 rounded-lg h-max p-4 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Register Now</h1>
          {location.pathname === "/cart" ? (
            <div className="text-xl font-bold flex justify-center register-dialogue items-center gap-4">
              YAY!! Its free{" "}
              <img
                src="images/1f389.png"
                className="w-10 h-10 object-contain"
                alt=""
              />
            </div>
          ) : (
            ""
          )}
          <p className="text-red-600 text-xs text-center my-1 w-full">{res}</p>
          <form
            className="flex w-full gap-6 flex-col items-center"
            onSubmit={(e) => {
              handleClick();
              e.preventDefault();
            }}
          >
            <div className="text flex flex-col relative w-full">
              <label
                className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                htmlFor="email"
              >
                Full Name
              </label>
              <input
                required
                value={formData.name}
                className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                type="text"
                name="full-name"
                id="full-name"
                placeholder="Your Name"
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <ContactField
              setFormData={setFormData}
              number={formData.number}
              country={formData.country}
            />
            <div className="email flex flex-col relative w-full">
              <label
                className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                value={formData.email}
                className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                onChange={(e) => {
                  setFormData((prev) => {
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
                htmlFor="password"
              >
                Password
              </label>
              <input
                required
                minLength={8}
                value={formData.password}
                className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                type={show ? "text" : "password"}
                autoFocus={false}
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setFormData((prev) => {
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
            <div className="confirm-password flex w-full flex-col relative">
              <label
                className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                required
                minLength={8}
                value={formData.cnfPassword}
                className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                type={show ? "text" : "password"}
                autoFocus={false}
                name="cnf-password"
                id="cnf-password"
                placeholder="Password"
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      cnfPassword: e.target.value,
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
            <div className="relative flex flex-col justify-center gap-2 items-center">
              <button
                className="px-3 py-2 relative w-48 rounded-full cur bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium"
                type="submit"
              >
                Create & Continue
              </button>
              <div
                className={
                  btnCover
                    ? "absolute cursor-wait bg-slate-100 bg-opacity-40 scale-110 w-full h-full top-0 left-0"
                    : "hidden"
                }
              />
              <p className="font-bold">or</p>
              <a
                href={`${process.env.REACT_APP_BACKEND_URI}/api/auth/google`}
                className="signInButton whitespace-nowrap py-2 w-fit border-gray-400 border-2 rounded-3xl flex gap-2 cursor-pointer items-center text-center text-sm font-medium px-8"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </a>
              <div className="flex justify-center gap-2">
                <div className="text-xs font-bold">
                  Already have an account?
                </div>
                <Link
                  className="font-bold text-xs text-sky-600 underline"
                  to="/login"
                >
                  Log-in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
