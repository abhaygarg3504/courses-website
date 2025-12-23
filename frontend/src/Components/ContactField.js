import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Suffix from "../Data/SuffixCode";
import CountryFlag from "../Data/CountryFlag";

const defaultProps = {
  country: "India",
  number: "",
};

const ContactField = ({
  country = defaultProps.country,
  number = defaultProps.number,
  setFormData,
}) => {
  const [selctedValue, setSelectedValue] = useState("+91");
  const [dropDown, setDropDown] = useState(false);
  const [data, setData] = useState([]);
  let previosValue = "";

  const changeOption = () => {
    const elem = document.getElementById("selectCode");
    elem.addEventListener("keyup", (e) => {
      if (e.key === "Backspace") {
        elem.value = "";
        setData(countryData());
        return;
      }
    });
    if (elem.value === "") {
      setData(countryData());
    } else {
      if (elem.value.length > previosValue) {
        let data1 = countryData();
        data1 = data1.filter((element) => {
          return element.name.toLowerCase().includes(elem.value.toLowerCase());
        });
        setData(data1);
      }
      previosValue = elem.value;
    }
  };

  useEffect(() => {
    const elem = document.getElementById("selectCode");
    if (dropDown) {
      elem.focus();
    } else {
      elem.blur();
    }
  }, [dropDown]);

  const selectCode = (e) => {
    window.addEventListener("click", handleClick, true);
    setData(countryData());
    setDropDown(!dropDown);
  };

  function handleClick(e) {
    const selectCode = document.getElementById("select-code");
    const elem = document.getElementById("selectCode");
    if (e.target !== selectCode) {
      setDropDown(false);
      window.removeEventListener("click", handleClick, true);
    }
    elem.value = "";
  }

  function compareByName(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  const countryData = () => {
    let data1 = [];
    CountryFlag.forEach((elem) => {
      let pos2 = Suffix.findIndex((obj) => obj.label === elem.name);
      if (pos2 >= 0) {
        let info = {
          name: elem.name,
          flag: elem.flag,
          suffix: elem.suffix,
          length: Suffix[pos2].phoneLength,
        };

        data1.push(info);
      }
    });
    data1.sort(compareByName);
    return data1;
  };

  useEffect(() => {
    setData(countryData());
  }, []);

  return (
    <div className="w-full h-fit">
      <input
        type="text"
        className="scale-0 opacity-0 absolute"
        id="selectCode"
        onChange={changeOption}
      />
      <div className="mobile-number flex flex-col relative w-full">
        <ul
          className={`${
            dropDown ? " scale-y-100 opacity-100" : " scale-y-0 opacity-0"
          } my-12 h-fit cursor-pointer transition-all duration-500 origin-top  rounded-lg scroll bg-white absolute overflow-x-hidden z-[999] border-2 border-gray-600 w-full max-h-80 overflow-y-scroll`}
          name="code"
          id="code"
        >
          {data.length ? data.map((data, index) => {
            return (
              <li
                className="flex justify-between p-2 border-b-2 border-gray-400 hover:bg-gray-300  transition-all duration-150 ease-in cursor-pointer"
                id={`country-${index}`}
                onClick={(e) => {
                  setSelectedValue(data.suffix);
                  setFormData((prev) => {
                    return {
                      ...prev,
                      country: data.name,
                    };
                  });
                  setDropDown(false);
                }}
              >
                <div>
                  <h2 className="font-semibold">{data.name}</h2>
                  <p className="text-gray-600 text-sm">{data.suffix}</p>
                </div>
                <img className="object-contain w-12" src={data.flag} alt="" />
              </li>
            );
          }):
          <li className=" p-2 border-b-2 border-gray-400 hover:bg-gray-300  transition-all duration-150 ease-in cursor-pointer">No Option</li>
          }
        </ul>
        <label
          className="text-xs font-medium text-gray-600 absolute top-0 bg-gray-50 -translate-y-1/2 left-2 px-1"
          htmlFor="email"
        >
          Phone Number
        </label>
        <div className="border-gray-600  flex justify-start rounded-lg outline-none border-2 overflow-hidden">
          <div
            className="pl-4 pr-2 py-2 flex items-center gap-3 cursor-pointer text-gray-500"
            onClick={selectCode}
            id="select-code"
          >
            {selctedValue}
            <FaChevronDown
              className={`${
                dropDown ? "rotate-180" : ""
              } text-sm transition-all duration-200 ease-in `}
            />
          </div>
          <input
            required
            value={number}
            className="px-4 py-2 outline-none text-base border-none w-full"
            type="tel"
            name="phone-number"
            id="phone-number"
            placeholder="6395281174"
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  number: e.target.value,
                };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactField;
