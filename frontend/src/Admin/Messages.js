import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Message = (props) => {
  return (
    <div className="message rounded-lg lg:p-4 px-2 py-2 my-6 hover:shadow-sm cursor-pointer shadow-lg shadow-gray-400">
      <h1 className="name text-xl sm:text-2xl font-bold capitalize">
        {props.data.name}
      </h1>
      <a
        className="text-xs sm:text-sm font-medium text-sky-600 underline"
        href={`mailto:${props.data.email}`}
      >
        {props.data.email}
      </a>
      <p className="text-lg sm:text-xl font-bold py-2">{props.data.subject}</p>
      <div className="message text-xs sm:text-sm text-gray-600">
        {props.data.message}
      </div>
    </div>
  );
};

const Messages = () => {
  const [showSort, setshowSort] = useState(false);
  const [sorting, setSorting] = useState(5);
  const [data, setdata] = useState([]);
  const { authenticated } = useSelector((state) => state.adminAuthentication);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    } else {
      fetchData();
    }
  }, [authenticated]);

  const sortoption = (e) => {
    setSorting(e);
    setshowSort(false);
  };

  const fetchData = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URI}/api/admin/messages/data?multiplier=${sorting}`,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          setdata(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto mt-24 lg:p-8 px-2 py-8 bg-gray-100 min-h-screen rounded-lg shadow-md">
      <div
        className={
          !showSort ? "hidden" : "h-screen w-screen fixed top-0 left-0 z-30"
        }
        onClick={(e) => setshowSort(false)}
      ></div>
      <div className="relative">
        <h1 className="text-3xl font-bold mb-8 text-center">Messages</h1>
        <div className="sorting relative w-full flex justify-end">
          <p
            className="border-[1px] relative right-0 bg-white border-black px-4 py-2 flex items-center gap-3 cursor-pointer font-medium w-64 justify-between"
            onClick={(e) => setshowSort(!showSort)}
          >
            Last {sorting}
            <IoIosArrowDown />
          </p>
          <ul
            className={
              showSort
                ? "absolute mt-12 bg-white z-40 shadow-box border-[1px] border-black py-2 w-64"
                : "hidden"
            }
          >
            <li
              className="hover:bg-gray-200 px-2 cursor-pointer capitalize"
              onClick={(e) => {
                sortoption(5);
              }}
            >
              last 5
            </li>
            <li
              className="hover:bg-gray-200 px-2 cursor-pointer capitalize"
              onClick={(e) => {
                sortoption(10);
              }}
            >
              last 10
            </li>
            <li
              className="hover:bg-gray-200 px-2 cursor-pointer capitalize"
              onClick={(e) => {
                sortoption(25);
              }}
            >
              last 25
            </li>
            <li
              className="hover:bg-gray-200 px-2 cursor-pointer capitalize"
              onClick={(e) => {
                sortoption(1000);
              }}
            >
              all
            </li>
          </ul>
        </div>
      </div>
      <div className="message-container">
        {data.map((data, index) => {
          return <Message data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Messages;
