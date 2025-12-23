/* eslint-disable no-alert, no-console */

// importing elements
import React, { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaChevronDown, FaMap } from "react-icons/fa";
import axios from "axios";
import Helmet from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import ScheduleCall from "./ScheduleCall";
import BreadCrumb from "../Components/BreadCrumb";
import toast from "react-hot-toast";

const Contact = () => {
  // defining constants
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
    subject: "",
    number: "",
  });

  // Changing option for code

  // function if user submit the form
  const handleClick = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URI}/api/message`, formData, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });

      // Resetting the constants
      setFormData((prev) => {
        return {
          ...prev,
          email: "",
          name: "",
          message: "",
          subject: "",
          number: "",
        };
      });
      // catch error if any and show to console
    } catch (error) {
      toast.error("Some error occurred");
      console.log(error);
    }
  };

  return (
    <>
      {/* setting meta data */}
      <Helmet>
        <title>Contact us</title>
        <meta
          name="description"
          content="Contact us if you have any question or requests"
        />
      </Helmet>

      {/* showing schedule call offer if page is contact page */}
      <>
        <div
          className={`contact-header h-fit relative pt-20 border-b-2 border-gray-200`}
        >
          <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
            <div className="hero-heading py-8 relative w-1/2">
              <h1 className="text-6xl relative z-10 font-semibold w-4/5 text-black">
                Contact
              </h1>
            </div>
            <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
              <BreadCrumb />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 py-6 font-medium text-lg mt-8">
          <ScheduleCall applied={false} reason={"Hire councellor"}/>
        </div>
        <div className="location w-full h-full hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5826.110791252118!2d75.73588871981207!3d29.140656335900385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sadress%20209%20Urban%20Estate%20II!5e0!3m2!1sen!2sin!4v1708965797923!5m2!1sen!2sin"
            className="h-[500px] w-[95%] lg:w-[80vw] m-auto my-20 border-black rounded-2xl border-2 shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)]"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </>

      {/* Contact information starts here */}
      <div
        className={`contact-info ${
          location.pathname === "/contact" ? "my-20" : "my-0"
        } w-[95%] pb-20 sm:w-4/5 m-auto flex flex-col lg:grid lg:grid-cols-2 gap-10`}
      >
        <div className="info shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] rounded-3xl px-6">
          <h1 className="text-2xl sm:text-4xl font-medium py-6 my-10 border-b-[1px] border-gray-600">
            Keep In Touch
          </h1>

          <div className="phone py-6">
            <h2 className="text-base sm:text-xl flex font-medium justify-start items-center gap-6">
              <BsFillTelephoneFill className="text-blue-700" />
              Mobile
            </h2>
            <a
              href="tel:+1 5876912677"
              className="text-gray-500 text-sm sm:text-base ml-10 py-2 font-medium"
            >
              +1 5876912677
            </a>
          </div>
          <div className="email py-6">
            <h2 className="text-base sm:text-xl flex font-medium justify-start items-center gap-6">
              <MdEmail className="text-blue-700" />
              Email
            </h2>
            <a
              href="mailto:info@myglobalconsultant.com"
              className="text-gray-500 text-sm sm:text-base ml-10 py-2 font-medium"
            >
              info@myglobalconsultant.com
            </a>
          </div>
          <div className="address py-6 hidden">
            <h2 className="text-base sm:text-xl flex font-medium justify-start items-center gap-6">
              <FaMap className="text-blue-700" />
              Address
            </h2>
            <p className="text-gray-500 text-sm sm:text-base ml-10 py-2 font-medium">
              address-209,Urban Estate 2, Hisar, Haryana 125001, Hisar, Haryana
              125001
            </p>
          </div>
        </div>

        {/* Form if user want to send the message */}

        <div className="contact bg-gradient-to-b from-white to-gray-100 rounded-3xl shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)]  px-4">
          <h2 className="ttext-2xl sm:text-4xl font-medium py-6  sm:my-10 border-b-[1px] border-gray-600">
            Leave A Message
          </h2>
          <form
            className="flex flex-col items-center"
            // call function if user try to submit the form
            onSubmit={(e) => {
              handleClick();
              e.preventDefault();
            }}
          >
            {/* input for name */}
            <div className="flex sm:flex-row flex-col gap-6 w-full my-3">
              <input
                required
                value={formData.name}
                className="w-full py-4 font-medium text-lg rounded-[30px] outline-none text-gray-600 px-3"
                placeholder="Name"
                type="text"
                name="name"
                id="contact-name"
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
              />
              <input
                required
                value={formData.email}
                className="w-full py-4 font-medium text-lg rounded-[30px] outline-none text-gray-600 px-3"
                placeholder="Your Email"
                type="email"
                name="email"
                id="contact-email"
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
            {/* dropdown for code selection */}
            <div className="flex flex-col gap-6 w-full my-3">
              <input
                required
                value={formData.number}
                className="w-full py-4 font-medium flex-shrink-0 text-lg rounded-[30px] outline-none text-gray-600 px-3"
                placeholder="+916397XXXXXX"
                type="tel"
                name="number"
                id="contact-number"
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      number: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="flex flex-col gap-6 w-full my-3">
              <input
                required
                value={formData.subject}
                className="w-full py-4 font-medium flex-shrink-0 text-lg rounded-[30px] outline-none text-gray-600 px-3"
                placeholder="Subject"
                type="text"
                name="subject"
                id="contact-subject"
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      subject: e.target.value,
                    };
                  });
                }}
              />
            </div>
            {/* input for message */}
            <textarea
              required
              value={formData.message}
              className="w-full py-3 sm:py-6 max-h-24 rounded-3xl my-3 px-4 outline-none border-none text-lg font-medium text-gray-600"
              placeholder="Message"
              name="message"
              id="message"
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    message: e.target.value,
                  };
                });
              }}
            ></textarea>
            {/* Submit button */}
            <button
              type="submit"
              className="px-6 my-3  py-3 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 flex justify-center border-blue-600 mr-4 text-white justify-center font-medium"
            >
              Submit Now
            </button>
          </form>
          {/* Form ends here */}
        </div>
      </div>
    </>
  );
};

export default Contact;
