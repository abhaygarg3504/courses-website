import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddFaq = () => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    }
  }, [authenticated]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (authenticated) {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URI}/api/admin/faq/add`,
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
              handleReset();
            } else {
              alert(res.data.message);
            }
          });
      } catch (error) {
        console.log(error);
        alert("OOPS some error occurred. Please try again.");
        handleReset();
      }
    }
  };

  const handleReset = (event) => {
    if (event) {
      event.preventDefault();
    }
    setFormData({
      ...formData,
      question: "",
      answer: "",
    });
  };

  return (
    <div className="min-h-screen mt-20 sm:mt-32 px-4">
      <h2 className="w-full text-4xl font-bold text-center">Add Faq</h2>
      <div className="add-course">
        <form
          action=""
          className=" border-2 w-full border-gray-400 rounded-md my-4 p-4"
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <ul className="relative pt-6">
            <li className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="email flex flex-col relative w-full">
                <label
                  className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                  htmlFor="add-faq-question"
                >
                  Question
                </label>
                <input
                  value={formData.question}
                  required
                  className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                  type="text"
                  name="question"
                  id="add-faq-question"
                  placeholder="Question"
                  onChange={handleChange}
                />
              </div>
              <div className="email flex flex-col relative w-full">
                <label
                  className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                  htmlFor="add-faq-answer"
                >
                  Answer
                </label>
                <input
                  value={formData.answer}
                  required
                  className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                  type="text"
                  name="answer"
                  id="add-faq-answer"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
            </li>
          </ul>
          <div className="w-full flex justify-center mt-6">
            <button
              className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="reset"
            >
              Reset
            </button>
            <button
              className="px-3 py-2 w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaq;
