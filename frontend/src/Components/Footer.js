/* eslint-disable no-alert, no-console */

import React, { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShowFooter } from "../Actions/FooterAction";

const Footer = () => {
  const { footer } = useSelector((state) => state.footer);
  const location = useLocation();
  const dispatch = useDispatch();
  const [cookieAccept, setCookieAccept] = useState(false);

  // checking if user give consent or not
  useEffect(() => {
    let consent = document.cookie;
    consent = consent.split("=").pop();
    if (consent === "") {
      setCookieAccept(false);
    } else {
      setCookieAccept(true);
    }
  }, []);

  // serring cookie if user give consent
  function cookieConsent() {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = "userConsent=true;" + expires + ";path=/";
    setCookieAccept(true);
  }

  useEffect(() => {
    if(location.pathname !== "/"){
      dispatch(ShowFooter());
    }
  }, [location]);

  return (
    <>
      <section
        className={
          cookieAccept
            ? "hidden"
            : "fixed bottom-0 left-0 w-full h-fit py-2 lg:py-4 px-2 sm:px-6 z-[9999] bg-gray-900 bg-opacity-[0.8]"
        }
      >
        <div className="flex justify-between items-center lg:flex-row gap-2 sm:gap-4 sm:text-sm text-[12px] lg:text-base flex-col">
          <p className="text-white font-medium">
            This website uses cookies to ensure you get the best experience on
            our website.{" "}
            <a
              href="https://www.cookiesandyou.com/"
              target="_blank"
              className="font-semibold underline"
            >
              Learn More
            </a>
          </p>
          <button
            className="bg-sky-600 text-white font-semibold rounded-md py-1 px-4"
            onClick={cookieConsent}
          >
            Got It
          </button>
        </div>
      </section>
      {footer ? (
        <div className="footer bg-gray-100 text-gray-800 relative mt-10 pt-10 p-3 sm:p-6 sm:px-10 ">
          {/* <div className="subscribe flex sm:flex-row flex-col sm:gap-0 gap-6 justify-between items-center py-6 lg:py-16 px-4 lg:px-10 xl:w-4/5 w-full sm:w-[95%] rounded-bl-3xl rounded-tr-3xl bg-gradient-to-br to-blue-600 from-blue-800 m-auto -translate-y-1/2">
                    <h2 className='text-2xl sm:text-4xl font-bold text-center sm:text-start'>Subscribe to our Newsleter</h2>
                    <div>
                        <form action="" className='flex lg:flex-row flex-col gap-6 lg:gap-0'>
                            <input  className='px-6 py-2 sm:py-4 text-lg w-64 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium text-center placeholder-white outline-none' type="text" name="email" id="email" placeholder='Your Email' />
                            <button className='px-6 py-2 sm:py-4 text-lg w-64 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium' type="submit">Subscribe Now</button>
                        </form>
                    </div>
                </div> */}
          <div
            id="footer"
            className={
              "footer-info gap-6 flex flex-col md:w-4/5 m-auto sm:flex-row justify-between  sm:py-6"
            }
          >
            <div className="w-full sm:w-1/2 justify-self-center">
              <div className="logo min-[320px]:text-2xl text-3xl font-bold">
                MyGlobalConsultant
              </div>
              <p className="my-2 text-sm sm:text-base font-medium">
                Your comprehensive guide to exploring educational opportunities
                around the globe
              </p>
              <div className="contact-imf py-2 flex flex-col gap-2 cursor-pointer">
                <div className="social-handles flex text-xl gap-4">
                  <a
                    href="https://www.facebook.com/myglobalconsultant/"
                    target="_blank"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/myglobalconsultant/"
                    target="_blank"
                  >
                    <FaInstagram />
                  </a>
                  <FaTwitter />
                </div>
                <div className=" hover:text-red-600 text-sm sm:text-base email my-2 flex items-center gap-2 ">
                  <AiOutlineMail />
                  <a href="mailto:info@myglobalconsultant.com">
                    info@myglobalconsultant.com
                  </a>
                </div>
                <div className=" hover:text-red-600 text-sm sm:text-base telephonemy-2 flex items-center gap-2">
                  <BsFillTelephoneFill />
                  <a href="tel:+15876912677">+1 5876912677</a>
                </div>
              </div>
            </div>
            <div className="information  justify-self-center">
              <h1 className="font-bold text-2xl sm:text-3xl">Information</h1>
              <ul className=" list-disc list-inside py-2">
                <li className="font-medium text-sm sm:text-base py-2 hover:text-red-500 transition-all duration-200 cursor-pointer">
                  <Link to={"about"}>About</Link>
                </li>
                <li className="font-medium text-sm sm:text-base py-2 hover:text-red-500 transition-all duration-200 cursor-pointer">
                  <Link to={"faqs"}>FAQ</Link>
                </li>
                <li className="font-medium text-sm sm:text-base py-2 hover:text-red-500 transition-all duration-200 cursor-pointer">
                  <Link to={"contact"}>Contact Us</Link>
                </li>
                <li className="font-medium text-sm sm:text-base py-2 hover:text-red-500 transition-all duration-200 cursor-pointer">
                  <Link to={"application-form"}>Aplication Form</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright-section text-center border-t-[1px] mt-3 text-xs sm:text-base border-black py-2">
            Copyright @ {new Date().getFullYear()} MyGlobalConsultant
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-800 copyright-section text-center mt-3 text-xs sm:text-base border-black py-4">
          Copyright @ {new Date().getFullYear()} MyGlobalConsultant
        </div>
      )}
    </>
  );
};

export default Footer;
