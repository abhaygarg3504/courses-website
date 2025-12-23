/* eslint-disable no-alert, no-console */

// importing elements
import React, { useEffect, useState } from "react";
import RegisterPopUp from "../Components/RegisterPopUp";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { GiDuration, GiTrashCan } from "react-icons/gi";
import { FaRegCalendarAlt, FaUniversity } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import axios from "axios";
import { Helmet } from "react-helmet";
import { deleteCartItem } from "../Actions/CartActions";
import toast from "react-hot-toast";

const Cart = () => {
  // defining constants
  const { courses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  const [showPopUp, setShowPopUp] = useState(false);

  const deleteCart = (props, index) => {
    dispatch(deleteCartItem(authenticated, props));
  };

  return (
    <>
      {/* Changing meta data */}
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {/* metadata changed */}

      {/* popup for registration if user is not registered */}
      <RegisterPopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />

      {/* Page content starts here */}
      <div className="cart w-full min-h-screen pt-24 bg-zinc-100">
        <h1 className="text-2xl font-bold text-center pb-10">Cart</h1>
        <div className="flex gap-6 w-full flex-col-reverse lg:flex-row justify-between px-4 overflow-hidden">
          <ul className=" m-auto w-full lg:w-[calc(100%-320px)]">
            {/* Checking if any course in cart */}
            {courses.length > 0 ? (
              // if course are present show them
              courses.map((elem, index) => {
                return (
                  <li className="py-4 ">
                    <div className="h-min w-full flex flex-col justify-between bg-white overflow-hidden transition-all duration-300 ">
                      <div className="flex gap-3 lg:gap-6 m-3 lg:m-6  justify-between course-detail h-full">
                        <div className="course-information w-full sm:w-3/4">
                          <h2 className="course-name overflow-hidden text-ellipsis whitespace-nowrap w-full text-xl lg:text-2xl font-medium">
                            {elem.Course_Name}
                          </h2>
                          <p className="institute-name pt-3 text-[15px] text-gray-600 flex gap-2">
                            <span className="font-semibold text-black flex gap-2 items-center">
                              <FaUniversity className=" text-sky-700" />
                              Institute:
                            </span>{" "}
                            {elem.Institute_Name}
                          </p>
                          <p className="full_adress pt-1 text-sm text-gray-600 flex gap-2">
                            <span className="font-semibold text-black flex gap-2 items-center">
                              <GrMapLocation className=" text-sky-700" />
                              Address:{" "}
                            </span>
                            {elem.Full_Address}
                          </p>
                          <p className="aplication-deadline pt-1 text-sm  text-gray-600 flex gap-2">
                            <span className="font-semibold text-black flex gap-2 items-center">
                              <FaRegCalendarAlt className=" text-sky-700 whitespace-nowrap" />
                              Intake :Deadline :{" "}
                            </span>
                            <span className="text-sky-600">
                              {elem.Application_Deadline
                                ? elem.Application_Deadline
                                : "ASAP"}
                            </span>
                          </p>
                          <p className="aplication-deadline pt-1 text-sm  text-gray-600 flex gap-2">
                            <span className="font-semibold text-black flex gap-2 items-center">
                              <GiDuration className=" text-sky-700" />
                              Duration:{" "}
                            </span>
                            <span className="text-sky-600">
                              {elem.Duration}
                            </span>
                          </p>
                          <p className="aplication-fees pt-1 text-sm  text-gray-600 flex gap-2">
                            <span className="font-semibold text-black flex gap-2 items-center">
                              <LiaMoneyBillWaveAltSolid className=" text-sky-700" />
                              Application fees:{" "}
                            </span>
                            <span className="text-sky-600">
                              {elem.Application_Fees}
                            </span>
                          </p>
                          <div className="ranking pt-1 flex gap-2 text-sm text-gray-600">
                            <span className="font-semibold text-black flex gap-2 items-center">
                              <FaRankingStar className=" text-sky-700" />
                              Ranking:{" "}
                            </span>
                            {elem.National_Ranking
                              ? elem.National_Ranking
                              : elem.QS_Ranking
                              ? elem.QS_Ranking
                              : elem.World_Ranking
                              ? elem.World_Ranking
                              : "-"}
                          </div>
                        </div>
                        <div className="flex-shrink-0 hidden sm:flex justify-start flex-col items-end ">
                          <GiTrashCan
                            className="w-8 h-8 cursor-pointer border-2 hover:border-black mb-4 text-gray-600"
                            onClick={(e) => deleteCart(elem._id, index)}
                          />
                          <p className=" whitespace-nowrap text-sm font-medium text-sky-400 py-2 cursor-pointer">
                            <a href={"/course/" + elem._id} target="_blank">
                              More Details ...
                            </a>
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="fees py-3 font-bold  text-xl text-center bg-gray-200">
                          {elem.Yearly_Tuition_Fees
                            ? !elem.Yearly_Tuition_Fees.split(
                                /[- .,;/]/
                              ).includes("semester")
                              ? elem.Yearly_Tuition_Fees + " / year"
                              : elem.Yearly_Tuition_Fees
                            : "NA"}
                        </div>
                        <div className=" flex course-card-footer px-6 text-base md:hidden py-2 justify-between items-center">
                          <p className="cursor-pointer font-medium text-base bg-sky-400 py-2 px-2  rounded-md text-white hover:bg-sky-800">
                            <Link to={"/course/" + elem._id}>
                              More Info ...
                            </Link>
                          </p>
                          <div
                            className={`cursor-pointer font-medium text-base bg-sky-400 py-2 px-2  rounded-md text-white hover:bg-sky-800 "
                        }`}
                            onClick={(e) => deleteCart(elem._id, index)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              // else show this para
              <p className="p-6 text-center font-medium text-2xl">
                No item to show
              </p>
            )}
          </ul>
          {/* Sidebar for details */}
          <div className="min-w-72 flex-shrink-0">
            <div className="h-fit flex flex-col gap-4 items-center bg-white p-4 my-4 ">
              <div className="flex justify-between items-center w-full pb-6">
                <h1 className="text-xl font-semibold">Total Courses:</h1>
                <span>{courses.length}</span>
              </div>
              <Link
                // if authenticated navigate to apply page else navigate to login page
                to={
                  courses.length > 0
                    ? authenticated
                      ? `/application-form` // if contact is added
                      : "/login"
                    : "/"
                }
              >
                <button className="px-6 py-2 w-40 relative  rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium">
                  {courses.length > 0 ? "Apply" : "Add Course"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* page content ends here */}
    </>
  );
};

export default Cart;
