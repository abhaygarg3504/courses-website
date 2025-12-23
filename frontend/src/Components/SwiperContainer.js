import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SimilarCourseCard from "./SimilarCourseCard";

const SwiperContainer = ({ data=[],title="",nextClass="",prevClass="" }) => {
  return (
    <div>
      <div className="flex items-start gap-6 py-2 px-6 sm:py-0 sm:px-0 justify-between">
        <h2 className=" text-2xl font-semibold">{title}</h2>
        <div className=" text-gray-400 flex gap-4">
          <i className={"shadow-md h-6 w-6 bg-gray-200 grid place-content-center hover:bg-gray-300 cursor-pointer rounded-full "+ prevClass}>
            <MdChevronLeft className="text-2xl text-black" />
          </i>
          <i className={" shadow-md h-6 w-6 bg-gray-200 grid place-content-center hover:bg-gray-300 cursor-pointer rounded-full "+ nextClass}>
            <MdChevronRight className="text-2xl text-black" />
          </i>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
          clickable: true,
        }}
        spaceBetween={20}
        freeMode={true}
        slidesPerView={1}
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
          950: {
            slidesPerView: 3,
          },
          750: {
            slidesPerView: 2,
          }
        }}
      >
        {data.map((course, index) => {
          return <SwiperSlide className="" key={index}>
            <SimilarCourseCard course={course}/>
          </SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
