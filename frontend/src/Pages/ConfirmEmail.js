/* eslint-disable no-alert, no-console */

// imorting data
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ConfirmEmail = () => {
  // defining constants
  const [otp, setOtp] = useState("");
  const [res, setRes] = useState(null);
  const [user, setUser] = useState();
  const { authenticated } = useSelector((state) => state.authentication);
  const [wrongotp, setWrongotp] = useState(false);
  const [resendotp, setResendOTP] = useState(false);
  const [btnCover, setBtnCover] = useState(false);

  // getting user info if user is authenticated else redirect to login page
  const userInfo = async () => {
    if (authenticated) {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/user/info`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          toast.error("Some error occurred");
          window.href.location = "/login";
        });
    }
  };

  // calling userInfo function each time authentication changed
  useEffect(() => {
    userInfo();
  });

  // function to resend otp
  const resendOTP = () => {
    setBtnCover(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/email/resend/otp`, {
        withCredentials: true,
        headers: {
          "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((res) => {
        setWrongotp(false);
        setResendOTP(true);
        setRes(res.data.message);
        setBtnCover(false);
      })
      .catch((err) => {
        setResendOTP(false);
        setWrongotp(true);
        setRes("OOPS some error occured.");
        setBtnCover(false);
      });
  };

  // function to submit form
  const handleClick = () => {
    setBtnCover(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/api/email/verification`,
        {
          otp: otp,
        },
        {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((res) => {
        //  if success redirect to homepage
        if (res.status === 200) {
          setBtnCover(false);
          window.location.href = "/";
        } else {
          if (err.status === 400) {
            setRes(err.response.data.message);
            setBtnCover(false);
          }
        }
      })
      .catch((err) => {
        // if any error occur show button and set wrong otp
        toast.error("Some error occurred. Please try again later");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    // page content start here
    <div className="login w-full flex  justify-center items-center py-40">
      {/* setting meta tags */}
      <Helmet>
        <title>Confirm your email</title>
      </Helmet>

      {/*Form container for email verification*/}
      <div className="otp-box border-[1px] w-[95%] m-auto sm:w-[450px] bg-gray-50 border-gray-600 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-lg h-max p-6 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Confirm your email</h1>

        {/* message if any warning occur */}
        <p
          className={wrongotp ? "text-red-600 text-sm font-medium " : "hidden"}
        >
          * {res}
        </p>
        {/* message if otp is resended */}
        <p
          className={
            resendotp ? "text-green-600 text-sm font-medium " : "hidden"
          }
        >
          * {res}
        </p>

        <p className="text-xs font-medium text-gray-600 text-center">
          Please enter the One-Time Password (OTP) we have sent to email address{" "}
          <span className="font-bold text-black">{user}</span>
        </p>

        {/* Form starts here */}
        <form
          className="flex w-full gap-6 flex-col items-center"
          id="forget-password"
          // call handleClick function if form is submitted
          onSubmit={(e) => {
            handleClick();
            e.preventDefault();
          }}
        >
          {/* input to enter otp */}
          <div className="otp flex flex-col relative w-full">
            <label
              className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              required
              value={otp}
              className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
              type="number"
              name="otp"
              id="otp"
              minLength={6}
              maxLength={6}
              placeholder="465986"
              onChange={(e) => {
                setOtp(e.target.value); // setOtp constant if otp is changed
              }}
            />
          </div>

          {/* Button to resend otp */}
          <p className="text-xs relative text-gray-600 font-medium text-right w-full ">
            <span
              onClick={resendOTP}
              className="hover:text-red-600 cursor-pointer hover:underline"
            >
              Resend OTP
            </span>
            {/* Cover button if form is processing */}
            <span
              className={
                btnCover
                  ? "absolute cursor-wait bg-slate-100 bg-opacity-40 scale-110 w-full h-full top-0 left-0"
                  : "hidden"
              }
            ></span>
          </p>

          {/* submit button to submit the form */}
          <div className="relative">
            <button
              className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="submit"
            >
              Submit
            </button>
            {/* Cover button if form is processing */}
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
    // main content ends here
  );
};

export default ConfirmEmail;
