import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import BlogData from '../Data/BlogsData'
import { FaChevronLeft } from "react-icons/fa6";

const Blog = () => {
  const location = useLocation();
  const [blog, setBlog] = useState({
    title:"",
    discription:"",
    tags:[],
    discription:"",
    date:"",
    heroimage:"",
    body:[],
    conclusion:"",
    footer:"",
  })

  useEffect(()=>{
    BlogData.map((blog)=>{
      let title = location.pathname.split("/").pop();
      title = title.replaceAll("-"," ");
      if(title === blog.title){
        setBlog(blog);
      }
    })
  },location.pathname)


  const handleSubmit = (e) => {
    e.preventDeafault();
    alert("Your comment has been registerd.");
  }
  return (
    <>
      {/* setting meta data */}
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.discription} />
      </Helmet>
      <div
        className={`contact-header h-fit relative pt-20 border-b-2 border-gray-200`}
      >
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-start px-2 sm:px-20 py-4">
          <div className="hero-heading py-8 relative ">
            <h1 className="text-3xl relative z-10 font-semibold text-black">
              {blog.title}
            </h1>
          </div>
          <div className="text-sm sm:text-base lg:text-lg w-full  text-black">
            <Link to={"/"}>Home</Link>
            {" > "} <Link to={"/blogs"}>Blogs</Link> {" > "}{" "}
            <Link>{blog.title}</Link>
          </div>
        </div>
      </div>
      <div className="main-content-wrapper w-full px-2 md:w-[90%] lg:w-4/5 m-auto">
        <div>
          <div className="flex gap-6">
            <div>
              <div>
                <div className="blog-header my-10">
                  <div className="tags flex gap-2 justify-start my-1 flex-wrap">
                    {blog.tags.map((tag, ind) => {
                      return (
                        <p
                          key={ind}
                          className="bg-red-400 px-3 py-1 text-xs rounded-full text-white font-semibold"
                        >
                          {tag}
                        </p>
                      );
                    })}
                  </div>
                  <h1 className="text-2xl font-semibold my-3">{blog.title}</h1>
                  <p className="text-red-500 leading-6 pr-2">{blog.date}</p>
                </div>
                <div className="discription text-gray-600 mb-6 text-sm sm:text-base">
                  {blog.discription}
                </div>
                <div className="relative">
                  <div className="h-full w-full ">
                    <img
                      className="w-full max-h-[500px] object-contain py-6 "
                      src={blog.heroimage}
                      alt={blog.title}
                    />
                  </div>
                  <div className="level-container mt-10">
                    {blog.body.map((article, ind) => {
                      return (
                        <div key={ind} className="level mb-4 pl-1 sm:pl-2">
                          <h2 className="text-xl font-semibold my-2 pl-2 sm:pl-4">
                           {ind+1}. {article.heading}
                          </h2>
                          <p className="text-gray-600 pl-4 text-sm sm:text-base sm:pl-6">
                            {article.para}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="conclusion">
                    <h2 className="text-xl font-semibold my-2 pl-2 sm:pl-4 mt-10">Conclusion</h2>
                    <p className="text-gray-600 pl-4 text-sm sm:text-base sm:pl-6">{blog.conclusion}</p>
                  </div>
                  <div className="footer mt-10 text-gray-700 pl-4 text-base sm:text-lg font-medium sm:pl-6">{blog.footer}</div>
                </div>
              </div>
              <div className="flex justify-start gap-6 w-full items-center py-6 my-6 border-y border-gray-200">
                <FaChevronLeft />
                <Link className="text-gray-600 hover:text-sky-600 font-semibold">
                  Back to blog
                </Link>
              </div>
              <div>
                <h1 className="text-2xl text-gray-600 my-6">1 Comments</h1>
                <div>
                  <div className="bg-gray-200 p-6 my-2 comment-wrapper">
                    <div className="comment-line text-sm text-gray-600">
                    As someone currently navigating the daunting process of applying to study abroad, I can't emphasize enough how valuable a streamlined platform like yours is. The ability to explore courses across different countries, add them to a cart for easy comparison, and then receive personalized support during the application process is a game-changer.
                    </div>
                    <div className="text-gray-600 text-sm mt-6">
                      <span className="name border-r border-white pr-2">
                        Nitin Kumar
                      </span>
                      <span className="comment-date pl-2">20 Jun,2024</span>
                    </div>
                  </div>
                </div>
                <div className=" bg-white  p-6 my-6 shadow-lg rounded-lg">
                  <h1 className="text-2xl text-gray-600 ">Leave A Comment</h1>
                  <form className="leave-comment flex flex-col  my-6" action="" onSubmit={handleSubmit}>
                    <div className="flex gap-6">
                      <div class="relative inline-block flex-grow">
                        <input
                          type="text"
                          required
                          id="floating_filled"
                          class="block  px-2 pb-1 pt-4 w-full text-sm text-gray-600 bg-gray-100 outline-none   appearance-none dark:text-gray-700    peer"
                          placeholder=" "
                        />
                        <label
                          for="floating_filled"
                          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-90 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                        >
                          Name*
                        </label>
                      </div>
                      <div class="relative inline-block flex-grow">
                        <input
                          type="email"
                          required
                          id="floating_filled"
                          class="block  px-2 pb-1 pt-4 w-full text-sm text-gray-600 bg-gray-100 outline-none   appearance-none dark:text-gray-700    peer"
                          placeholder=" "
                        />
                        <label
                          for="floating_filled"
                          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-90 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                        >
                          Email*
                        </label>
                      </div>
                    </div>
                    <textarea
                      name="news-comment"
                      id="news-comment"
                      cols="30"
                      rows="5"
                      required
                      placeholder="Comment*"
                      className="bg-gray-100 my-6 p-2"
                    ></textarea>
                    <button
                      className="px-4 py-1.5 mt-4 w-fit rounded-full bg-gradient-to-br hover:from-sky-400 transition-all duration-300 ease-in-out hover:to-blue-600 from-blue-700 to-sky-600 border-2 border-blue-600 mr-4 text-white font-medium"
                      type="submit"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
