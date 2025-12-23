import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAuthentication } from "../Actions/AdminAuthentication";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [resError, setResError] = useState(false);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.adminAuthentication);

  const handleClick = () => {
    axios({
      method: "post",
      data: form,
      url: `${process.env.REACT_APP_BACKEND_URI}/api/admin/login`,
      withCredentials: true,
      headers: {
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        dispatch(adminAuthentication());
        navigate("/auth/dashboard");
      })
      .catch((err) => {
        setResError(true);
      });
  };

  useEffect(() => {
    if (authenticated) {
      navigate("/auth/dashboard");
    }
  }, [authenticated]);

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="Adminlogin min-h-screen w-full flex  justify-center items-center pt-40">
        <div className="Adminlogin-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg h-max p-6 flex flex-col items-center gap-8">
          <div className="text-2xl font-bold">Login</div>
          <p
            className={
              resError ? "text-red-600 text-sm font-medium " : "hidden"
            }
          >
            * Email or password is incorrect !
          </p>
          <form
            id="Adminlogin-form"
            className="flex w-full gap-6 flex-col items-center"
            onSubmit={(e) => {
              handleClick();
              e.preventDefault();
            }}
          >
            <div className="email flex flex-col relative w-full">
              <label
                className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                htmlFor="Adminlogin-email"
              >
                Email
              </label>
              <input
                required
                value={form.username}
                className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                type="text"
                name="email"
                id="Adminlogin-email"
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
                htmlFor="Adminlogin-password"
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
                id="Adminlogin-password"
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
            <button
              className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
