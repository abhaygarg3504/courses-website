import React, { useEffect, useState } from "react";

const ToggleSwitch = (props) => {
const [On, setOn] = useState(false)
useEffect(() => {
  setOn(props.toogle)
}, [props.toogle])

  return (
    <div className="toogle-container">
      <div className={`w-10 h-[15px] rounded-[8px] relative bg-gray-200 transition-all duration-200 cursor-pointer ${On ? " bg-sky-400" : " bg-gray-400"}`}>
        <div className={`h-5 w-5 rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-200 ${On ? "right-0 bg-sky-600" : "left-0 bg-gray-200"} shadow shadow-black`}></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
