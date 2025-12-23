import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../Notifications/Notificatin";
import { useSelector } from "react-redux";

const Table = (props) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [formData, setFormData] = useState({
    _id: props.data._id,
    name: "-",
    tags: "-",
    salary: "-",
    link: "-",
  });

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
          .post(`${process.env.REACT_APP_BACKEND_URI}/api/job/edit`, formData, {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              alert(res.data.message);
              setEdit(false);
              navigate("/auth/dashboard");
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

  const handleDelete = (e) => {
    if (e) {
      setDel(false);
      if (props.authenticated) {
        try {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URI}/api/job/delete`,
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

  useEffect(() => {
    setFormData({
      ...formData,
      name: props.data.name,
      tags: props.data.tags,
      salary: props.data.salary,
      link: props.data.link,
    });
  }, [props.data]);

  return (
    <tr>
      <td className="border-2 border-black py-2 px-4">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none whitespace-nowrap"
            required
            value={formData.name || "-"}
            name="name"
          />
        ) : (
          `${formData.name || "-"}`
        )}
      </td>
      <td className="border-2 border-black py-2 px-4">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.tags || "-"}
            name="text"
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {formData.tags.split(",").map((tag, index) => {
              return (
                <span key={index} className="bg-gray-400 rounded-3xl px-6 py-1">
                  {tag || "-"}
                </span>
              );
            })}
          </div>
        )}
      </td>
      <td className="border-2 border-black py-2 px-4 whitespace-nowrap">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.salary || "-"}
            name="salary"
          />
        ) : (
          `${formData.salary || "-"}`
        )}
      </td>
      <td className="border-2 border-black py-2 px-4 text-sky-600 underline max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">
        {edit ? (
          <input
            type="text"
            onChange={handleChange}
            className="h-full w-full outline-none border-none"
            required
            value={formData.link || "-"}
            name="link"
          />
        ) : (
          <a target="_blank" href={`${formData.link}`}>
            {formData.link || "-"}
          </a>
        )}
      </td>
      <td className="border-2 border-black text-2xl py-2 cursor-pointer px-4">
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
          <div className="flex flex-nowrap gap-6">
            <MdOutlineEdit className="m-auto" onClick={(e) => setEdit(true)} />
            <MdDelete onClick={(e) => setDel(true)} />
          </div>
        )}
      </td>
      {/* Delete Notification */}
      {del && (
        <Notification
          onDelete={handleDelete}
          handleCancel={handleCancel}
          name={"Delete"}
        />
      )}
    </tr>
  );
};

const EditJob = () => {
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

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/job/data`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setdata(res.data.job);
        });
    } catch (error) {
      alert("OOps some error occurred. Please try again.");
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
        <h2 className="w-full text-4xl font-bold text-center">Edit Job</h2>
      </div>
      <div className="table-container w-full overflow-x-scroll">
        <table className="w-full min-w-[800px] m-auto h-full my-6 ">
          <thead>
            <tr>
              <th className="border-2 border-black py-2 px-4">Job Name</th>
              <th className="border-2 border-black py-2 px-4 ">Tags</th>
              <th className="border-2 border-black py-2 px-4">Salary</th>
              <th className="border-2 border-black py-2 px-4">Link</th>
              <th className="border-2 border-black py-2 w-24 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length
              ? data.map((data, index) => {
                  return (
                    <Table
                      data={data}
                      authenticated={authenticated}
                      fetchData={fetchData}
                    />
                  );
                })
              : "-"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditJob;
