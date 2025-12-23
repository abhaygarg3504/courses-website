import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import UploadInput from "../Components/UploadInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ApplicationForm = () => {
  const [btnCover, setBtnCover] = useState(false);
  const [files, setFiles] = useState({});
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.authentication);
  const [validation, setValidation] = useState("");

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  });

  const handleSubmit = (e) => {
    if (e && authenticated) {
      setBtnCover(true);
      e.preventDefault();
      if (Object.keys(files).length === 0) {
        setValidation("No file were uploaded.");
        setBtnCover(false);
        return;
      } else {
        setValidation("");
      }
      const formData = new FormData();
      for (const key in files) {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      }
      const id = toast.loading("Uploading file.")
      axios
        .post(`${process.env.REACT_APP_BACKEND_URI}/api/upload`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          toast.success("Documents Uplaoded.",{id:id});
          setTimeout(() => {
            navigate("/apply",{state:{applied:true}});
            setBtnCover(false);
          }, 1000);
        })
        .catch((err) => {
          toast.error("OOPS some error occurred.",{id:id});
          setTimeout(() => {
            navigate("/");
            setBtnCover(false);
          }, 1000);
        });
    }
  };

  return (
    <div>
      <div
        className={`contact-header h-fit relative pt-20 border-b-2 border-gray-200`}
      >
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative w-1/2">
            <h1 className="text-4xl sm:text-6xl relative z-10 font-semibold w-4/5 text-black">
              Application Form
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
            <BreadCrumb />
          </div>
        </div>
      </div>
      <h2 className="text-center font-semibold text-lg sm:text-xl my-2">
        Please upload necessary document.
      </h2>
      <div className="flex justify-center gap-6 items-center w-full mt-4">
        <p>If need help for any document</p>
        <Link to="/schedule-call?r=document-help" state={{r:"Document help"}}>
          <button className="p-[6px_20px] shadow-md shadow-gray-400 text-sm whitespace-nowrap w-fit items-center  transition-all duration-200  rounded-lg text-white bg-[#ff7675] hover:bg-[#e17055] font-medium  cursor-pointer">
            Click Here
          </button>
        </Link>
      </div>
      <div className="form-container w-[95%] md:4/5 lg::w-3/4 m-auto py-10">
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit}
          className="border-2 border-gray-400 rounded-lg"
        >
          <h2 className="py-3 text-center text-2xl font-bold">
            Upload Your Documents
          </h2>
          <h2 className="py-6 font-semibold text-lg px-4">Basic Documents</h2>
          <div className="xl:grid xl:grid-cols-2 gap-6 w-full">
            <UploadInput
              label="Passport"
              placeholder="passport"
              limit="max size 50KB"
              id="passport-input"
              name="passport_img"
              setFiles={setFiles}
            />
            <UploadInput
              label="10th/HSC (Marksheet and Certificate)"
              placeholder="10th/HSC"
              limit="max size 50KB"
              id="10th/HSC-marksheet"
              name="10th_marksheet"
              setFiles={setFiles}
            />
            <UploadInput
              label="12th/SSC (Marksheet and Certificate)"
              placeholder="12th/SSC"
              limit="max size 50KB"
              id="12th/SSC-marksheet"
              name="12th_marksheet"
              setFiles={setFiles}
            />
            <UploadInput
              label="Undergraduate (Marksheet and Degree Certificate)"
              placeholder="undergraduate"
              limit="max size 50KB"
              id="undergraduate"
              name="ug_result"
              setFiles={setFiles}
            />
            <UploadInput
              label="Postgraduate (Marksheet and Degree Certificate)"
              placeholder="postgraduate"
              limit="max size 50KB"
              id="postgraduate"
              name="pg_result"
              setFiles={setFiles}
            />
            <UploadInput
              label="Resume/CV"
              placeholder="resume"
              limit="max size 50KB"
              id="resume"
              name="resume"
              setFiles={setFiles}
            />
          </div>
          <h2 className="py-6 font-semibold text-lg px-4">
            English Proficiecy Results
          </h2>
          <div className="xl:grid xl:grid-cols-2 gap-6">
            <UploadInput
              label="IELTS"
              placeholder="ilets"
              limit="max size 50KB"
              id="ilets"
              name="IELTS"
              setFiles={setFiles}
            />
            <UploadInput
              label="TOEFL"
              placeholder="toefl"
              limit="max size 50KB"
              id="toefl"
              name="TOEFL"
              setFiles={setFiles}
            />
            <UploadInput
              label="PTE"
              placeholder="pte"
              limit="max size 50KB"
              id="pte"
              name="PTE"
              setFiles={setFiles}
            />
            <UploadInput
              label="DUOLINGO"
              placeholder="duolingo"
              limit="max size 50KB"
              id="duolingo"
              name="DUOLINGO"
              setFiles={setFiles}
            />
          </div>
          <h2 className="py-6 font-semibold text-lg px-4">
            Other Necessary Documents
          </h2>
          <div className="xl:grid xl:grid-cols-2 gap-6">
            <UploadInput
              label="Employment Docs"
              placeholder="employment"
              limit="max size 50KB"
              id="employment"
              name="employment_docs"
              setFiles={setFiles}
            />
            <UploadInput
              label="Statement of purpose"
              placeholder="statement"
              limit="max size 50KB"
              id="statement"
              name="statement_of_purpose"
              setFiles={setFiles}
            />
            <UploadInput
              label="Letter of Recomendation"
              placeholder="recomendation"
              limit="max size 50KB"
              id="recomendation"
              border={false}
              name="letter_of_recommendation"
              setFiles={setFiles}
            />
          </div>
          <div className="relative w-fit m-auto grid place-content-center mt-6">
            <button
              className="px-10 py-2 w-fit rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="submit"
            >
              Upload
            </button>
            <span
              className={
                btnCover
                  ? "absolute cursor-wait bg-slate-100 bg-opacity-40 scale-110 w-full h-full top-0 left-0"
                  : "hidden"
              }
            ></span>
          </div>
          <p className="text-center text-sm font-medium py-2 text-red-600">
            {validation}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
