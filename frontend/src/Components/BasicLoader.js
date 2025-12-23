/* eslint-disable no-alert, no-console */

import React from 'react'

const Loader = () => {
  return (
    <div className='loader-container h-48 w-full flex justify-center items-center'>
      <div className="loader w-fit h-fit">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  )
}

export default Loader