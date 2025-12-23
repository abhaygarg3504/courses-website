import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    } else {
      fetchData();
    }
  }, [authenticated]);

  const [data, setdata] = useState([
    {
      username: "",
      email: "",
      number: "",
      address: "",
    },
  ]);

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/admin/profile`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setdata(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    if (authenticated) {
      try {
        axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/logout`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100 sm:pt-32 px-4">
      <h2 className="w-full text-4xl font-bold text-center">Profile</h2>
      <div className="add-course lg:w-4/5 w-[95%] gap-6 my-10 m-auto flex sm:flex-row flex-col">
        <div className="bg-white py-4 rounded-lg w-[95%] m-auto sm:m-0 sm:w-96 h-fit">
          <img src="/images/WebsiteLogo1.png" alt="" />
          <div className="flex pt-3 flex-col justify-center gap-3">
            <p className="text-gray-400 text-base  text-center">
              {data[0].username}
            </p>
            <p className="text-gray-400 text-base  text-center">
              My Global Consultant
            </p>
            <button
              className="bg-sky-400 py-2 px-3 rounded-sm text-white m-auto w-min"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg w-full">
          <div className="p-4 border-b-[1px] border-gray-400">
            <p className="text-gray-600 pb-2">Name</p>
            <p className="text-gray-400">{data[0].username}</p>
          </div>
          <div className="p-4 border-b-[1px] border-gray-400">
            <p className="text-gray-600 pb-2">Email</p>
            <p className="text-gray-400">{data[0].email}</p>
          </div>
          <div className="p-4 border-b-[1px] border-gray-400">
            <p className="text-gray-600 pb-2">Phone Number</p>
            <p className="text-gray-400">{data[0].number}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-600 pb-2">Address</p>
            <p className="text-gray-400">{data[0].address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
