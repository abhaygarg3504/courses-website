/* eslint-disable no-alert, no-console */

// importing elements
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";


// defining data for tiles
const data = [
  {
    heading: "Global Course Database",
    img: "images/7016010.jpg",
    discription:
      "Discover an extensive global course database, offering diverse educational opportunities from leading institutions worldwide.",
  },
  {
    heading: "User Friendly Search",
    img: "images/4957155.jpg",
    discription:
      "Embark on a seamless journey of course discovery with our user-friendly search functionality. Effortlessly explore our extensive global course database, filtering through a diverse array of educational offerings tailored to your interests and goals.",
  },
  {
    heading: "Direct Application",
    img: "images/Checklist.jpg",
    discription:
      "Streamline your application process with direct access to apply for courses within our platform. Say goodbye to cumbersome application procedures and hello to efficiency as you submit your applications hassle-free, saving time and energy for your educational pursuits.",
  },
  {
    heading: "Expert Guidance",
    img: "images/5272890.jpg",
    discription:
      "Access personalized support and guidance from our team of experienced consultants. Benefit from their expertise as they provide tailored advice to help you navigate your educational journey effectively. ",
  },
  {
    heading: "Community Support",
    img: "images/451534-PFK9EB-793.jpg",
    discription:
      "Join our inclusive community of learners, where you can connect with peers, share experiences, and seek advice. Engage in discussions, collaborate on projects, and build meaningful connections with like-minded individuals from around the world.",
  },
];

// designing tag for tiles
const Tiles = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      key={props.data.index}
      // change hover state if clicked any tile
      onClick={(e) => setHover(!hover)}
      className={`flex cursor-pointer border-4 border-gray-700 hover:border-sky-600 hover:text-sky-600 rounded-3xl overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) my-4 w-full ${
        hover ? "max-h-[600px] flex-row" : "max-h-40 flex-row"
      }`}
    >
      <div
        className={`relative flex-shrink-0 whitespace-nowrap flex-grow-0 sm:text-xl lg:text-2xl font-semibold flex justify-center items-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          hover
            ? "w-12 py-8 border-r-[1px] border-gray-600"
            : "w-full sm:w-[600px]  py-0 border-0 border-transparent"
        }`}
      >
        <p
          className={`transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
            hover
              ? "px-0 py-0 rotate-90"
              : "px-2 sm:px-6 py-6 sm:py-10 rotate-0"
          } text-center h-fit`}
        >
          {props.data.heading}
        </p>
      </div>
      <div
        className={`flex flex-col justify-center items-center h-full w-[calc(100%-48px)] flex-shrink-0 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          hover
            ? "p-2 opacity-100 scale-x-100"
            : " scale-x-0 origin-right p-0 opacity-0"
        }`}
      >
        <div className="flex h-full w-full flex-col flex-shrink-0 justify-start items-center">
          <img
            className="h-[250px] object-contain"
            src={props.data.img}
            alt=""
          />
          <p className="text-gray-600 text-sm text-center">
            {props.data.discription}
          </p>
        </div>
      </div>
    </div>
  );
};

