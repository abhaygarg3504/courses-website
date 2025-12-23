import React from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { RiExchangeDollarFill } from "react-icons/ri";

const jobDetails = [
  {
    name: "Study Abroad Councellors",
    tags: ["Visa Filling","Organizational skills","Academic Councelling"],
    salary: "20-40k / month",
    link: "https://in.indeed.com/job/study-abroad-counsellors-d6d8d0b60bc99ec8",
  },
];

const JobCard = ({job,index}) => {
  return (
    <div key={index} className="job-card w-full rounded-lg bg-white p-4 h-fit md:h-36 flex md:flex-row flex-col gap-3 justify-between">
      <div className="details flex-col-reverse gap-3 md:flex-col justify-between flex">
        <h2 className="text-lg font-medium flex gap-4 items-center">
          <span className="p-2 bg-gray-200 rounded-md text-lg">
            <IoBagHandleOutline />
          </span>
          {job.name}
        </h2>
        <div className="tags flex gap-2">
          {job.tags.map((tag,ind)=>{
            return (

          <p key={ind} className="bg-gray-200 py-1 px-2 rounded-md text-sm font-medium">
            {tag}
          </p>
            )
          })}
        </div>
      </div>
      <div className="apply-payment flex justify-between flex-row md:flex-col items-center mt-6 md:mt-0">
        <div className="payment flex gap-2 items-center text-sm text-gray-600 font-medium">
          <RiExchangeDollarFill className="text-lg text-sky-600" />
          <span className="font-medium text-black text-lg">₹ {job.salary}</span>
        </div>
        <Link to={job.link} target="_blank" referrerPolicy="noreferer">
          <button className="px-4 py-1.5 float-right w-fit rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};

const Jobs = () => {
  return (
    <>
      {/* setting meta data */}
      <Helmet>
        <title>Jobs at myglobalconsultant</title>
        <meta
          name="description"
          content="Contact us if you have any question or requestsExplore exciting career opportunities at MyGlobalConsultant. Discover diverse roles across industries worldwide. Join a dynamic team committed to innovation and excellence. Apply today!"
        />
      </Helmet>
      <div
        className={`contact-header h-fit relative pt-20 border-b-2 border-gray-200`}
      >
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative w-1/2">
            <h1 className="text-6xl relative z-10 font-semibold w-4/5 text-black">
              Jobs
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="jobs-content-wrapper bg-gray-100">
        <div className="p-6 w-full sm:w-[500px] md:w-[750px] lg:w-[1024px] m-auto">
          <div className="blog-card-container grid grid-cols-1 gap-6 w-full h-fit">
            {jobDetails.map((job, index) => {
              return (
              <JobCard job={job} index={index} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
