/* eslint-disable no-alert, no-console */

import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="error rounded-lg shadow-md shadow-gray-400 p-10 px-20">
          <h1 className="text-4xl text-red-600 text-center">Error 404</h1>
          <p className="text-2xl my-2">Page Not Found</p>
          <Link to={'/'} className='py-2 text-sky-600 font-medium'>Return to home page.</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