const About = () => {

  // adding scroll effect on counters
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      var element = document.querySelector(".counter");
      var counter1 = document.querySelector(".counter-1");
      var counter2 = document.querySelector(".counter-2");
      var counter3 = document.querySelector(".counter-3");
      if (element) {
        var rect = element.getBoundingClientRect();
        var windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.bottom <= windowHeight) {
          counter1.style.setProperty("--num", 58000);
          counter2.style.setProperty("--num", 100);
          counter3.style.setProperty("--num", 500);
        }
      }
    });
  }, []);

  return (
    <>
    {/* Changing meta tags */}
    <Helmet>
        <title>About Us</title>
        <meta
          name="description"
          content="About MyGlobalConsultant and what perks do we provide."
        />
      </Helmet>
      {/* meta tags changed */}

      {/* Header of about page start here */}
      <div className="contact-header h-fit relative pt-20 border-b-2 border-gray-200">
        <div className="bgcover absolute h-full w-full  opacity-80"></div>
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative w-1/2">
            <h1 className="text-6xl relative z-10 font-semibold w-4/5 text-black">
              About Us
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
            <BreadCrumb/>
          </div>
        </div>
      </div>
      {/* Header of about page ends here */}

      {/* About site section starts here */}
      <div className="about-site mt-20 mb-10 lg:grid gap-10 lg:grid-cols-2 w-[90%] m-auto">
        <img height={500}
          src="/images/Employee-Training.jpg"
          alt="Employee-training-image"
        />
        <div className="our-story self-center">
          <h2 className="text-xl sm:text-2xl  font-medium text-gray-500">
            Our Story
          </h2>
          <h1 className="text-3xl sm:text-6xl lg:text-5xl xl:text-6xl font-bold my-6">
            MyGlobalConsultant
          </h1>
          <p className="my-3 text-gray-600 text-sm sm:text-base">
            Our platform simplifies the process of finding, applying, and
            getting accepted for studying abroad. We connect international
            students, recruitment partners, and academic institutions all in one
            place.
          </p>
          <p className="my-3 text-gray-600 text-sm sm:text-base">
            We’ve established partnerships with over 1,500 primary, secondary,
            and post-secondary educational institutions. Collaborating with more
            than 6,500 recruitment partners, we aim to enhance diversity on
            campuses in Canada, the United States, the United Kingdom,
            Australia, and Ireland.
          </p>
          <p className="my-3 text-gray-600 text-sm sm:text-base">
            We have online platform for international student recruitment,
            aiding over 800,000 students in their educational pursuits.
            Recognized for our rapid growth and innovation,{" "}
          </p>
          <Link to="/contact">
            <button className="px-6 sm:py-3 py-2 w-32 sm:w-48 rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-4 my-6 border-blue-700 mr-4 text-white font-medium">
              Contact
            </button>
          </Link>
        </div>
      </div>
      {/* About site section ends here */}

      {/* our mission section starts here */}
      <div className="our-mission mt-20 mb-10 lg:grid gap-10 lg:grid-cols-2 w-[90%] m-auto">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl text-start sm:text-6xl lg:text-5xl xl:text-6xl font-bold my-6">
            Our Mission
          </h1>
          <p className="my-3 text-gray-600 text-sm sm:text-base">
            Our mission is to empower individuals around the globe to pursue
            their educational aspirations by providing a comprehensive platform
            for discovering, evaluating, and applying for courses across a wide
            range of fields and institutions. Whether you're a student looking
            to further your academic studies or a professional seeking to
            enhance your skill set, we're here to help you find the perfect
            course to meet your goals.
          </p>
        </div>
        <img src="images/na_feb_25.jpg" alt="" />
      </div>
      {/* our mission section ends here */}

      {/* Counter section starts here */}
      <div className="counter bg-gray-100 counter text-gray-600 gap-4 flex sm:flex-row flex-col items-center justify-around py-10">
        <div className="text-2xl flex flex-col gap-2 w-80 justify-center text-center">
          <span className="courses counter-1 w-full text-center text-4xl"></span>
          Total Courses
        </div>
        <div className=" text-2xl flex flex-col gap-2 w-80 justify-center text-center">
          <span className="members counter-2 in-view w-full text-center text-4xl"></span>
          Team Members
        </div>
        <div className=" text-2xl text-gray-600 flex flex-col gap-2 w-80 justify-center text-center">
          <span className="users counter-3 w-full text-center text-4xl"></span>
          Total Users
        </div>
      </div>
      {/* Counter section ends here */}

      {/* section for tiles start here */}
      <div className="what-we-do my-20 px-2 sm:px-6">
        <h1 className="text-4xl lg:text-6xl text-center font-bold  my-10">
          What we offer
        </h1>
        <div className="flex flex-col gap-10 w-full sm:w-[600px] m-auto">
          {/* Creating tiles */}
          {data.map((data, index) => {
            return <Tiles data={data} key={index} />;
          })}
        </div>
      </div>
      {/* section for tiles ends here */}
    </>
  );
};

export default About;
