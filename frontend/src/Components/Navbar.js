/* eslint-disable no-alert, no-console */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { GiTrashCan } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { userAuhtentication } from "../Actions/UserAuthetication";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  cartActions,
  deleteCartItem,
  fetchCartData,
} from "../Actions/CartActions";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authenticated } = useSelector((state) => state.authentication);
  const { courses, length } = useSelector((state) => state.cart);
  const { show } = useSelector((state) => state.cartShow);
  const [ham, setHam] = useState(false);
  const [cartIndicator, setCartIndicator] = useState(false);
  const [user, setUser] = useState("");
  const [userDrop, setUserDrop] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);

  useEffect(() => {
    dispatch(userAuhtentication());
  }, [dispatch]);

  useEffect(() => {
    setHam(false);
    setUserDrop(false);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchCartData(authenticated));
    userInfo();
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      setCartIndicator(true);
      setTimeout(() => {
        setCartIndicator(false);
      }, 10000);
    }
  }, [authenticated]);

  const userInfo = async () => {
    if (authenticated) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URI}/api/user/info`,
          {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        toast.error("Some Unknown Error Occurred");
        console.log("unable to fetch user info");
      }
    }
  };

  const deleteCart = (props, index) => {
    dispatch(deleteCartItem(authenticated, props));
  };

  return (
    <>
      <div className=""></div>
      <div
        className={
          userDrop ? "fixed h-screen w-screen top-0 left-0 z-40" : "hidden"
        }
        onClick={(e) => setUserDrop(!userDrop)}
      ></div>
      <div
        className={
          "navbar shadow-[0_2px_15px_1px_#b1b1b1] flex justify-between py-3 lg:py-0 bg-white fixed top-0 z-[999] w-full transition-all duration-300 ease-linear text-gray-600 items-center"
        }
      >
        <Link to="/">
          <div className="logo h-10 pl-4 sm:pl-10 lg:pl-20 overflow-hidden lg:h-16">
            <img
              className="h-full w-full object-contain"
              src="/images/WebsiteLogo.png"
              alt=""
              e
            />
          </div>
        </Link>
        <ul className="nav-items absolute w-fit left-1/2 -translate-x-1/2 h-min hidden lg:flex justify-center lg:gap-4 xl:gap-6 items-center font-semibold cursor-pointer">
          <li className="nav-icons relative py-5 px-2 text-base text-gray-600 transition-all duration-200">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-icons about-item relative py-5 px-2 text-base text-gray-600 transition-all duration-200">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li className="nav-icons relative py-5 px-2 text-base text-gray-600  transition-all duration-200">
            <NavLink to="/faqs">FAQs</NavLink>
          </li>
          <li className="nav-icons relative py-5 px-2 text-base text-gray-600  transition-all duration-200">
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li className="nav-icons relative py-5 px-2 text-base text-gray-600  transition-all duration-200">
            <NavLink to="/jobs">Jobs</NavLink>
          </li>
          <li className="nav-icons relative py-5 px-2 text-base text-gray-600  transition-all duration-200">
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>

        <div className="flex pr-4 sm:pr-10 lg:pr-20 justify-center items-center gap-6">
          <div className="flex gap-4 sm:gap-6 items-center justify-center">
            <i
              className=" hover:text-black relative transition-all duration-200 ease-linear cursor-pointer"
              onClick={(e) => {
                dispatch(cartActions("SHOW_CART"));
                setCartIndicator(false);
              }}
            >
              <div
                className={
                  cartIndicator
                    ? "absolute top-0 mt-8 left-0 -translate-x-full whitespace-nowrap flex-col items-end hidden sm:flex"
                    : "hidden"
                }
              >
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 367.339 367.34"
                  className="h-16 w-16"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M337.591,0.932c-13.464,6.12-26.315,12.852-39.168,20.196c-11.628,6.12-25.704,12.24-35.496,21.42 c-5.508,4.896,0,15.3,7.344,12.852c0,0,0.612,0,0.612-0.612c1.836,1.224,3.061,2.448,4.896,4.284c0,0.612,0.611,1.836,0.611,2.448 c0.612,1.224,1.836,2.448,3.061,3.672c-17.748,33.048-34.272,66.096-55.08,96.696c-6.12,9.18-12.853,17.748-20.808,25.704 c-19.584-31.212-51.409-67.32-89.965-60.588c-50.796,9.18-23.256,63.647,3.06,82.008c31.212,22.644,58.14,21.42,85.068,0 c12.24,20.808,20.809,44.063,19.584,66.708c-1.836,54.468-50.796,63.647-91.8,49.571c6.12-15.912,7.956-34.271,4.284-50.184 c-6.12-28.764-50.184-54.468-75.888-34.272c-25.092,20.196,22.032,71.604,37.332,82.009c4.284,3.06,9.18,6.119,14.076,8.567 c-0.612,0.612-0.612,1.225-1.224,1.836c-28.152,44.064-65.484,6.12-82.62-25.092c-2.448-4.896-9.18-0.612-7.344,4.284 c14.076,32.436,42.84,70.38,81.396,48.348c9.18-5.508,17.136-13.464,22.644-23.256c33.66,13.464,72.829,13.464,97.308-17.136 c29.376-36.72,11.017-84.456-8.567-119.952c0.611-0.612,0.611-0.612,1.224-1.224c34.884-33.66,56.304-81.396,78.336-124.236 c4.284,3.06,9.181,6.12,13.464,9.18c3.061,1.836,7.345,1.224,9.792-1.224c17.748-20.808,31.212-45.9,35.496-73.44 C351.055,2.768,344.324-2.128,337.591,0.932z M178.471,207.787c-23.256,13.464-46.512-3.06-63.648-18.972 c-22.644-20.808-16.524-54.468,18.36-47.735c17.748,3.672,31.824,19.584,43.452,32.436c6.12,6.732,12.241,14.687,17.749,23.255 C189.488,201.056,183.979,204.728,178.471,207.787z M116.047,319.171C116.047,319.171,115.435,319.171,116.047,319.171 c-16.524-8.567-28.764-20.808-38.556-36.107c-4.284-6.732-7.956-14.076-9.792-22.032c-6.12-20.808,26.928-10.404,35.496-6.12 C126.451,267.764,124.615,297.14,116.047,319.171z M306.379,67.028c-0.612,0-0.612-0.612-1.224-0.612 c0-1.836-1.225-3.672-3.672-4.896c-4.284-1.836-8.568-4.284-12.853-6.732c-1.836-1.224-5.508-4.896-5.508-3.672 c0-0.612-0.612-1.224-1.224-1.224c6.731-3.672,13.464-8.568,20.195-12.24c8.568-4.896,17.748-9.792,26.929-14.688 C324.74,38.264,316.784,53.564,306.379,67.028z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <p className="font-medium bg-white shadow-lg px-4 py-3 rounded-lg">
                  Click to View Cart
                </p>
              </div>{" "}
              <Badge
                color="primary"
                sx={{ fontStyle: "bold" }}
                badgeContent={length}
                max={99}
                showZero
              >
                <PiShoppingCart className="text-3xl " />
              </Badge>
            </i>
            {authenticated ? (
              <>
                <i
                  className="relative  hover:text-black transition-all duration-200 ease-linear cursor-pointer"
                  onClick={(e) => {
                    setUserDrop(!userDrop);
                    dispatch(cartActions("HIDE_CART"));
                    setHam(false);
                  }}
                >
                  <FaRegUser className="text-[22px]" />
                  <div
                    className={`user absolute z-[999] whitespace-nowrap bg-white border-2 border-black ${
                      userDrop ? "block" : "hidden"
                    } right-0 mt-6 w-fit rounded-lg text-gray-600 p-4`}
                  >
                    <ul>
                      <li className="hover:text-sky-600 hover:underline transition-all duration-300 ease-linear">
                        {user}
                      </li>
                      <li
                        className="hover:text-sky-600 hover:underline transition-all duration-300 ease-linear"
                        onClick={(e) => {
                          axios
                            .get(
                              `${process.env.REACT_APP_BACKEND_URI}/api/logout`,
                              {
                                withCredentials: true,
                                headers: {
                                  "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
                                },
                              }
                            )
                            .then((res) => {
                              toast.success("Logged out");
                              setTimeout(() => {
                                window.location.reload();
                              }, 1000);
                            })
                            .catch((err) => {
                              toast.error(
                                "Failed to log out. Plaese try later."
                              );
                              console.log("Internal Server Error");
                            });
                        }}
                      >
                        Log-out
                      </li>
                    </ul>
                  </div>
                </i>
              </>
            ) : (
              <Link to={"/login"}>
                <button className="py-1.5 shadow-md shadow-gray-400 hover:bg-[#00A9C7]  px-4  text-white text-sm font-medium bg-[#0097B2] transition-all rounded-md">
                  Sign In / Sign Up
                </button>
              </Link>
            )}

            <div
              className="ham-cross cursor-pointer relative lg:hidden text-2xl font-black"
              onClick={(e) => {
                setHam(!ham);
                setUserDrop(false);
                dispatch(cartActions("HIDE_CART"));
              }}
            >
              {!ham ? <RxHamburgerMenu /> : <RxCross1 />}
            </div>
          </div>
        </div>
      </div>

      <ul
        className={
          ham
            ? "nav-items flex flex-col overflow-hidden border-b-2 border-gray-300 max-h-screen transition-all duration-500 ease-in-out lg:hidden gap-8 py-8 top-[65.6px] px-6 fixed w-full z-[999]  bg-white  font-semibold cursor-pointer"
            : "nav-items flex flex-col overflow-hidden border-b-2 border-gray-300  transition-all duration-500 ease-in-out lg:hidden gap-8  top-[65.6px] max-h-0 w-full px-6 fixed z-[999] bg-white  font-semibold cursor-pointer"
        }
      >
        <li className="nav-icons relative px-2 text-[18px] text-gray-600 transition-all duration-200">
          <Link onClick={(e) => setHam(false)} to="/">
            Home
          </Link>
        </li>
        <li
          className="nav-icons relative px-2 text-[18px] text-gray-600 transition-all duration-200"
          onClick={(e) => setAboutDropdown(!aboutDropdown)}
        >
          <NavLink onClick={(e) => setHam(false)} to="/about">
            About Us
          </NavLink>
        </li>
        <li className="nav-icons relative px-2 text-[18px] text-gray-600  transition-all duration-200">
          <NavLink onClick={(e) => setHam(false)} to="/faqs">
            FAQs
          </NavLink>
        </li>
        <li className="nav-icons relative px-2 text-[18px] text-gray-600  transition-all duration-200">
          <NavLink onClick={(e) => setHam(false)} to="/blogs">
            Blogs
          </NavLink>
        </li>
        <li className="nav-icons relative px-2 text-[18px] text-gray-600  transition-all duration-200">
          <NavLink onClick={(e) => setHam(false)} to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-icons relative px-2 text-[18px] text-gray-600  transition-all duration-200">
          <NavLink onClick={(e) => setHam(false)} to="/contact">
            Contact us
          </NavLink>
        </li>
      </ul>
      <div
        className={
          !show
            ? " z-[9999] opacity-0 overflow-hidden w-0 h-screen origin-right fixed top-0 right-0 flex justify-end transition-all duration-400 "
            : "h-screen opacity-100 z-[9999] origin-right scale-x-100 cart-sidebar w-screen fixed top-0 transition-all duration-400 right-0 flex justify-end"
        }
      >
        <div
          className="bg-black bg-opacity-60 h-full w-full absolute"
          onClick={() => {
            dispatch(cartActions("TOOGLE_CART"));
          }}
        ></div>
        <div className="h-full sm:w-96 w-full flex-shrink-0 flex flex-col items-center justify-between px-2 cart-popup self-end bg-white z-50 py-4 relative ">
          <div className="cart-nav gap-4 pb-2 relative  w-full flex justify-center font-medium text-2xl ">
            <Link
              to={"/cart"}
              className="hover:text-sky-400 flex gap-4 transition-all duration-200"
              onClick={(e) => dispatch(cartActions("HIDE_CART"))}
            >
              View Cart
              <PiShoppingCart className="text-3xl " />
            </Link>
            <IoMdClose
              className="border-[1px] absolute top-0 right-0 hover:border-black text-3xl cursor-pointer"
              onClick={(e) => dispatch(cartActions("HIDE_CART"))}
            />
          </div>
          <ul className=" h-[calc(100%-150px)] overflow-y-scroll scroll px-3 my-4 w-full ">
            {courses.length ? (
              courses.map((data, index) => {
                return (
                  <li
                    className="flex justify-between py-3 border-b-[1px] border-dotted border-gray-600"
                    id={`${index}`}
                  >
                    <a
                      href={"/course/" + data._id}
                      target="_blank"
                      className="w-[calc(100%-36px)]"
                    >
                      <div className="flex justify-start gap-4 w-full">
                        <div className="w-full">
                          <h2 className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
                            {data.Course_Name}
                          </h2>
                          <span className="text-xs leading-4 font-medium text-gray-400">
                            {data.Full_Address}
                          </span>
                          <p className="text-xs font-medium text-gray-500 leading-5">
                            Fees :{" "}
                            <span className="text-gray-600">
                              {data.Yearly_Tuition_Fees}
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                    <div>
                      <GiTrashCan
                        className="text-gray-600 text-2xl border-2 hover:border-black w-7 h-7  cursor-pointer"
                        onClick={(e) => deleteCart(data._id, index)}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="mt-20 font-medium text-center">
                No Item In Cart
              </div>
            )}
          </ul>
          <Link
            to={"/cart"}
            onClick={(e) => dispatch(cartActions("HIDE_CART"))}
          >
            <div className="relative pt-4 pb-10">
              <button className="px-6 py-2 w-40 relative  rounded-full cur bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 text-white font-medium">
                View Cart
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
