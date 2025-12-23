import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Table = (props) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    _id: props.data._id,
    username: "-",
    email: "-",
    number: "-",
    country: "-",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (props.authenticated) {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URI}/api/user/edit`,
            formData,
            {
              withCredentials: true,
              headers: {
                "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              alert(res.data.message);
              setEdit(false);
              navigate("/auth/student");
            } else {
              alert(res.data.message);
              alert("OOPS some error occurred. Please try again.");
            }
          });
      } catch (error) {
        alert("OOPS some error occurred. Please try again.");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      username: props.data.username,
      email: props.data.email,
      number: props.data.number,
      country: props.data.country,
    });
  }, [props.data]);

  return (
    <tr>
      <td className="border-2 border-black py-2 px-4">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.username || "-"}
            name="username"
          />
        ) : (
          `${formData.username || "-"}`
        )}
      </td>
      <td className="border-2 border-black py-2 px-4 text-sky-600 underline">
        {edit ? (
          <input
            type="email"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.email || "-"}
            name="email"
          />
        ) : (
          <a href={`mailto:${formData.email}`}>{formData.email || "-"}</a>
        )}
      </td>
      <td className="border-2 border-black py-2 px-4">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.number || "-"}
            name="number"
          />
        ) : (
          `${formData.number || "-"}`
        )}
      </td>
      <td className="border-2 border-black py-2 px-4">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.country || "-"}
            name="country"
          />
        ) : (
          `${formData.country || "-"}`
        )}
      </td>
      <td className="border-2 border-black text-2xl py-2 cursor-pointer px-4 ">
        {edit ? (
          <div className="flex flex-nowrap gap-6">
            <button
              className=" text-center h-min w-full text-sky-400 text-base cursor-pointer"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className=" text-center h-min w-full text-red-500 text-base cursor-pointer"
              onClick={(e) => setEdit(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <MdOutlineEdit className="m-auto" onClick={(e) => setEdit(true)} />
        )}
      </td>
    </tr>
  );
};

const Student = () => {
  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    } else {
      fetchData();
    }
  }, [authenticated]);

  const [searchBox, setSearchBox] = useState("-");
  const [data, setdata] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (authenticated) {
      try {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URI}/api/user/search?q=${searchBox}`,
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
        toast.error("OOPS some error occurred. Please try again.");
      }
    }
  };

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/user/data`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setdata(res.data);
        });
    } catch (error) {
      toast.error("OOPS some error occurred. Please try again.");
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchBox(value);
  };

  return (
    <div className="min-h-screen mt-20 sm:mt-32 px-4">
      <div className="relative w-full h-fit">
        <h2 className="w-full text-4xl font-bold text-center">Users</h2>
      </div>
      <div className="w-full h-fit flex justify-end pt-10">
        <form
          className="search-bar relative xl:w-80 w-72  h-min cursor-pointer border-2 border-black bg-white rounded-lg flex justify-start gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchBox.query}
            placeholder="Username|Email"
            className="px-4 py-2 w-full text-black outline-none rounded-lg font-medium"
            name="search"
            id="search-box1"
            onChange={handleChange}
          />
          <button type="submit">
            <GrSearch className=" h-full w-6 text-black mr-2" />
          </button>
        </form>
      </div>
      <div className="table-container w-full overflow-x-scroll">
        <table className="w-full min-w-[800px] m-auto h-full my-6 ">
          <thead>
            <tr>
              <th className="border-2 border-black py-2 px-4">Name</th>
              <th className="border-2 border-black py-2 px-4 ">Email</th>
              <th className="border-2 border-black py-2 px-4">Phone Number</th>
              <th className="border-2 border-black py-2 px-4">Country</th>
              <th className="border-2 border-black py-2 w-24 px-4">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.length
              ? data.map((data, index) => {
                  return <Table data={data} authenticated={authenticated} />;
                })
              : "-"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
