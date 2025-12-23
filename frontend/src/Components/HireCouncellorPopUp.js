/* eslint-disable no-alert, no-console */

import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../Data/FilterData.js";
import ContactField from "../Components/ContactField";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Autocomplete } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const defaultProps = {
  showPopUp: false,
  reason: "Hire councellor",
};

const HireCouncellorPopUp = ({
  showPopUp = defaultProps.showPopUp,
  setShowPopUp,
  setSchedulePopUp,
  reason = defaultProps.reason,
}) => {
  const [btnCover, setBtnCover] = useState(false);
  const { authenticated } = useSelector((state) => state.authentication);
  const [showDate, setShowDate] = useState(false);
  const [numberAdded, setNumberAdded] = useState(true);
  const [warning, setWarning] = useState("");
  const [showShift, setShowShift] = useState(false);
  const [value, setValue] = useState(new Date());
  const [formData, setFormData] = useState({
    country: "India",
    number: "",
    date: "",
    shift: "",
    foreignCountry: "",
    reason: "Hire councellor",
  });

  const handleShift = (e) => {
    setShowDate(false);
    setShowShift(false);
    setFormData((prev) => {
      return {
        ...prev,
        shift: e.target.innerHTML,
      };
    });
  };

  const handleDate = (e) => {
    setShowDate(false);
    setShowShift(false);
    setValue(e);
    setFormData((prev) => {
      return {
        ...prev,
        date:
          e.getDate().toString() +
          "-" +
          (e.getMonth() + 1).toString() +
          "-" +
          e.getFullYear().toString(),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date !== "" && formData.shift !== "") {
      setBtnCover(true);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URI}/api/schedule/meeting`,
          { formData },
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setShowPopUp(false);
          setSchedulePopUp(false);
          setBtnCover(false);
        })
        .catch((err) => {
          toast.error("Some unknown error occurred.");
          setTimeout(() => {
            setBtnCover(false);
          }, 500);
        });
    } else {
      setWarning("*Please Select Date and Shift.");
    }
  };

  const resetAll = () => {
    setFormData((prev) => {
      return {
        ...prev,
        date: "",
        shift: "",
        country: "India",
        foreignCountry: "",
        number: "",
      };
    });
  };

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
          if (res.data.success) {
            setNumberAdded(true);
          } else {
            setNumberAdded(false);
          }
        })
        .catch((err) => {
          toast.error("Some unknown error occurred.");
          console.log("OOPS some error occurred. Please try again later");
          setNumberAdded(false);
        });
    } else {
      setNumberAdded(false);
    }
  }

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        reason: reason,
      };
    });
  }, [reason]);

  useEffect(() => {
    userInfo();
  }, authenticated);

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
          <div
            className={` border-[1px] w-[95%] h-full m-auto sm:w-[450px] bg-gray-50 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] border-gray-600 rounded-lg p-4 flex flex-col items-center gap-2`}
          >
            <h1 className="font-medium text-lg pb-8">Hire a free Councelor</h1>
            <p className="text-xs text-left text-red-600">{warning}</p>
            <form
              onSubmit={handleSubmit}
              className="w-full h-fit flex flex-col gap-4"
            >
              <div className="w-full contact-info">
                {!numberAdded && (
                  <>
                    <div className="contact-number py-2">
                      <ContactField
                        setFormData={setFormData}
                        number={formData.number}
                        country={formData.country}
                      />
                    </div>
                  </>
                )}
                <div className="country w-full pb-2">
                  <p className="py-2">Country you're interested in</p>
                  <Autocomplete
                    style={{
                      width: "100%",
                      zIndex: 999,
                    }}
                    disablePortal
                    sx={{
                      display: "inline-block",
                      "& input": {
                        width: "100%",
                        color: (theme) =>
                          theme.palette.getContrastText(
                            theme.palette.background.paper
                          ),
                      },
                    }}
                    onChange={(event, value) =>
                      setFormData((state) => {
                        return {
                          ...state,
                          foreignCountry: value || "",
                        };
                      })
                    }
                    value={formData.foreignCountry || null}
                    id="custom-input-demo"
                    options={data.Country}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <input
                          type="text"
                          style={{
                            padding: "7px 11px",
                            width: "100%",
                            borderWidth: "2px",
                            borderColor: "rgb(156 163 175)",
                            outline: "none",
                            borderRadius: "6px",
                            fontWeight: "500",
                          }}
                          placeholder="Canada"
                          {...params.inputProps}
                        />
                      </div>
                    )}
                  />
                </div>
                <h3 className="font-medium pb-4">Schedule</h3>
                <div
                  className="border-[2px] cursor-pointer border-gray-400 w-fit rounded-md px-4 py-2 font-medium hover:text-sky-600"
                  onClick={(e) => {
                    setShowDate(true);
                    setShowShift(false);
                  }}
                >
                  {formData.date === "" ? "Select Date" : formData.date}
                </div>
                <div className="pt-4">
                  <div
                    className="border-[2px] cursor-pointer w-fit border-gray-400 rounded-md px-4 py-2 font-medium hover:text-sky-600"
                    onClick={(e) => {
                      setShowDate(false);
                      setShowShift(true);
                    }}
                  >
                    {formData.shift === "" ? "Select Slot" : formData.shift}
                  </div>
                </div>
                <div
                  className={
                    showDate || showShift
                      ? "fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-[9999]"
                      : "hidden"
                  }
                >
                  <div
                    className="bg-black bg-opacity-45 absolute h-full w-full"
                    onClick={(e) => {
                      setShowDate(false);
                      setShowShift(false);
                    }}
                  />
                  <div className="relative z-[99999]">
                    {showDate ? (
                      <Calendar
                        maxDate={
                          new Date(
                            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                          )
                        }
                        minDate={new Date()}
                        onChange={handleDate}
                        value={value}
                      />
                    ) : (
                      <ul className="bg-white py-6 rounded-lg w-64">
                        <li
                          className="py-2 hover:bg-gray-200 px-3 cursor-pointer transition-all duration-200"
                          onClick={handleShift}
                        >
                          9:00 AM to 12:00 PM
                        </li>
                        <li
                          className="py-2 hover:bg-gray-200 px-3 cursor-pointer transition-all duration-200"
                          onClick={handleShift}
                        >
                          1:00 PM to 4:00 PM
                        </li>
                        <li
                          className="py-2 hover:bg-gray-200 px-3 cursor-pointer transition-all duration-200"
                          onClick={handleShift}
                        >
                          6:00 PM to 9:00 PM
                        </li>
                        <li
                          className="py-2 hover:bg-gray-200 px-3 cursor-pointer transition-all duration-200"
                          onClick={handleShift}
                        >
                          10:00 PM to 12:00 AM
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-3 text-sm text-sky-400 font-medium">
                <p className="w-fit cursor-pointer" onClick={resetAll}>
                  Reset All
                </p>
              </div>
              <div className="relative flex  flex-col justify-center gap-2 items-center">
                <button
                  className="px-3 py-2 relative w-48 rounded-full cur bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium"
                  type="submit"
                >
                  Schedule
                </button>
                <div
                  className={
                    btnCover
                      ? "absolute cursor-wait bg-slate-100 bg-opacity-40 scale-110 w-full h-full top-0 left-0"
                      : "hidden"
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireCouncellorPopUp;
