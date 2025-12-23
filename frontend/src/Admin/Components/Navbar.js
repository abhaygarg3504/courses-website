import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { adminAuthentication } from "../../Actions/AdminAuthentication";
import { Link } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    dispatch(adminAuthentication())
  },[dispatch])

  const [dropdown, setDropdown] = useState(false)

  return (
    <nav className="bg-sky-400 fixed top-0 w-full h-fit z-50 p-4 flex justify-between items-center">
      <Link to="/auth/dashboard">
        <div className="logo h-10 lg:h-16">
          <img className='h-full w-full object-contain' src="/images/WebsiteLogo1.png" alt="" />
        </div>
      </Link>
      <div className="md:hidden">
        <button className={`text-white focus:outline-none ${isMenuOpen ? 'hidden' : 'block'}`} onClick={toggleMenu}>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 6V8H21V6H3Z"></path>
          </svg>
        </button>
        <button className={`text-white focus:outline-none ${isMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMenu}>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.293 6.293L12 13L18.707 6.293L20 7.586L13.293 14.293L20 21L18.707 22.293L12 15.586L5.293 22.293L4 21L10.707 14.293L4 7.586L5.293 6.293Z"></path>
          </svg>
        </button>
      </div>
      <div className={`md:hidden absolute top-16 left-0 w-full h-fit p-6 bg-gray-800 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center">
          <Link to="/auth/profile" className="text-white w-full hover:text-gray-300 my-2 text-base">Profile</Link>
          <Link to="/auth/dashboard" className="text-white w-full hover:text-gray-300 my-2 text-base">Dashboard</Link>
          <Link to="/auth/student" className="text-white w-full hover:text-gray-300 my-2 text-base">Manage Students</Link>
          <div className="text-white relative  w-full hover:text-gray-300 mt-2 text-base"><p className='flex justify-between items-center text-white w-full pb-2' onClick={e=>setDropdown(!dropdown)}>Edit Site <FaChevronDown className={`text-sm transition-all duration-500 ${!dropdown ? "rotate-0" : "rotate-180"}`}/></p>
          <ul className={dropdown?'max-h-[500px] overflow-hidden transition-all duration-500':" max-h-0 transition-all duration-500 overflow-hidden"} >
            <li className='my-2 px-4'><Link to="/auth/add/course">Add Course</Link></li>
            <li className='my-2 px-4'><Link to="/auth/edit/course">Edit Course</Link></li>
            <li className='my-2 px-4'><Link to="/auth/add/faq">Add Faq</Link></li>
            <li className='my-2 px-4'><Link to="/auth/edit/faq">Edit Faq</Link></li>
            <li className='my-2 px-4'><Link to="/auth/all/blogs">Manage Blogs</Link></li>
            <li className='my-2 px-4'><Link to="/auth/post/job">Post Job</Link></li>
            <li className='my-2 px-4'><Link to="/auth/edit/job">Edit Job</Link></li>
          </ul>
          </div>
          <Link to="/auth/messages" className="text-white w-full hover:text-gray-300 my-2 text-base">Messages</Link>
        </div>
      </div>
        <div className='hidden md:flex items-center gap-6'>
          <Link to="/auth/dashboard" className="hover:bg-red-400 font-medium hover:text-black py-1 px-2 transition-all duration-300 text-white my-2 text-base">Dashboard</Link>
          <Link to="/auth/messages" className="hover:bg-red-400 font-medium hover:text-black py-1 px-2 transition-all duration-300 text-white my-2 text-base">Messages</Link>
          <Link to="/auth/student"   className="hover:bg-red-400 font-medium hover:text-black py-1 px-2 transition-all duration-300 text-white my-2 text-base whitespace-nowrap">Manage Students</Link>
          <div className="text-white relative hover:bg-red-400   w-full cursor-pointer py-1 px-2 text-base" onMouseEnter={e=>setDropdown(true)}  onMouseLeave={e=>setDropdown(false)}><p className='flex font-medium hover:text-black justify-between text-white gap-4 items-center  whitespace-nowrap w-min'>Edit Site <FaChevronDown className={`text-sm transition-all duration-500 ${!dropdown ? "rotate-0" : "rotate-180"}`}/></p>
          <ul className={` absolute px-2 overflow-hidden w-max transition-all bg-gray-800 top-[66px] duration-500 ${dropdown ? "max-h-[500px]" : "max-h-0"}`}>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/add/course">Add Course</Link></li>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/edit/course">Edit Course</Link></li>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/add/faq">Add Faq</Link></li>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/edit/faq">Edit Faq</Link></li>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/all/blogs">Manage Blogs</Link></li>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/post/job">Post Job</Link></li>
            <li className='my-2 hover:bg-white hover:text-black transition-all duration-300 rounded-sm px-4'><Link to="/auth/edit/job">Edit Job</Link></li>
          </ul>
          </div>
        </div>
        <Link to="/auth/profile" className=" hidden md:block hover:bg-red-400 font-medium hover:text-black py-1 px-2 transition-all duration-300 text-white my-2 text-base">Hey! Admin</Link>
    </nav>
  );
}

export default Navbar;
