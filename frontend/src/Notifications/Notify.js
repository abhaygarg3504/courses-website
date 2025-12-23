/* eslint-disable*/

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Actions/CartActions";
import NotificationAction from "../Actions/NotificationAction";
import { useLocation } from "react-router-dom";

const Notify = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { length } = useSelector((state) => state.cart);
  const { showNotification } = useSelector((state) => state.notify);
  let timerID = useRef();

  function changeTimer() {
    clearTimeout(timerID.current);
    dispatch(NotificationAction("HIDE"));
  }

  function timer() {
    if (showNotification) {
      clearTimeout(timerID.current);
      timerID.current = setTimeout(changeTimer, 1000*60);
    }
  }

  useEffect(()=>{
    changeTimer()
  },[location.pathname])

  useEffect(() => {
    timer();
  }, [length]);

  return (
    <div
      className={
        showNotification && length
          ? "w-fit m-auto h-fit fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] "
          : "hidden"
      }
    >
      <div
        className={`bg-white w-[95vw] whitespace-nowrap gap-4 shadow-md shadow-gray-600 m-auto sm:w-96 flex items-center justify-between px-4 font-medium  rounded-md py-3`}
      >
        <p>{length} {length !== 1 ? "courses" : "course"} in cart</p>
        <button
          className="py-2 bg-sky-400 shadow-md shadow-gray-400 text-white cursor-pointer px-4 rounded-md"
          onClick={(e) => {
            dispatch(cartActions("SHOW_CART"));
          }}
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default Notify;
