/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FeesSlider from "./FeesSlider";
import { FiPlus } from "react-icons/fi";

const LeftSidebarFilter = (props) => {
  const [University, setUniversity] = useState([]);
  const [fees, setFees] = useState();
  const [expanded, setExpanded] = useState(false);
  const [previousFees, setPreviousFees] = useState(100000);
  const [filterValues, setFilterValues] = React.useState({
    University: null,
    feeSorting: null,
    rankFilter: null,
    programLevel: null,
  });

  const handleCheckboxChange = (value) => {
    let array = [];
    if (filterValues.programLevel) {
      if (filterValues.programLevel.indexOf(value) === -1) {
        array = filterValues.programLevel ? filterValues.programLevel : [];
        array.push(value);
      } else {
        array = filterValues.programLevel.filter((value1) => value1 !== value);
      }
    } else {
      array.push(value);
    }
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      programLevel: array,
    }));
  };

  const handleAutocompleteChange = (event, value, filterLabel) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [filterLabel]: value,
    }));
  };

  const universityList = (e) => {
    let universities = [];
    if (props.data.length) {
      props.data.map((data, index) => {
        if (universities.indexOf(data.Institute_Name) === -1) {
          universities.push(data.Institute_Name);
        }
      });
      setUniversity(universities);
    }
  };

  const handleChange = (e) => {
    setFees(e);
  };

  const handleResetAll = () => {
    setPreviousFees(100000);
    props.setReset(!props.reset);
    setFilterValues({});
    setExpanded(false);
  };

  const feeFilter = (data, filter) => {
    data.map((data) => {
      let fee = data.Yearly_Tuition_Fees ? data.Yearly_Tuition_Fees : "0";
      fee = fee.replaceAll(",", "");
      fee = fee.replaceAll(" ", "");
      var integersArray = fee.match(/-?\d+/g);
      if (integersArray) {
        data.feeSort = parseInt(integersArray[0]);
      }
    });
    data = data.filter(function (detail) {
      return detail.feeSort <= filter;
    });
    return data;
  };

  const rankFilter = (data, filter) => {
    data.map((elem) => {
      let rank = elem.National_Ranking
        ? elem.National_Ranking
        : elem.QS_Ranking
        ? elem.QS_Ranking
        : elem.World_Ranking
        ? elem.World_Ranking
        : "9999";
      rank = parseInt(rank.split(" ")[0]);
      elem.rank = rank;
    });
    if (filter === "< 100") {
      data = data.filter(function (elem) {
        return elem.rank < 100;
      });
      return data;
    } else {
      data = data.filter((elem) => {
        return elem.rank > 100;
      });
      return data;
    }
  };

  const feeSorting = (data, filter) => {
    if (filter === "Lowest First") {
      data.sort((a, b) => {
        const value1 = a.feeSort;
        const value2 = b.feeSort;
        if (value1 < value2) {
          return -1;
        }
        if (value1 > value2) {
          return 1;
        }
        return 0;
      });
    } else {
      data.sort((a, b) => {
        const value1 = a.feeSort;
        const value2 = b.feeSort;
        if (value1 > value2) {
          return -1;
        }
        if (value1 < value2) {
          return 1;
        }
        return 0;
      });
    }

    return data;
  };

  const levelFilter = (data, filter) => {
    data = data.filter((obj) =>
      filter.some((keyword) => obj.Course_Name.includes(keyword))
    );
    return data;
  };

  const handleClick = () => {
    if (props.data.length > 0) {
      let data = props.data;
      if (filterValues.University) {
        data = data.filter((details) => {
          return details.Institute_Name === filterValues.University;
        });
      }
      data = feeFilter(data, fees);
      if (filterValues["feeSorting"]) {
        data = feeSorting(data, filterValues["feeSorting"]);
      }
      if (filterValues["rankFilter"]) {
        data = rankFilter(data, filterValues["rankFilter"]);
      }
      if (
        filterValues["programLevel"] &&
        filterValues["programLevel"].length > 0
      ) {
        data = levelFilter(data, filterValues["programLevel"]);
      }
      props.filter(data);
    }
  };

  useEffect(() => {
    handleResetAll();
    universityList();
  }, [props.data]);

  const checked = {
    label: ["Diploma", "Certificate", "Bachelor's", "Master's", "PhD"],
    value: ["Diploma", "Certificate", "Bachelor", "Master", "PhD"],
  };

  useEffect(() => {
    if (Object.keys(filterValues).length > 0 || fees !== previousFees) {
      handleClick();
      setPreviousFees(fees);
    }
  }, [filterValues, fees]);

  return (
    <>
      <div className="py-2 px-5">
        <div className="sidebar-nav flex justify-between w-full mb-2">
          <h1 className="font-semibold text-xl">Filter</h1>
          <span
            className="text-sky-600 font-medium text-sm cursor-pointer"
            onClick={handleResetAll}
          >
            Reset All
          </span>
        </div>
        <div className="sidebar-body">
          <div className="search-university py-1">
            <p className="font-semibold text-gray-600 pb-1">University</p>
            <div className="w-full pl-4">
              <Autocomplete
              PaperProps={{
                style: {
                  padding : "0",
                  maxHeight: '200px',
                  width: '250px',
                },
              }}
                disablePortal
                id="combo-box-demo"
                value={filterValues.University ? filterValues.University : null}
                options={University}
                sx={{ width: "100%",p:"1px" }}
                onChange={(event, value) => {
                  handleAutocompleteChange(event, value, "University");
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined"  label="Search University" />
                )}
              />
            </div>
          </div>
          <div className="sort py-1">
            <p className="font-semibold text-gray-600 pb-1">Sort By</p>
            <div className="w-full pl-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Fees</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterValues.feeSorting ? filterValues.feeSorting : ""}
                  label="Fees"
                  onChange={(event) => {
                    setFilterValues((prev) => {
                      return {
                        ...prev,
                        feeSorting: event.target.value,
                      };
                    });
                  }}
                >
                  <MenuItem value={"Lowest First"}>Lowest First</MenuItem>
                  <MenuItem value={"Highest First"}>Highest First</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full pl-4 py-1">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rank</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterValues.rankFilter ? filterValues.rankFilter : ""}
                  label="Rank"
                  onChange={(event) => {
                    setFilterValues((prev) => {
                      return {
                        ...prev,
                        rankFilter: event.target.value,
                      };
                    });
                  }}
                >
                  <MenuItem value={"< 100"}>{"< 100"}</MenuItem>
                  <MenuItem value={"> 100"}>{"> 100"}</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="program-level py-1">
            <p
              className="font-semibold text-gray-600 pb-1 flex justify-between cursor-pointer"
              onClick={(e) => setExpanded(!expanded)}
            >
              Program Level
            </p>
            <ul className="levels flex gap-2 flex-wrap">
              {checked.label.map((elem, index) => {
                return (
                  <li
                    className={`px-3 py-1 rounded-md text-sm my-1 cursor-pointer diploma ${filterValues.programLevel && filterValues.programLevel.indexOf(checked.value[index]) !== -1 ? "bg-gray-400" : "bg-gray-200"}`}
                    onClick={(e) => handleCheckboxChange(checked.value[index])}
                  >
                    {elem}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <FeesSlider onChange={handleChange} value={props.reset} />
        <div className="w-full flex justify-center mt-8 sm:hidden">
          <button
            className="w-32 m-auto py-2 bg-sky-600 text-white font-medium rounded-lg"
            onClick={props.sidebar}
          >
            Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarFilter;
