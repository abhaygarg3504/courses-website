import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    _id: "",
    question: "",
    answer: "",
  });
  const [edit, setEdit] = useState(false);
  const [Delete, setDelete] = useState(false);

  function moveCursorToEnd(id) {
    let input = document.getElementById(id);
    input.setSelectionRange(input.value.length, input.value.length); // Set cursor position to the end of the input value
    if (id === "answer-" + props.data._id) {
      input.scrollTop = input.scrollHeight;
    } else {
      input.scrollLeft = input.scrollWidth;
    }
  }

  const handleEdit = () => {
    setEdit(true);
    setData({
      ...data,
      _id: props.data._id,
      question: props.data.question,
      answer: props.data.answer,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (props.authenticated) {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URI}/api/admin/faq/edit`,
            data,
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
              props.submit();
            } else {
              alert(res.data.message);
            }
          });
      } catch (error) {
        console.log(error);
        alert("OOPS some error occurred. Please try again.");
      }
    }
  };

  const handleDelete = () => {
    setDelete(true);
    if (props.authenticated) {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URI}/api/admin/faq/delete`,
            { _id: props.data._id },
            {
              withCredentials: true,
              headers: {
                "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            props.submit();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[95%] sm:w-4/5 my-6 m-auto">
      <div className="flex gap-4 justify-end">
        {edit ? (
          <button
            className="px-3 py-1.5 w-fit rounded-sm bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium"
            onClick={handleSubmit}
          >
            Save
          </button>
        ) : (
          <i
            className="p-1.5 cursor-pointer border-2 border-gray-600"
            onClick={handleEdit}
          >
            <MdOutlineEdit className="text-xl" />
          </i>
        )}
        <i
          className="p-1.5 cursor-pointer border-2 border-gray-600"
          onClick={handleDelete}
        >
          <MdOutlineDelete className="text-xl" />
        </i>
      </div>
      <div
        className={
          open
            ? "faq-card p-3 sm:p-6 border-sky-600 border-[1px] rounded-xl my-2 w-full m-auto cursor-pointer"
            : "faq-card cursor-pointer p-3 sm:p-6 border-gray-400 border-[1px] rounded-xl my-2  w-full m-auto"
        }
        onClick={(e) => setOpen(!open)}
      >
        <div>
          {edit ? (
            <input
              onChange={handleChange}
              onClick={(e) => moveCursorToEnd("question-" + props.data._id)}
              value={data.question}
              type="text"
              id={`question-${props.data._id}`}
              name="question"
              className={
                "question w-full outline-none text-sm sm:text-lg  font-bold flex justify-between items-center"
              }
            />
          ) : (
            <div
              className={
                open
                  ? "question text-sm sm:text-lg  font-bold flex justify-between items-center text-sky-600"
                  : "question text-sm sm:text-lg  font-bold flex justify-between items-center"
              }
            >
              {props.data.question}
              <FaChevronDown
                className={
                  open
                    ? "rotate-180 transition-all duration-300 ease-in-out"
                    : "rotate-0  transition-all duration-300 ease-in-out"
                }
              />
            </div>
          )}
        </div>
        <div>
          {edit ? (
            <textarea
              onChange={handleChange}
              onClick={(e) => moveCursorToEnd("answer-" + props.data._id)}
              value={data.answer}
              className={
                "sm:text-base text-xs max-h-96 outline-none border-none overflow-hidden mt-8 leading-8 transition-all duration-300 opacity-100 ease-in-out w-full"
              }
              name="answer"
              id={`answer-${props.data._id}`}
            ></textarea>
          ) : (
            <div
              className={
                open
                  ? "answer sm:text-base text-xs max-h-96 overflow-hidden pt-8 leading-8 transition-all duration-300 opacity-100 ease-in-out"
                  : "max-h-0 sm:text-base text-xs pt-0 leading-8 opacity-0 overflow-hidden transition-all duration-300 ease-in-out"
              }
            >
              {props.data.answer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditFaq = () => {
  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    } else {
      fetchData();
    }
  }, [authenticated]);

  const [faqData, setFaqData] = useState([]);

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/faqs`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setFaqData(res.data);
        });
    } catch (error) {
      toast.error("Some erro occurred");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-20 sm:mt-32 px-4 py-10">
      <h2 className="w-full text-4xl font-bold text-center">Edit Faq</h2>
      <div className="faqs-container">
        {faqData.map((data, index) => {
          return (
            <Card
              data={data}
              submit={fetchData}
              authenticated={authenticated}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-6">
        <button className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFaq;
