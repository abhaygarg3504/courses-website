/* eslint-disable no-alert, no-console */

import React from "react";

const Preloader = () => {
  return (
    <div className="fixed z-[9999]  flex w-screen h-screen justify-center items-center bg-white">
      <section class="stage">
        <figure class="ball">
          <span class="ball-shadow"></span>
        </figure>
      </section>
    </div>
  );
};

export default Preloader;
