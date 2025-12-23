import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import { Helmet } from "react-helmet";
import BlogData from '../Data/BlogsData'

const BlogCard = ({blog,index}) => {
  return (
    <div key={index} className="flex flex-col h-min rounded-lg overflow-hidden  shadow-xl blog-wrapper">
      <div className="overflow-hidden">
        <img
          className="h-[200px] w-full object-cover transition-all duration-300"
          src={blog.heroimage}
          alt={blog.title}
        />
      </div>
      <div className="p-4 h-min min-h-[250px] shadow-black shadow-[0_-2px_10px_-6px_black]">
        <div className="tags flex gap-2 justify-start my-1 flex-wrap">
          {
            blog.tags.map((tag,ind)=>{
              return(
                <p key={ind} className="bg-red-400 px-3 py-1 text-xs rounded-full text-white font-semibold">{tag}</p>
              )
            })
          }
        </div>
        <p className=" italic text-sm text-red-400">
          {blog.date}
        </p>
        <h4 className=" text-lg font-semibold whitespace-nowrap overflow-hidden w-full text-ellipsis leading-9">
          {blog.title}
        </h4>
        <p
          className="text-ellipses-multi text-gray-600"
        >
          {blog.discription}
        </p>
        <Link to={`/blog/${blog.title.replaceAll(" ","-")}`}>
          <button className="px-4 py-1.5 mt-4 w-fit rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

const Blogs = (props) => {
  return (
    <>
      {/* setting meta data */}
      <Helmet>
        <title>Blogs - MGC</title>
        <meta
          name="description"
          content="Stay informed with insights from MyGlobalConsultant's blog. Discover expert tips, industry trends, and career advice to empower your professional journey. Explore our latest articles and gain valuable knowledge to advance your career."
        />
      </Helmet>
      <div
        className={`contact-header h-fit relative pt-20 border-b-2 border-gray-200`}
      >
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative w-1/2">
            <h1 className="text-6xl relative z-10 font-semibold w-4/5 text-black">
              Blogs
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg sm:w-1/2 lg:w-1/3  text-black">
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="p-6 w-full sm:w-[500px] md:w-[750px] lg:w-[1024px] xl:w-4/5 m-auto">
        <div className="search-blog flex justify-end mb-10">
          <input
            type="search"
            className="p-[7px_11px] w-[300px] border-[1px] border-gray-500 rounded-md font-medium outline-none"
            placeholder="Search for Blog"
          />
        </div>
        <div className="blog-card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-fit">
          {
            BlogData.map((blog,index)=>{
              return (
                <BlogCard blog={blog} index={index}/>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Blogs;
