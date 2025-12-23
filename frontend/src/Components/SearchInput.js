/* eslint-disable no-alert, no-console */

import React, { useEffect, useRef, useState } from "react";
import data from "../Data/FilterData.js";
import "../Style/select.css";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/material";
import PopUpContainer from "./PopUpContainer.js";

const defaultProps = {
  error: false,
  filterValue: {
    country: "",
    course: "",
    year: "",
  },
};

const SearchInput = ({
  error = defaultProps.error,
  filterValue = defaultProps.filterValue,
  setFilterValue,
  handleSubmit,
}) => {
  const [year, setYear] = useState([]);
  const [reason, setReason] = useState("Hire councellor");
  const [showPopUp, setShowPopUp] = useState(false);

  // getting options for filter dropdown
  const Year = () => {
    let year = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      year.push(`${date.getFullYear() + i}`);
    }
    setYear(year);
  };

  useEffect(() => {
    Year();
  }, []);

  return (
    <div className="filter-courses lg:w-fit lg:m-auto flex flex-col items-center lg:items-end justify-center relative mb-16">
      <p
        className={
          error ? "pt-3 font-medium text-center text-green-400" : "hidden"
        }
      >
        Please enter any course or country to search.
      </p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="filter-tags-container bg-white bg-opacity-100 relative z-20 flex flex-col justify-between items-center lg:items-end lg:flex-row lg:w-fit sm:w-[90%] w-[95%]  px-6 sm:gap-10 gap-4 mt-4 py-6 shadow-box rounded-lg"
      >
        <div className="flex gap-6 md:flex-row flex-col md:w-fit w-full">
          <div className="search-courses w-full md:w-80">
            <p className="pb-2">Courses</p>
            <input
              className="p-[7px_11px] w-full border-[1px] border-gray-300 rounded-md font-medium outline-none"
              placeholder="Search for Courses"
              type="search"
              value={filterValue.course}
              onChange={(e) => {
                setFilterValue((state) => {
                  return {
                    ...state,
                    course: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="country w-full md:w-52">
            <p className="pb-2">Country</p>
            <Autocomplete
              style={{
                width: "100%",
              }}
              sx={{
                display: "inline-block",
                "& input": {
                  width: "100%",
                  bgcolor: "background.paper",
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                },
              }}
              onChange={(event, value) =>
                setFilterValue((state) => {
                  return {
                    ...state,
                    country: value || "",
                  };
                })
              }
              value={filterValue.country || null}
              id="custom-input-demo"
              options={data.Country}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    style={{
                      padding: "7px 11px",
                      width: "100%",
                      borderWidth: "1px",
                      borderColor: "rgb(209 213 219 )",
                      outline: "none",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                    placeholder="Country"
                    {...params.inputProps}
                  />
                </div>
              )}
            />
          </div>
          <div className="year">
            <p className="pb-2">Year</p>
            <div className="md:w-[100px] w-full">
              <Autocomplete
                style={{
                  width: "100%",
                }}
                sx={{
                  display: "inline-block",
                  "& input": {
                    width: "100%",
                    bgcolor: "background.paper",
                    color: (theme) =>
                      theme.palette.getContrastText(
                        theme.palette.background.paper
                      ),
                  },
                }}
                onChange={(event, value) =>
                  setFilterValue((state) => {
                    return {
                      ...state,
                      year: value,
                    };
                  })
                }
                value={filterValue.year || null}
                id="custom-input-demo"
                options={year}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      style={{
                        padding: "7px 11px",
                        width: "100%",
                        borderWidth: "1px",
                        borderColor: "rgb(209 213 219 )",
                        outline: "none",
                        borderRadius: "6px",
                        fontWeight: "500",
                      }}
                      placeholder="Year"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="filter-button flex items-end lg:my-0 justify-self-start lg:justify-end">
          <button
            type="submit"
            className="p-[6px_11px] shadow-md shadow-gray-400 w-52 lg:w-32 m-auto lg:m-0 items-center transition-all duration-200  rounded-lg text-white bg-[#0097B2] hover:bg-[#00A9C7] font-medium  cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex gap-6">
        <div
          className="p-[6px_20px] shadow-md shadow-gray-400 text-sm whitespace-nowrap w-fit mt-4 items-center  transition-all duration-200  rounded-lg text-white bg-[#ff7675] hover:bg-[#e17055] font-medium  cursor-pointer "
          onClick={(e) => {
            setShowPopUp(true); setReason("IELTS taining");
          }}
        >
          Need IELTS training ?
        </div>
        <div
          className="p-[6px_20px] shadow-md shadow-gray-400 text-sm whitespace-nowrap w-fit mt-4 items-center  transition-all duration-200  rounded-lg text-white bg-[#ff7675] hover:bg-[#e17055] font-medium  cursor-pointer "
          onClick={(e) => {
            setShowPopUp(true); setReason("Hire councellor");
          }}
        >
          Need Councelling
        </div>
      </div>
      {showPopUp && (
        <PopUpContainer
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          reason={reason}
        />
      )}
    </div>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  error: PropTypes.bool,
  filterValue: PropTypes.shape({
    country: PropTypes.string,
    course: PropTypes.string,
    year: PropTypes.string,
  }),
  setFilterValue: PropTypes.func,
  handleSubmit: PropTypes.func,
};
