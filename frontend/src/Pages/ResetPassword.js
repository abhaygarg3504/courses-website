/* eslint-disable no-alert, no-console */

import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [btnCover, setBtnCover] = useState(false);
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });
  const location = useLocation();
  const [wrongPassword, setWrongPassword] = useState(false);
  const [show, setShow] = useState(0);

  const handleClick = () => {
    if (form.new_password === form.confirm_password) {
      setBtnCover(true);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URI}/api/user/reset/password`,
          {
            password: form.confirm_password,
            id: location.search,
          },
          {
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            toast.success("Password Changed");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          } else {
            console.log(res.data);
            setBtnCover(false);
          }
        })
        .catch((err) => {
          toast.error("Some error occurred.Please try again later");
          setBtnCover(false);
        });
    } else {
      setBtnCover(false);
      setWrongPassword(true);
    }
  };
  return (
    <div className="login w-full flex  justify-center items-center py-40">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="login-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg h-max p-6 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Forget Password</h1>
        <p
          className={
            wrongPassword ? "text-red-600 text-sm font-medium " : "hidden"
          }
        >
          * Password do not match.
        </p>
        <form
          className="flex w-full gap-6 flex-col items-center"
          id="forget-password"
          onSubmit={(e) => {
            handleClick();
            e.preventDefault();
          }}
        >
          <div className="password flex w-full flex-col relative">
            <label
              className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
              htmlFor="new-password"
            >
              New Password
            </label>
            <input
              minLength={8}
              required
              value={form.new_password}
              autoComplete="off"
              className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
              type={show === 1 ? "text" : "password"}
              autoFocus={false}
              name="password"
              id="new-password"
              placeholder="New Password"
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    new_password: e.target.value,
                  };
                });
              }}
            />
            <span
              className="absolute right-4 cursor-pointer h-full flex items-center "
              onClick={(e) => setShow(show !== 0 ? 0 : 1)}
            >
              {show === 1 ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <div className="password flex w-full flex-col relative">
            <label
              className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
              htmlFor="new-password"
            >
              Confirm Password
            </label>
            <input
              minLength={8}
              required
              value={form.confirm_password}
              autoComplete="off"
              className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
              type={show === 2 ? "text" : "password"}
              autoFocus={false}
              name="confirm_password"
              id="confirm-password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    confirm_password: e.target.value,
                  };
                });
              }}
            />
            <span
              className="absolute right-4 cursor-pointer h-full flex items-center "
              onClick={(e) => setShow(show !== 0 ? 0 : 2)}
            >
              {show === 2 ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <div className="relative">
            <button
              className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="submit"
            >
              Reset
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
      </div>
    </div>
  );
};

export default ResetPassword;
