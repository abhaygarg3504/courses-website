import React, { useEffect, useState } from "react";
// import AdvanceSearch from './AdvanceSearch'
// import { IoMdClose } from 'react-icons/io'
import SearchBar from "./Components/SearchBar";
import axios from "axios";
import Loader from "../Components/BasicLoader";
import ReactPaginate from "react-paginate";
import Notification from "../Notifications/Notificatin";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseCard = (props) => {
  const [del, setDel] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (e) => {
    if (e) {
      setDel(false);
      if (props.authenticated) {
        try {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URI}/api/admin/courses/delete`,
              { _id: props.data._id },
              {
                withCredentials: true,
                headers: {
                  "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
                },
              }
            )
            .then((res) => {
              alert(res.data.message);
              navigate("/auth/dashboard");
            });
        } catch (error) {
          console.log(error);
          alert("OOPS some error occurred. Please try again.");
        }
      }
    }
  };

  const handleCancel = (e) => {
    setDel(e);
  };

  return (
    <div className="h-min sm:h-fit w-full flex flex-col justify-between bg-white rounded-lg shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)] transition-all duration-300">
      <div className="flex gap-3 lg:gap-6 course-detail h-fit p-2">
        <img
          className="w-16 lg:w-20 h-16 lg:h-20 object-cover"
          src="https://oeshighschool.com/wp-content/uploads/2021/12/Dec-Blog-Post-2.png"
          alt=""
        />
        <div className="course-information">
          <h2 className="course-name max-h-20 lg:max-h-24 overflow-clip text-xl lg:text-2xl font-medium">
            {props.data.Course_Name}
          </h2>
          <p className="institute-name pt-2 text-[15px] font-bold">
            {props.data.Institute_Name}
          </p>
          <p className="full_adress pt-1 text-sm font-medium">
            {props.data.Full_Address}
          </p>
          <p className="aplication-deadline pt-1 text-sm font-medium">
            Deadline :-{" "}
            <span className="text-sky-600">
              {props.data.Application_Deadline}
            </span>
          </p>
          <div className="ranking font-bold py-2 lg:py-4 text-sm">
            {props.data.Ranking}
          </div>
        </div>
      </div>
      <div>
        <div className="fees py-1 font-bold  text-xl text-center bg-gray-300 my-2">
          {props.data.Yearly_Tuition_Fees}
        </div>
        <div className="flex px-6 text-base lg:text-lg py-2 justify-between items-center">
          <Link to={`/auth/edit/course/data?${props.data._id}`}>
            <button className="px-3 py-1.5 w-fit rounded-sm bg-gradient-to-br cursor-pointer hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium">
              Edit
            </button>
          </Link>
          <button
            className="px-3 py-1.5 w-fit rounded-sm bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 cursor-pointer from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium"
            onClick={(e) => setDel(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {del ? (
        <Notification
          onDelete={handleDelete}
          handleCancel={handleCancel}
          name={"Delete"}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const EditCourse = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;
  const [result, setResult] = useState(false);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = data.slice(startIndex, endIndex);

  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    }
  }, [authenticated]);

  const handlePageChange = (selectedPage) => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setCurrentPage(selectedPage.selected);
  };

  async function fetchData() {
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/courses`, {
        withCredentials: true,
        headers: {
          "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((res) => {
        try {
          setdata(res.data);
          setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      });
  }

  const Search = (props) => {
    setIsLoading(true);
    setdata(props);
    setResult(true);
    setTotalPages(Math.ceil(props.length / itemsPerPage));
    setIsLoading(false);
  };

  useEffect(() => {
    setTotalPages(1200);
    setCurrentPage(0);
    document.getElementsByClassName(
      "previous-button"
    )[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>`;
    document.getElementsByClassName(
      "next-button"
    )[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M10.59 16.59L12 18l6-6-6-6-1.41 1.41L15.17 12z"/>
    </svg>`;
  }, []);

  return (
    <div className="min-h-screen mt-20 sm:mt-32 px-4 pb-10">
      <h2 className="w-full text-4xl font-bold text-center">Edit Course</h2>
      <SearchBar Search={Search} />
      <div
        className={
          result
            ? "result flex w-[95%] flex-col m-auto sm:w-4/5 lg:gap-6 mt-10"
            : "hidden"
        }
      >
        <div className="flex justify-between w-full sm:flex-row flex-col gap-6 items-start sm:items-center shadow-box py-2 px-4 rounded-lg bg-white">
          <p className="text-lg font-medium sm:whitespace-nowrap">
            {data.length} courses found
          </p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`card-container w-full min-h-fit gap-4 sm:gap-4 lg:gap-4 grid my-10`}
          >
            {data.length > 0 ? (
              subset.map((data, index) => {
                return isLoading ? (
                  ""
                ) : (
                  <CourseCard
                    data={data}
                    index={index}
                    authenticated={authenticated}
                    fetchData={fetchData}
                  />
                );
              })
            ) : (
              <div className="text-center text-3xl my-10 font-medium">
                No Data Found
              </div>
            )}
          </div>
        )}
        <div
          className={
            data.length > 0 && !isLoading ? "pagination mt-20" : "hidden"
          }
        >
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            breakClassName={"current"}
            previousLinkClassName={"previous-button"}
            nextLinkClassName={"next-button"}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
