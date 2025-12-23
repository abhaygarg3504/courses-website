import React from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  return (
    <div className=" mx-auto mt-24 lg:p-8 px-2 py-8 bg-gray-100 min-h-screen rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit AllBlogs</h1>
      <Link to="/auth/post/blog">
        <button className="mb-8 text-white font-semibold shadow-md shadow-gray-600 bg-green-600 hover:bg-green-700 py-1 px-4 rounded-md">
          Add Blog
        </button>
      </Link>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className=" py-1 px-2 w-20 border-2 border-black">S.No</th>
            <th className=" py-1 px-2 border-2 border-black">Blog Name</th>
            <th className=" py-1 px-2 border-2 border-black">Tags</th>
            <th className=" py-1 px-2 w-32 border-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1 px-2 border-2 border-black">jknfk</td>
            <td className="py-1 px-2 border-2 border-black">jknfk</td>
            <td className="py-1 px-2 border-2 border-black">jknfk</td>
            <td className="py-1 px-2 border-2 border-black">jknfk</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllBlogs;
