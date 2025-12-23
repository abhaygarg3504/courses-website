import React from "react";
import { PiShoppingCart } from "react-icons/pi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsCartDashFill } from "react-icons/bs";

const CartButton = ({ added=false }) => {
  return (
    <div className="bg-sky-400 hover:bg-sky-500  text-white  px-3 cursor-pointer shadow-md shadow-gray-400 items-center rounded flex gap-3">
      {added ? (
        <>
          <BsCartDashFill className="text-xl" />
          <span className="text-xs leading-3 max-w-[84px] my-1.5 uppercase text-center font-medium text-wrap">Remove from Cart</span>
        </>
      ) : (
        <>
          <BsFillCartPlusFill className="text-xl" />
          <span className="text-sm font-medium uppercase my-2">Add To Cart</span>
        </>
      )}
    </div>
  );
};

export default CartButton;
