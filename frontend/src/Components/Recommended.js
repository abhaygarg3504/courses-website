/* eslint-disable no-alert, no-console */

import React, { useEffect, useState } from "react";
import Data from "../Data/FilterData";
import CountryFlag from "../Data/CountryFlag";

const Card = (props) => {
  return (
    <div
      className="relative h-48 overflow-hidden w-full cursor-pointer"
      onClick={(e) => props.onClick(props.data.Country)}
    >
      <img
        className="h-full w-full object-cover brightness-[0.6] hover:brightness-90 transition-all duration-150 ease-in-out"
        src={props.data.Flag}
        alt="countryFlag"
      />
      <p className="absolute bottom-4 left-4 font-bold text-3xl text-white">
        {props.data.Country}
      </p>
    </div>
  );
};

export default function Recommended() {
  const [country, setCountry] = useState([]);

  async function recommended(e) {
    window.location.href = "/search?" + e;
  }

  const setCountryFlag = () => {
    let array = [];
    Data.Country.map((country) => {
      if (country === "United States of America") {
        country = "United States";
      }
      let index = CountryFlag.findIndex((obj) => obj.name === country);
      if (index !== -1) {
        array.push({
          Country: CountryFlag[index].name,
          Flag: CountryFlag[index].flag,
        });
      }
    });
    setCountry(array);
  };

  useEffect(() => {
    setCountryFlag();
  }, []);

  return (
    <>
      <div className="grid-container grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10">
        {country.map((countryData, index) => {
          return index < 8 ? (
            <Card data={countryData} key={index} onClick={recommended} />
          ) : (
            ""
          );
        })}
      </div>
    </>
  );
}
