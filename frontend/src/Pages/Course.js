/* eslint-disable no-alert, no-console */

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Components/BasicLoader";
import ToogleSwitch from "../Components/ToogleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { Keywords } from "../Data/KeyWords.js";
import { updateAddedCart } from "../Actions/CartActions";
import NotificationAction from "../Actions/NotificationAction";
import { Helmet } from "react-helmet";
import SwiperContainer from "../Components/SwiperContainer.js";
import toast from "react-hot-toast";
import CourseKeywords from "../Components/courseKeywords.js";

const Course = () => {
  // Defining constant
  const location = useLocation();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.cart);
  const { authenticated } = useSelector((state) => state.authentication);
  const [data, setData] = useState({
    Application_Deadline: "-",
    Application_Fees: "-",
    Campus: "-",
    Country: "-",
    Course_Name: "-",
    Course_Url: "-",
    DET_Score: "-",
    Duration: "-",
    Ranking: "-",
    Full_Address: "-",
    GPA: ".",
    IELTS_Overall: "-",
    IELTS_no_Band_Less_Than: "-",
    Institute_Logo: "-",
    Institute_Name: "-",
    Intakes: "-",
    National_Ranking: "-",
    PTE_Overall: "-",
    Remarks: "-",
    TOEFL_iBT_Overall: "-",
    TOEFL_iBT_no_Bands_Less_Than: "-",
    URL: "-",
    Website_Link: "-",
    World_Ranking: "-",
    Yearly_Tuition_Fees: "-",
    deadlineArray: ["-"],
    intakeArray: ["-"],
  });
  const [similarInstitutes, setSimilarInstitutes] = useState([]);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [save, setSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // fetch data from server
  async function getData() {
    setIsLoading(true);
    await axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_URI
        }/api/courses/data/${location.pathname.split("/").pop()}`,
        {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((res) => {
        let data = res.data.course;
        Object.keys(data).map((key, index) => {
          data[key] =
            data[key] && data[key] !== "" ? data[key].replace(/\n/g, "") : "-";
        });
        data.intakeArray = data.Intakes.split(",");
        data.deadlineArray = data.Application_Deadline
          ? data.Application_Deadline.split(",")
          : [];
        setData(data);
        setSimilarCourses(res.data.courses);
      })
      .catch((err) => {
        toast.error("OOPS some error occurred.Please try again later.");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      });
    setIsLoading(false);
  }

  // add course to cart
  const addCart = () => {
    dispatch(updateAddedCart(authenticated, data));
    dispatch(NotificationAction("SHOW"));
  };

  // handle tootle on add cart
  const handleToogle = () => {
    addCart();
  };

  // checking if course added to cart or not
  useEffect(() => {
    if (courses) {
      let pos = courses.findIndex((obj) => obj._id === data._id);
      if (pos !== -1) {
        setSave(true);
      } else {
        setSave(false);
      }
    }
  }, [courses, data._id]);

  // funtion to fetch data
  useEffect(() => {
    getData();
  }, [authenticated]);

  return (
    <>
      {isLoading ? (
        <Helmet>
          <title>MyGlobalConsultant - Course</title>
          <meta
            name="description"
            content="At MyGlobalConsultant, we're dedicated to making the process of finding and applying for courses abroad as seamless and straightforward as possible. Whether you're dreaming of studying at a prestigious university in Europe, pursuing a specialized program in Asia, or immersing yourself in a cultural exchange opportunity in South America, we're here to help you turn your educational aspirations into reality."
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>{`${data.Course_Name} in ${data.Institute_Name}`}</title>
          <meta
            name="description"
            content={`Discover ${data.Course_Name} at ${data.Institute_Name} in ${data.Full_Address}. ${data.GPA}. Find out about admissions, curriculem and career opportunities.`}
          />
          <meta
            name="keywords"
            content={CourseKeywords(
              data.Course_Name,
              data.Institute_Name,
              data.Full_Address
            )}
          />
        </Helmet>
      )}

      {isLoading ? (
        <div className="grid place-content-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="contact-header h-fit relative pt-20 border-b-2 border-gray-200">
            <div className="bgcover absolute h-full w-full  opacity-80"></div>
            <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
              <div className="hero-heading py-8 relative">
                <h1 className="text-xl leading-8 sm:text-3xl relative z-10 font-semibold text-black">
                  Course of {data.Course_Name} in {data.Institute_Name}
                </h1>
              </div>
              <div className="text-sm sm:text-base lg:text-lg sm:w-full lg:w-3/4  text-black">
                {`Home > Course > ${data.Course_Name || ""}`}
              </div>
            </div>
          </div>
          <div className="course-detail flex flex-col lg:flex-row gap-10 py-20 px-0 sm:px-6  bg-opacity-60 ">
            {/* College information */}
            <div className="college-interface lg:w-80 w-[95%] m-auto flex lg:flex-col flex-col sm:items-center sm:flex-row flex-shrink-0 rounded-xl overflow-hidden shadow-[0px_25px_50px_-31px_rgba(0,0,0,0.71)] bg-white h-max">
              <img
                className="sm:w-1/2 lg:h-56 h-56 sm:h-fit lg:w-full object-cover sm:object-contain lg:object-cover"
                src="/images/college.jpg"
                alt={data.Institute_Name + " image"}
              />
              <div className="my-10 px-4">
                <h2 className="university text-xl py-2 font-bold">
                  {data.Institute_Name}
                </h2>
                <p className="country text-sm font-medium py-1 text-gray-400">
                  {data.Country}
                </p>
                <p className="institute-website text-sm text-blue-600 font-medium underline">
                  <a target="_blank" href={"http://" + data.Website_Link}>
                    {data.Website_Link}
                  </a>
                </p>
                <div className="bg-sky-50 my-4 py-3 px-2 rounded-xl">
                  <h3 className="text-base lg:text-lg font-semibold">
                    Full Address
                  </h3>
                  <p className="capitalize text-xs  text-gray-500 font-medium">
                    {data.Full_Address}
                  </p>
                </div>
                <div className="ranking bg-sky-50 my-4 py-3 px-2 rounded-xl">
                  <h3 className="text-base lg:text-lg font-semibold">
                    Ranking
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {data.National_Ranking +
                      ", " +
                      data.QS_Ranking +
                      ", " +
                      data.World_Ranking}
                  </p>
                </div>
                <div className="remark text-xs bg-sky-50 my-4 py-3 px-2 rounded-xl text-xs font-medium text-gray-500">
                  {data.Remarks}
                </div>
              </div>
            </div>
            {/* Course information */}
            <div className="course-details w-full">
              <div className="course-header mb-5">
                <h2 className="font-semibold text-gray-600 px-6">
                  Course Details
                </h2>
              </div>
              <div className="info shadow-[0px_25px_50px_-31px_rgba(0,0,0,0.71)] pb-8 w-[95%] m-auto lg:w-full rounded-xl">
                <div className="flex justify-between px-6 flex-col sm:flex-row">
                  <h1 className="text-xl mb-1 font-bold">{data.Course_Name}</h1>
                  <div
                    className="w-fit gap-2 h-min flex flex-row  items-center lg:items-center whitespace-nowrap font-semibold hover:text-sky-600 cursor-pointer"
                    onClick={handleToogle}
                  >
                    Add to Cart <ToogleSwitch toogle={save ? true : false} />
                  </div>
                </div>
                <p className="w-full hidden px-6 h-5 sm:h-fit break-before-auto text-xs sm:text-base overflow-clip ">
                  <a
                    href={data.Course_Url}
                    target="_blank"
                    className="course-site text-blue-500 underline"
                  >
                    {data.Course_Url}
                  </a>
                </p>
                <div className="fees flex sm:flex-row flex-col gap-4 justify-start sm:justify-between items-start sm:items-center my-3 sm:my-3 px-6">
                  <div className="application-fees flex gap-6 items-center">
                    <h3 className="text-sm font-medium text-gray-400">
                      Application Fees:
                    </h3>
                    <p className="text-xl font-medium">
                      {data.Application_Fees}
                    </p>
                  </div>
                  <div className="tution-fees flex gap-6 items-center">
                    <h3 className="text-sm font-medium text-gray-400">
                      Yearly Tutuion Fees:
                    </h3>
                    <p className="text-xl font-medium">
                      {data.Yearly_Tuition_Fees}
                    </p>
                  </div>
                </div>
                <div className="appliction-details grid grid-cols-3 gap-6 sm:flex justify-between flex-wrap my-3 border-t-[3px] py-6 px-6 border-gray-200">
                  <div className="intake">
                    <h3 className=" font-medium text-sm text-gray-400">
                      Intake
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {data.intakeArray && data.intakeArray.length ? (
                        data.intakeArray.map((data, index) => {
                          return (
                            <p
                              className="px-2 py-1 whitespace-nowrap font-medium text-sm bg-gray-200 rounded-full w-fit"
                              key={index}
                            >
                              {data}
                            </p>
                          );
                        })
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                  <div className="duration">
                    <h3 className=" font-medium text-sm text-gray-400">
                      Duration
                    </h3>
                    <p className="font-medium ">{data.Duration}</p>
                  </div>
                  <div className="campus">
                    <h3 className=" font-medium text-sm text-gray-400">
                      Campus
                    </h3>
                    <p className="font-medium ">{data.Campus}</p>
                  </div>
                  <div className="city">
                    <h3 className=" font-medium text-sm text-gray-400">
                      Country
                    </h3>
                    <p className="font-medium ">{data.Country}</p>
                  </div>
                  <div className="deadline">
                    <h3 className=" font-medium text-sm text-gray-400 whitespace-nowrap">
                      Application Deadline
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {data.deadlineArray && data.deadlineArray.length ? (
                        data.deadlineArray.map((data, index) => {
                          return (
                            <p
                              className="px-2 py-1 whitespace-nowrap font-medium text-sm bg-gray-200 rounded-full w-fit"
                              key={index}
                            >
                              {data}
                            </p>
                          );
                        })
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="test-eligibility rounded-lg border-2 overflow-hidden my-4 mx-2 sm:mx-6 border-gray-200">
                  <h2 className="bg-sky-200 px-2 sm:px-6 py-2 font-semibold">
                    Eligibility
                  </h2>
                  <div className="test-container grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-6 p-6">
                    <div>
                      <h3 className=" font-medium text-sm text-gray-400">
                        IELTS Overall:
                      </h3>
                      <p className="font-medium ">
                        {data.IELTS_Overall > 0 ? data.IELTS_Overall : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-medium text-sm text-gray-400">
                        IELTS No Band Less Than:
                      </h3>
                      <p className="font-medium ">
                        {data.IELTS_no_Band_Less_Than > 0
                          ? data.IELTS_no_Band_Less_Than
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-medium text-sm text-gray-400">
                        TOEFL Overall:
                      </h3>
                      <p className="font-medium ">
                        {data.TOEFL_Overall > 0 ? data.TOEFL_Overall : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-medium text-sm text-gray-400">
                        TOEFL iBT No Bond Less Than:
                      </h3>
                      <p className="font-medium ">
                        {data.TOEFL_iBT_No_Bond_Less_Than > 0
                          ? data.TOEFL_iBT_No_Bond_Less_Than
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-medium text-sm text-gray-400">
                        PTE Overall:
                      </h3>
                      <p className="font-medium ">
                        {data.PTE_Overall > 0 ? data.PTE_Overall : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-medium text-sm text-gray-400">
                        PTE No Bond less Than:
                      </h3>
                      <p className="font-medium ">
                        {data.PTE_No_Bond_Less_Than > 0
                          ? data.PTE_No_Bond_Less_Than
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="standardized-test rounded-lg border-2 overflow-hidden my-4 mx-2 sm:mx-6 border-gray-200">
                  <h2 className="bg-sky-200 px-6 py-2 font-semibold">
                    Standarized Test Requirement
                  </h2>
                  <div className="tests grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-6 p-6">
                    <div>
                      <h2 className=" font-medium text-sm text-gray-400">
                        GRE Score:
                      </h2>
                      <p className="font-medium ">
                        {"GRE_Score" in data
                          ? data.GRE_Score > 0
                            ? data.GRE_Score
                            : "-"
                          : "-"}{" "}
                      </p>
                    </div>
                    <div>
                      <h2 className=" font-medium text-sm text-gray-400">
                        GMAT Score:
                      </h2>
                      <p className="font-medium ">
                        {"GMAT_Score" in data
                          ? data.GMAT_Score > 0
                            ? data.GMAT_Score
                            : "-"
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h2 className=" font-medium text-sm text-gray-400">
                        ACT Score:
                      </h2>
                      <p className="font-medium ">
                        {"ACT_Score" in data
                          ? data.ACT_Score > 0
                            ? data.ACT_Score
                            : "-"
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h2 className=" font-medium text-sm text-gray-400">
                        SAT Score:
                      </h2>
                      <p className="font-medium ">
                        {"GRE_Score" in data
                          ? data.SAT_Score > 0
                            ? data.SAT_Score
                            : "-"
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h2 className=" font-medium text-sm text-gray-400">
                        DET Score:
                      </h2>
                      <p className="font-medium ">
                        {"DET_Score" in data
                          ? data.DET_Score > 0
                            ? data.DET_Score
                            : "-"
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="gpa rounded-lg border-2 overflow-hidden my-4 mx-2 sm:mx-6 border-gray-200">
                  <h2 className="bg-sky-200 px-6 py-2 font-semibold">
                    Grade Point Average
                  </h2>
                  <p className=" font-medium text-sm text-gray-400 p-6">
                    {data.GPA}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Courses */}
          
          <div className="similar-courses sm:p-6 border-t-2 border-gray-200">
            {similarCourses.length && (
              <SwiperContainer
                data={similarCourses}
                title={"Similar Courses"}
                nextClass={"next-class-1"}
                prevClass={"prev-class-1"}
              />
            )}
          </div>

{/* Similar Courses offered by same institute */}

          {/* <div className="similar-courses sm:p-6 border-t-2 border-gray-200">
            {similarInstitutes.length && (
              <SwiperContainer
                data={similarInstitutes}
                title={"Other courses offered by " + data.Institute_Name}
                nextClass={"next-class-2"}
                prevClass={"prev-class-3"}
              />
            )}
          </div> */}
        </>
      )}
    </>
  );
};

export default Course;
