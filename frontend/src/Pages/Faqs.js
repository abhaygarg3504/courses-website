/* eslint-disable no-alert, no-console */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaChevronDown } from "react-icons/fa";
import BreadCrumb from "../Components/BreadCrumb";
import toast from "react-hot-toast";

// function for showing faq card
const Card = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        open
          ? "faq-card p-3 sm:p-6 border-sky-600 border-[1px] rounded-xl my-6 w-[95%] sm:w-4/5 m-auto cursor-pointer"
          : "faq-card cursor-pointer p-3 sm:p-6 hover:border-sky-600 border-gray-400 border-[1px] rounded-xl my-6 sm:w-4/5 w-[95%] m-auto"
      }
      onClick={(e) => setOpen(!open)}
    >
      <div
        className={
          open
            ? "question text-sm sm:text-lg  font-bold flex justify-between items-center text-sky-600"
            : "question text-sm sm:text-lg  font-bold flex justify-between items-center hover:text-sky-600"
        }
      >
        {props.data.question}
        <FaChevronDown
          className={
            open
              ? "rotate-180 transition-all duration-300 ease-in-out"
              : "rotate-0  transition-all duration-300 ease-in-out"
          }
        />
      </div>
      <div
        className={
          open
            ? "answer sm:text-base text-xs max-h-96 overflow-hidden pt-8 leading-8 transition-all duration-300 opacity-100 ease-in-out"
            : "max-h-0 sm:text-base text-xs pt-0 leading-8 opacity-0 overflow-hidden transition-all duration-300 ease-in-out"
        }
      >
        {props.data.answer}
      </div>
    </div>
  );
};

const Faqs = () => {
  const [faqData, setFaqData] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/faqs`, {
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setFaqData(res.data);
        });
    } catch (error) {
      toast.error("Some error occurred");
      console.log(error);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Frequently asked questions</title>
      </Helmet>
      <div className="contact-header h-fit relative pt-20 border-b-2 border-gray-200">
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative w-1/2">
            <h1 className="text-6xl relative z-10 font-semibold w-4/5 text-black">
              FAQs
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="faqs-container">
        {faqData.map((data, index) => {
          return <Card data={data} />;
        })}
      </div>
    </>
  );
};

export default Faqs;
