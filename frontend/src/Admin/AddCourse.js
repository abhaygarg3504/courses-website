import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    }
  }, [authenticated]);

  const [formData, setFormData] = useState({
    Country: "",
    URL: "",
    Institute_Name: "",
    Institut_Logo: "",
    Full_Address: "",
    Ranking: "",
    Website_Link: "",
    Course_Name: "",
    Intakes: "",
    Duration: "",
    Campus: "",
    Course_Url: "",
    Yearly_Tuition_Fees: "",
    Application_Fees: "",
    Application_Deadline: "",
    PTE_Overall: "",
    PTE_No_Bands_Less_Than: "",
    TOEFL_iBT_Overall: "",
    TOEFL_iBT_no_Bands_Less_Than: "",
    IELTS_Overall: "",
    IELTS_no_Band_Less_Than: "",
    GRE_Score: "",
    GMAT_Score: "",
    ACT_Score: "",
    SAT_Score: "",
    DET_Score: "",
    GPA: "",
    Remarks: "",
  });

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
            `${process.env.REACT_APP_BACKEND_URI}/api/admin/courses/add`,
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
              handleReset();
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReset = (event) => {
    if (event) {
      event.preventDefault();
    }
    setFormData({
      ...formData,
      Country: "",
      URL: "",
      Institute_Name: "",
      Institut_Logo: "",
      Full_Address: "",
      Ranking: "",
      Website_Link: "",
      Course_Name: "",
      Intakes: "",
      Duration: "",
      Campus: "",
      Course_Url: "",
      Yearly_Tuition_Fees: "",
      Application_Fees: "",
      Application_Deadline: "",
      PTE_Overall: "",
      PTE_No_Bands_Less_Than: "",
      TOEFL_iBT_Overall: "",
      TOEFL_iBT_no_Bands_Less_Than: "",
      IELTS_Overall: "",
      IELTS_no_Band_Less_Than: "",
      GRE_Score: "",
      GMAT_Score: "",
      ACT_Score: "",
      SAT_Score: "",
      DET_Score: "",
      GPA: "",
      Remarks: "",
    });
  };

  const form = [
    { required: true, type: "text", name: "Country", label: "Country" },
    { required: true, type: "text", name: "URL", label: "URL" },
    {
      required: true,
      type: "text",
      name: "Institute_Name",
      label: "Institute Name",
    },
    {
      required: true,
      type: "text",
      name: "Institut_Logo",
      label: "Institut Logo",
    },
    {
      required: true,
      type: "text",
      name: "Full_Address",
      label: "Full Address",
    },
    { required: true, type: "text", name: "Ranking", label: "Ranking" },
    {
      required: true,
      type: "text",
      name: "Website_Link",
      label: "Website Link",
    },
    { required: true, type: "text", name: "Course_Name", label: "Course Name" },
    { required: true, type: "text", name: "Intakes", label: "Intakes" },
    { required: true, type: "text", name: "Duration", label: "Duration" },
    { required: true, type: "text", name: "Campus", label: "Campus" },
    { required: true, type: "text", name: "Course_Url", label: "Course Url" },
    {
      required: true,
      type: "text",
      name: "Yearly_Tuition_Fees",
      label: "Yearly Tuition Fees",
    },
    {
      required: false,
      type: "text",
      name: "Application_Fees",
      label: "Application Fees",
    },
    {
      required: true,
      type: "text",
      name: "Application_Deadline",
      label: "Application Deadline",
    },
    {
      required: false,
      type: "number",
      name: "PTE_Overall",
      label: "PTE Overall",
    },
    {
      required: false,
      type: "number",
      name: "PTE_No_Bands_Less_Than",
      label: "PTE No Bands Less Than",
    },
    {
      required: false,
      type: "number",
      name: "TOEFL_iBT_Overall",
      label: "TOEFL iBT Overall",
    },
    {
      required: false,
      type: "number",
      name: "TOEFL_iBT_no_Bands_Less_Than",
      label: "TOEFL iBT no Bands Less Than",
    },
    {
      required: false,
      type: "number",
      name: "IELTS_Overall",
      label: "IELTS Overall",
    },
    {
      required: false,
      type: "number",
      name: "IELTS_no_Band_Less_Than",
      label: "IELTS no Band Less Than",
    },
    { required: false, type: "number", name: "GRE_Score", label: "GRE Score" },
    {
      required: false,
      type: "number",
      name: "GMAT_Score",
      label: "GMAT Score",
    },
    { required: false, type: "number", name: "ACT_Score", label: "ACT Score" },
    { required: false, type: "number", name: "SAT_Score", label: "SAT Score" },
    { required: false, type: "number", name: "DET_Score", label: "DET Score" },
    { required: true, type: "text", name: "GPA", label: "GPA" },
    { required: true, type: "text", name: "Remarks", label: "Remarks" },
  ];
  return (
    <div className="min-h-screen mt-20 sm:mt-32 px-4">
      <h2 className="w-full text-4xl font-bold text-center">Add Course</h2>
      <div className="add-course">
        <form
          action=""
          className=" border-2 w-full border-gray-400 rounded-md my-4 p-4"
          onReset={handleReset}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.map((data, index) => {
              return (
                <li className="email flex flex-col relative w-full" key={index}>
                  <label
                    className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
                    htmlFor={`add-course-${index}`}
                  >
                    {data.label}
                  </label>
                  <input
                    type={data.type}
                    id={`add-course-${index}`}
                    required={data.required}
                    autoComplete="off"
                    value={formData[data.name]}
                    className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
                    autoFocus={false}
                    name={data.name}
                    placeholder={data.label}
                    onChange={handleChange}
                  />
                </li>
              );
            })}
          </ul>
          <div className="w-full flex justify-center my-4">
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

export default AddCourse;
