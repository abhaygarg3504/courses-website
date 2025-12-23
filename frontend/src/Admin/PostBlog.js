import React, { useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import ImageInput from "./Components/ImageInput";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

var modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],
  ],
};

var formats = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
];

const PostBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    thumbnail: "",
    description: "",
    blog: "",
  });
  const [warning, setWarning] = useState("");
  const { authenticated } = useSelector((state) => state.authentication);
  const quillRef = useRef();
  const [reset, setreset] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.blog.split(" ").length <= 100) {
      setWarning("Minimum 100 words are required");
      return;
    }
    if (formData.thumbnail === "") {
      setWarning("Plese select thumbnail.");
      return;
    }
    setWarning("");
    const load = toast.loading("Posting...Please wait.")
    if (authenticated) {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URI}/api/admin/blog/post`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
              },
            }
          )
          .then((res) => {
            if ((res.status === 200) & res.data.success) {
              toast.success(res.data.message,{id:load});
              handleReset();
            } else {
              toast.error(res.data.message,{id:load});
            }
          });
      } catch (error) {
        console.log(error);
        toast.error("OOPS some error occurred. Please try again.");
        handleReset();
      }
    }
  }

  function handleReset(e) {
    setreset(true);
    setFormData({
      title: "",
      tags: "",
      thumbnail: "",
      description: "",
      blog: "",
    });
    if (quillRef.current) {
      quillRef.current.getEditor().setText("");
    }
  }

  return (
    <div className=" mx-auto mt-24 lg:p-8 px-2 py-8 bg-gray-100 min-h-screen rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Post Blogs</h1>
      <form
        action="/"
        className="flex flex-col gap-4 xl:px-0 px-6"
        id="form"
        onSubmit={handleSubmit}
      >
        <div className="email flex flex-col relative w-full">
          <label
            className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            required
            value={formData.title}
            className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="email flex flex-col relative w-full">
          <label
            className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            value={formData.tags}
            required
            className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
            type="text"
            name="tags"
            id="tags"
            placeholder="course,IELTS training,australia"
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  tags: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="email flex flex-col relative w-full">
          <label
            className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
            htmlFor="discription"
          >
            Discription
          </label>
          <input
            required
            value={formData.description}
            className="px-4 py-2 border-gray-600 rounded-lg outline-none border-2"
            type="text"
            name="discription"
            id="discription"
            placeholder="Description"
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
        </div>
        <ImageInput
          label="Thumbnail"
          placeholder="thumbnail"
          id="thumbnail"
          setFiles={setFormData}
          limit={50 * 1024 * 1024}
          border={true}
          name="thumbnail"
          required={true}
          reset={reset}
          setreset={setreset}
        />
        <div className="w-full h-fit">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="write your content ...."
            onChange={(content) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  blog: content,
                };
              });
            }}
          ></ReactQuill>
        </div>
        <div className="mt-8 grid place-content-center">
          <div className="flex gap-4">
            <button
              type="reset"
              id="reset"
              className=" bg-blue-400 text-white py-1 px-6 rounded-md shadow-md shadow-gray-600 "
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              id="submit"
              className=" bg-blue-400 text-white py-1 px-6 rounded-md shadow-md shadow-gray-600 "
            >
              Post
            </button>
          </div>
        </div>
        <p className=" text-xs mt-3 font-semibold text-red-600 text-center">
          {warning}
        </p>
      </form>
    </div>
  );
};

export default PostBlog;
