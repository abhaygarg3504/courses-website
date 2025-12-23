import React, { useEffect } from "react";

const ImageInput = ({
  label = "label",
  placeholder = "palceholder",
  id = "id",
  limit = "limit",
  border = true,
  required = false,
  name = "",
  setFiles,
  reset,
  setreset,
}) => {
  const handleBrowse = () => {
    const inp = document.getElementById(id);
    inp.click();
    inp.addEventListener("change", handleChange);
  };

  const handleChange = (e) => {
    if (!e) {
      document.getElementById("filename-" + id).innerHTML = "No file choosen";
      document.getElementById("preview-" + id).innerHTML = `preview`;
      document.getElementById("big-img-" + id).innerHTML = ``;
      return;
    }
    let errElem = document.getElementById("error-" + id);
    let file = e.target.files[0];
    if (file.size < 5 * 1024 * 1024 && file.type.split("/")[0] === "image") {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFiles((prev) => {
          return {
            ...prev,
            thumbnail: event.target.result,
          };
        });
      };
      reader.readAsDataURL(file);
      errElem.style.display = "none";
      document.getElementById("filename-" + id).innerHTML = file.name;
      let src = (window.URL ? URL : webkitURL).createObjectURL(file);
      document.getElementById(
        "preview-" + id
      ).innerHTML = `<img src="${src}" classname="h-full w-full object-cover" alt="${id} image preview" />`;
      document.getElementById(
        "big-img-" + id
      ).innerHTML = `<img src="${src}" classname=" h-full w-full max-h-4/5 max-w-4/5 object-cover" alt="${id} image preview"/>`;
    } else {
      if (file.size > 51200) {
        errElem.style.display = "block";
        errElem.innerHTML = "max size exceed*";
      } else {
        errElem.style.display = "block";
        errElem.innerHTML = "file type is not image*";
      }
    }
  };

  function showBigImage() {
    let elem = document.getElementById("big-img-" + id);
    elem.style.display = "flex";
    document.addEventListener("click", (e) => {
      if (e.target === elem) {
        elem.style.display = "none";
      }
    });
  }

  useEffect(() => {
    if (reset) {
      handleChange();
      setreset(false);
    }
  }, [reset]);

  return (
    <div
      className={`p-4 flex sm:flex-row gap-4 flex-col justify-between items-center w-full ${
        border && "border-b-2 border-gray-200"
      }`}
    >
      <div className="input-field flex flex-col gap-4 w-full">
        <label htmlFor={id} className="">
          {label}
          {required && <span className=" text-red-600">*</span>}{" "}
          <span className="text-xs text-green-600">({limit})</span>
        </label>
        <div className="fake-input relative flex gap-4 border-2 items-center py-1 px-2 rounded-md w-full sm:w-[450px] border-gray-400">
          <span
            className="bg-green-400 py-1 px-2 whitespace-nowrap rounded-sm cursor-pointer"
            onClick={handleBrowse}
          >
            Browse Document
          </span>
          <p
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
            id={"filename-" + id}
          >
            No File Choosen
          </p>
          <input
            className="opacity-0 relative -z-10 w-0 h-0 hidden"
            required
            type="file"
            id={id}
          />
        </div>
        <div
          className="error hidden text-xs text-red-600 leading-3"
          id={"error-" + id}
        >
          max size excceeded*
        </div>
      </div>
      <div
        className="preview border-2 cursor-pointer overflow-hidden border-dashed border-gray-400 h-36 w-28 grid place-content-center italic"
        id={"preview-" + id}
        onClick={showBigImage}
      >
        preview
      </div>
      <div
        className="image-big hidden justify-center items-center fixed top-0 left-0 w-full h-full z-[99999] bg-black bg-opacity-80"
        id={"big-img-" + id}
      ></div>
    </div>
  );
};

export default ImageInput;
