import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaUniversity } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { GiDuration } from "react-icons/gi";
import { FaRankingStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateAddedCart } from "../Actions/CartActions";
import NotificationAction from "../Actions/NotificationAction";
import CartButton from "./CartButton";

const SimilarCourseCard = ({ course }) => {
  const { courses, length } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {authenticated} = useSelector(state=>state.authentication);
  const [save, setSave] = useState(false);
  useEffect(() => {
    if (courses) {
      let pos = courses.findIndex((obj) => obj._id === course._id);
      if (pos !== -1) {
        setSave(true);
      } else {
        setSave(false);
      }
    }
  }, [length]);

  const addCart = () => {
    dispatch(updateAddedCart(authenticated, course));
    dispatch(NotificationAction("SHOW"));
    setLoading(true);
  };

  return (
    <>
      <div className="flex flex-col h-min max-w-[450px] m-auto rounded-lg overflow-hidden shadow-xl">
        <h3 className="similar-course-name px-4">{course.Course_Name}</h3>
        <div className="course-details py-3 min-h-[240px] px-4">
          <p className="institute-name text-[15px] text-gray-600 flex gap-2">
            <span className="font-semibold text-black items-start flex gap-2">
              <FaUniversity className=" text-sky-700" />
              Institute:
            </span>{" "}
            {course.Institute_Name}
          </p>
          <p className="full_adress pt-1 items-start text-sm text-gray-600 flex gap-2">
            <span className="font-semibold text-black flex gap-2 items-center">
              <GrMapLocation className=" text-sky-700" />
              Address:{" "}
            </span>
            {course.Full_Address}
          </p>
          <p className="aplication-deadline items-start pt-1 text-sm  text-gray-600 flex gap-2">
            <span className="font-semibold whitespace-nowrap text-black flex gap-2 items-center">
              <FaRegCalendarAlt className=" text-sky-700" />
              Intake :Deadline :{" "}
            </span>
            <span className="">
              {course.Application_Deadline
                ? course.Application_Deadline
                : "ASAP"}
            </span>
          </p>
          <p className="aplication-deadline pt-1 text-sm  text-gray-600 flex gap-2">
            <span className="font-semibold text-black flex gap-2 items-center">
              <GiDuration className=" text-sky-700" />
              Duration:{" "}
            </span>
            <span className="">{course.Duration}</span>
          </p>
          <div className="ranking pt-1 items-start flex gap-2 text-sm text-gray-600">
            <span className="font-semibold text-black flex gap-2 items-center">
              <FaRankingStar className=" text-sky-700" />
              Ranking:{" "}
            </span>
            {course.National_Ranking
              ? course.National_Ranking
              : course.QS_Ranking
              ? course.QS_Ranking
              : course.World_Ranking
              ? course.World_Ranking
              : "-"}
          </div>
        </div>
        <div className="fees py-1 font-bold  text-lg my-2 text-center bg-gray-200">
          {course.Yearly_Tuition_Fees
            ? !["year", "semester"].some((keywords) =>
                course.Yearly_Tuition_Fees.toLowerCase()
                  .split(/[- .,;/]/)
                  .includes(keywords)
              )
              ? course.Yearly_Tuition_Fees + " / year"
              : course.Yearly_Tuition_Fees
            : "NA"}
        </div>
        <div className=" flex course-card-footer px-3 text-base lg:text-lg py-2 justify-between items-center">
          <p className="cursor-pointer font-medium bg-sky-400 py-2 px-2 text-sm rounded-md text-white hover:bg-sky-500 shadow-md shadow-gray-400">
            <a href={"/course/" + course._id} target="_blank" rel="noreferrer">
              More Info ...
            </a>
          </p>
          <div
            onClick={(e) => {
              addCart();
            }}
          >
            <CartButton added={save} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarCourseCard;
