/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import "../../Style/select.css";
import axios from "axios";

let filterValue = {
  course: "",
  university: [""],
  year: "",
  multiplier: 1,
};

const onChange = (e) => {
  if (e.search === "University") {
    filterValue.university = e.value;
  }
  if (e.search === "Year") {
    filterValue.year = e.value;
  }
};

const Icon = ({ isOpen }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="#222"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isOpen ? "translate" : ""}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

const CustomSelect = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onClick,
  align,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      onChange({ value: selectedValue, search: placeHolder });
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option, index) => (
            <div key={`${option}-${index}`} className="dropdown-tag-item">
              {option}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    onChange({ value: selectedValue, search: placeHolder });
    return selectedValue;
  };

  const removeOption = (option, e) => {
    return selectedValue.filter((o) => o !== option);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
  };

  const onItemClick = (option, e) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.indexOf(option) >= 0) {
        newValue = removeOption(option, e);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      if (selectedValue === option) {
        newValue = "";
      } else {
        newValue = option;
      }
    }
    setSelectedValue(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o === option).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue === option;
  };

  const onSearch = (e) => {
    onClick(e.target.value);
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options;
  };

  return (
    <div className="custom--dropdown-container m-auto relative lg:w-max w-full">
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="dropdown-input lg:w-[200px] w-full"
      >
        <div
          className={`dropdown-selected-value font-medium text-base capitalize whitespace-nowrap max-w-80% overflow-x-clip ${
            !selectedValue || selectedValue.length === 0 ? "placeholder" : ""
          }`}
        >
          {getDisplay()}
        </div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon isOpen={showMenu} />
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          className={`dropdown-menu shadow-box left-1/2 -translate-x-1/2 max-w-full overflow-hidden lg:w-[480px] w-full sm:w-fit min-w-[300px]`}
        >
          {isSearchable && (
            <div className="search-box ">
              <input
                placeholder={placeHolder}
                className="form-control"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          {getOptions().map((option, e) => (
            <div
              onClick={() => onItemClick(option, e)}
              key={e}
              className={`dropdown-item capitalize text-base whitespace-nowrap ${
                isSelected(option, e) && "select"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchBar = (props) => {
  const [year, setYear] = useState([]);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  async function filter() {
    filterValue.course = course;
    console.log(filterValue);
    if (filterValue.university.length || filterValue.course.length) {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/courses/search`, {
          params: filterValue,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          props.Search(res.data);
        });
    }
  }

  const Year = () => {
    let year = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      year.push(date.getFullYear() + i);
    }
    setYear(year);
  };

  const universityList = (e) => {
    try {
      let option = [];
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URI}/api/list/all/university/?q=${e}`,
          {
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          res.data.map((e) => {
            option.push(e.Institute_Name);
          });
          setCourses(option);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Year();
  }, []);

  return (
    <div className="filter-courses flex flex-col items-center justify-center relative">
      <div className="filter-tags-container bg-white relative z-20 lg:flex lg:flex-row sm:grid sm:grid-cols-2  w-[95%] sm:w-4/5 flex-col px-6 justify-center sm:gap-10 gap-4 xl:w-fit lg:w-fit mt-4 py-6 shadow-box rounded-lg">
        <div className="country">
          <p className="py-2">Course</p>
          <input
            className="p-[7px_11px] w-full border-[1px] border-gray-300 rounded-md font-medium outline-none"
            placeholder="Search for Courses"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="country">
          <p className="py-2">University</p>
          <CustomSelect
            placeHolder="University"
            options={courses}
            isMulti={false}
            isSearchable={true}
            align="left"
            onClick={universityList}
          />
        </div>
        <div className="year">
          <p className="py-2">Year</p>
          <CustomSelect
            placeHolder="Year"
            options={year}
            isMulti={false}
            isSearchable={true}
            align="right"
            onClick={(e) => ""}
          />
        </div>
        <div className="filter-button flex items-end lg:my-0 mt-6 justify-self-start lg:justify-end">
          <button
            className="py-2 w-52 lg:w-32 m-auto lg:m-0 items-center border-2 border-black rounded-lg bg-sky-500 text-white cursor-pointer"
            onClick={(e) => {
              filter();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
