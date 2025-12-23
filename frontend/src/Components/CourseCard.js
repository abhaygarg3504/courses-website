/* eslint-disable no-alert, no-console */

import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt, FaUniversity } from "react-icons/fa";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { GrMapLocation } from "react-icons/gr";
import { GiDuration } from "react-icons/gi";
import { FaRankingStar } from "react-icons/fa6";
import ToogleSwitch from "./ToogleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { updateAddedCart } from "../Actions/CartActions";
import NotificationAction from "../Actions/NotificationAction";
import CartButton from "./CartButton";

const CourseCard = (props) => {
  // Difining constants
  const dispatch = useDispatch();
  const { courses, length } = useSelector((state) => state.cart);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({})
  
  // Checking if course is carted or not
  useEffect(() => {
    if (courses) {
      let pos = courses.findIndex((obj) => obj._id === data._id);
      if (pos !== -1) {
        setSave(true);
      } else {
        setSave(false);
      }
    }
  }, [length]);

  useEffect(()=>{
    setData(props.data)
  },[props.authenticated])

  useEffect(()=>{
    setLoading(false);
  },[data,courses])

  // Function to add item to cart
  const addCart = () => {
    dispatch(updateAddedCart(props.authenticated, data));
    dispatch(NotificationAction("SHOW"));
    setLoading(true);
  };

  // function to toogle the cart button
  const handleToogle = () => {
    addCart();
  };

  return (
    <div className="h-max mb-6 sm:h-min w-full flex flex-col justify-between bg-white rounded-lg overflow-hidden hover:shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] shadow-[10px_30px_41px_-31px_rgba(0,0,0,0.40)] transition-all duration-300 hover:scale-[1.01]">
      <div className="flex gap-3 lg:gap-6 m-3 lg:m-6  justify-between course-detail h-full">
        <div className="course-information">
          <h2 className="course-name h-24 lg:max-h-24 overflow-clip text-xl lg:text-2xl font-medium">
            {data.Course_Name}
          </h2>
          <p className="institute-name pt-3 text-[15px] text-gray-600 flex gap-2">
            <span className="font-semibold text-black flex gap-2 items-center">
              <FaUniversity className=" text-sky-700" />
              Institute:
            </span>{" "}
            {data.Institute_Name}
          </p>
          <p className="full_adress pt-1 text-sm text-gray-600 flex gap-2">
            <span className="font-semibold text-black flex gap-2 items-center">
              <GrMapLocation className=" text-sky-700" />
              Address:{" "}
            </span>
            {data.Full_Address}
          </p>
          <p className="aplication-deadline pt-1 text-sm  text-gray-600 flex gap-2">
            <span className="font-semibold whitespace-nowrap text-black flex gap-2 items-center">
              <FaRegCalendarAlt className=" text-sky-700" />
              Intake :Deadline :{" "}
            </span>
            <span className="">
              {data.Application_Deadline
                ? data.Application_Deadline
                : "ASAP"}
            </span>
          </p>
          <p className="aplication-deadline pt-1 text-sm  text-gray-600 flex gap-2">
            <span className="font-semibold text-black flex gap-2 items-center">
              <GiDuration className=" text-sky-700" />
              Duration:{" "}
            </span>
            <span className="">{data.Duration}</span>
          </p>
          <p className="aplication-fees pt-1 text-sm  text-gray-600 flex gap-2">
            <span className="font-semibold text-black flex gap-2 items-center">
              <LiaMoneyBillWaveAltSolid className=" text-sky-700" />
              Application fees:{" "}
            </span>
            <span className="">{data.Application_Fees ? data.Application_Fees : "-"}</span>
          </p>
          <div className="ranking pt-1 flex gap-2 text-sm text-gray-600">
            <span className="font-semibold text-black flex gap-2 items-center">
              <FaRankingStar className=" text-sky-700" />
              Ranking:{" "}
            </span>
            {data.National_Ranking
              ? data.National_Ranking
              : data.QS_Ranking
              ? data.QS_Ranking
              : data.World_Ranking
              ? data.World_Ranking
              : "-"}
          </div>
        </div>
        <div className="flex-shrink-0 toogle-switch md:mr-24 hidden flex-col ">
          <div
            className={`w-fit gap-2 h-min relative flex flex-row hover:text-sky-400  items-center lg:items-center cursor-pointer font-semibold`}
            onClick={handleToogle}
          >
            <div
              className={
                !loading
                  ? "hidden"
                  : "absolute top-0 left-0 cursor-wait  h-full w-full z-10 bg-white opacity-25"
              }
            />
            Add to Cart <ToogleSwitch toogle={save ? true : false} />
          </div>
          <p className=" whitespace-nowrap text-sm font-medium text-sky-400 hover:text-green-400 py-2 cursor-pointer">
            <a
              href={"/course/" + data._id}
              target="_blank"
              rel="noreferrer"
            >
              More Details ...
            </a>
          </p>
        </div>
      </div>
      <div>
        <div className="fees py-3 font-bold  text-xl text-center bg-gray-200">
          {data.Yearly_Tuition_Fees
            ? !["year", "semester"].some((keywords) =>
                data.Yearly_Tuition_Fees.toLowerCase()
                  .split(/[- .,;/]/)
                  .includes(keywords)
              )
              ? data.Yearly_Tuition_Fees + " / year"
              : data.Yearly_Tuition_Fees
            : "NA"}
        </div>
        <div className=" flex course-card-footer px-3 text-base lg:text-lg py-2 justify-between items-center">
          <p className="cursor-pointer font-medium bg-sky-400 py-2 px-2 text-sm rounded-md text-white hover:bg-sky-500 shadow-md shadow-gray-400">
            <a
              href={"/course/" + data._id}
              target="_blank"
              rel="noreferrer"
            >
              More Info ...
            </a>
          </p>
          <div
            onClick={(e) => {
              addCart();
            }}
          >
            <CartButton added={save}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
