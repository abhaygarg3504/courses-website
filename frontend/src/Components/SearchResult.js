import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./BasicLoader";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import LeftSidebarFilter from "./Sidebar";

const defaultProps = {
  showResult: false,
  filterValue: {
    country: "",
    course: "",
    year: "",
  },
  isLoading: false,
  title: "MyGlobalConsultant-Home",
  results: [],
  reset: false,
};

const dummyData = {
  Country: "Not Logged In",
  URL: "Not Logged In",
  Institute_Name: "Not Logged In",
  Institute_Logo: "Not Logged In",
  Full_Address: "Not Logged In",
  QS_Ranking: "Not Logged In",
  National_Ranking: "Not Logged In",
  World_Ranking: "Not Logged In",
  Website_Link: "https://myglobalconsultant.com/login",
  Course_Name: "Not Logged In",
  Intakes: "Not Logged In",
  Duration: "Not Logged In",
  Campus: "Not Logged In",
  Course_Url: "https://myglobalconsultant.com/login",
  Yearly_Tuition_Fees: "Not Logged In",
  Application_Fees: "Not Logged In",
  PTE_Overall: "Not Logged In",
  PTE_No_Bands_Less_Than: "Not Logged In",
  TOEFL_iBT_Overall: "Not Logged In",
  TOEFL_iBT_no_Bands_Less_Than: "Not Logged In",
  IELTS_Overall: "Not Logged In",
  IELTS_no_Band_Less_Than: "Not Logged In",
  GPA: "Not Logged In",
};

const SearchResult = ({
  showResult = defaultProps.showResult,
  title = defaultProps.title,
  isLoading = defaultProps.isLoading,
  setShowResult,
  setIsLoading,
  results = defaultProps.results,
  reset = defaultProps.reset,
  setReset,
}) => {
  const resultContainer = useRef();
  const [scrollData, setScrollData] = useState({
    items: [],
    hasMore: true,
  });
  const sidebarContainer = useRef();
  const courseContainer = useRef();
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const { cart } = useSelector((state) => state.cart);
  const { authenticated } = useSelector((state) => state.authentication);
  const [sidebar, setSidebar] = useState(false);
  let timer = useRef();

  useEffect(() => {
    setData(results);
    let array = results.slice(0,14);
    setScrollData((prev) => {
      return {
        ...prev,
        hasMore: true,
        items: array,
      };
    });
    setIsLoading(false)
  }, [results]); 

  window.onresize = function (e) {
    const elem = document.getElementById("sidebar-container");
    if (elem) {
      if (window.innerHeight < 650) {
        console.log("gui");
        if (elem.classList.contains("h-fit")) {
          elem.classList.add("h-[80vh]", "overflow-y-scroll");
          elem.classList.remove("h-fit");
        }
      } else {
        if (
          elem.classList.contains("overflow-y-scroll") &&
          elem.classList.contains("h-[80vh]")
        ) {
          elem.classList.remove("h-[80vh]", "overflow-y-scroll");
          elem.classList.add("h-fit");
        }
      }
    }
  };

  // function to apply filter
  const applyFilter = (props) => {
    let array = [];
    for (let index = 0; index < props.length && index < 15; index++) {
      array.push(props[index]);
    }
    setScrollData((prev) => {
      return {
        ...prev,
        hasMore: true,
        items: array,
      };
    });
    setIsLoading(true);
    setData(props);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // fuction to close sidebar
  function closeSidebar() {
    setSidebar(false);
  }

  const FixSidebar = () => {
    if (sidebarContainer.current && courseContainer.current) {
      let sidebarElem = sidebarContainer.current;
      let courseElem = courseContainer.current;
      let sidebarBottom =
        sidebarElem.getBoundingClientRect().top + sidebarElem.scrollHeight;
      let courseBottom =
        courseElem.getBoundingClientRect().y + courseElem.scrollHeight;
      if (window.pageYOffset > resultContainer.current.offsetTop) {
        if (
          sidebarBottom >= courseBottom &&
          !(sidebarElem.getBoundingClientRect().top > 80)
        ) {
          sidebarElem.classList.remove("fix-sidebar");
          sidebarElem.classList.add("fix-sidebar-bottom");
        } else {
          sidebarElem.classList.add("fix-sidebar");
          sidebarElem.classList.remove("fix-sidebar-bottom");
        }
        courseElem.classList.add("xl:ml-[380px]");
      } else {
        sidebarElem.classList.remove("fix-sidebar");
        sidebarElem.classList.remove("fix-sidebar-bottom");
        courseElem.classList.remove("xl:ml-[380px]");
      }
    }
  };

  function fetchMoreData() {
    if(scrollData.items.length && data.length){
      if ( scrollData.items.length >= data.length) {
        setScrollData((prev) => {
          return {
            ...prev,
            hasMore: false,
          };
        });
      }
      setTimeout(() => {
        let array = results.slice(0,scrollData.items.length + 10);
        setScrollData((prev) => {
          return {
            ...prev,
            items: array,
          };
        });
      }, 700);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", FixSidebar, false);

    return () => {
      window.removeEventListener("scroll", FixSidebar, false);
    };
  }, [sidebarContainer, courseContainer]);

  useEffect(() => {
    if (resultContainer && showResult) {
      let elem =
        resultContainer.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, elem);
    }
  }, [resultContainer, results, data]);

  return (
    <>
      <div
        ref={resultContainer}
        className={
          showResult
            ? "filter-results bg-white scroll pt-20 h-fit overflow-x-clip w-[95%] m-auto relative"
            : "hidden"
        }
      >
        <div className="flex gap-4 py-1">
          <div
            className={`fixed z-[999] top-0 xl:hidden left-0 flex-shrink-0 bg-gray-400 transition-all duration-300 bg-opacity-40 ${
              sidebar ? "w-screen overflow-y-scroll" : "w-0 overflow-hidden "
            } h-screen`}
          >
            <div
              className="absolute top-0 left-0 h-full w-full"
              onClick={(e) => setSidebar(false)}
            ></div>
            <div className="h-full overflow-y-scroll scroll pb-10 relative  filter-container sm:w-[360px] w-screen  bg-white">
              <div
                className={`w-full py-3 cursor-pointer px-2 text-end justify-end flex`}
              >
                <IoMdClose
                  className=" text-xl h-8 w-8 border-2 border-gray-400 border-dashed"
                  onClick={(e) => setSidebar(false)}
                />
              </div>
              <LeftSidebarFilter
                data={results}
                className="z-50"
                filter={applyFilter}
                path={"courses"}
                search={""}
                sidebar={closeSidebar}
                reset={reset}
                setReset={setReset}
              />
            </div>
          </div>
          <div
            className="hidden xl:flex z-40 flex-shrink-0"
            ref={sidebarContainer}
          >
            <div
              id="sidebar-container"
              className={`${
                window.innerHeight < 650
                  ? "h-[80vh] overflow-y-scroll"
                  : "h-fit"
              } rounded-md sm:w-[360px] mb-10 w-full shadow-[0px_30px_41px_-31px_rgba(0,0,0,0.59)]  bg-white`}
            >
              <div
                className={
                  isLoading
                    ? "absolute cursor-wait h-full w-full z-10"
                    : "hidden"
                }
              />
              <LeftSidebarFilter
                data={results}
                filter={applyFilter}
                path={"courses"}
                search={""}
                sidebar={closeSidebar}
                reset={reset}
                setReset={setReset}
              />
            </div>
          </div>
          <div
            ref={courseContainer}
            className="courses-layout w-full min-h-screen"
          >
            <div className="flex relative justify-center">
              <h2 className="text-2xl font-bold text-center">
                Results for "{title}"
              </h2>
              <div
                className="close-result absolute bg-white  right-4 top-0 font-medium text-3xl cursor-pointer border-[1px] hover:border-black"
                onClick={(e) => setShowResult(false)}
              >
                <IoMdClose />
              </div>
            </div>
            <div className="header mt-5 px-4  flex justify-center items-center flex-col">
              <div className="flex justify-between sm:flex-row flex-row gap-6 items-center w-full shadow-box py-2 px-4 rounded-lg bg-white">
                <p className="text-sm sm:text-lg font-medium whitespace-nowrap">
                  {isLoading ? "Loading..." : `${data.length} courses found`}
                </p>
                <div className="flex justify-between w-fit">
                  <p
                    className="py-1 sm:py-2 text-center w-fit px-4 lg:w-32 items-center xl:hidden border-2 border-black  rounded-lg bg-sky-500 text-white cursor-pointer"
                    onClick={(e) => setSidebar(true)}
                  >
                    Filter
                  </p>
                </div>
              </div>
            </div>
            <div className="course-card flex justify-center">
              <div
                className={`card-container w-full px-4 py-2 overflow-x-hidden gap-4 sm:gap-4 lg:gap-4 course-card-height  my-4`}
              >
                <InfiniteScroll
                  dataLength={scrollData.items.length}
                  next={fetchMoreData}
                  hasMore={scrollData.hasMore}
                  loader={
                    !isLoading && <div
                      className={scrollData.items.length ? "loader flex justify-center items-center p-10" : "hidden"}
                    >
                      <div className="border-black border-t-white border-4 w-10 h-10 rounded-full animate-spin"></div>
                    </div>
                  }
                >
                  {isLoading ? (
                    <div className="text-6xl min-h-[500px] flex items-center justify-center font-bold text-center mt-20 ">
                      <Loader />
                    </div>
                  ) : scrollData.items.length ? (
                    <>
                      {scrollData.items.map((course, index) => {
                        return (
                          <div className="relative">
                            <CourseCard
                              data={
                                index < 10 || authenticated ? course : dummyData
                              }
                              index={index}
                              cart={cart}
                              show={authenticated}
                              authenticated={authenticated}
                            />
                            <Link
                              to="/login"
                              className={`absolute top-0 left-0 w-full h-full blur-bg justify-center items-center text-black hover:text-sky-600 font-semibold ${
                                authenticated || index < 10 ? "hidden" : "flex"
                              } `}
                            >
                              Login to See..
                            </Link>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="text-3xl min-h-[500px] flex items-center justify-center font-medium text-center">
                      Sorry, No course matches to given query{" "}
                    </div>
                  )}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  showResult: PropTypes.bool,
  isLoading: PropTypes.bool,
  filterValue: PropTypes.shape({
    country: PropTypes.string,
    course: PropTypes.string,
    year: PropTypes.string,
  }),
  reset: PropTypes.bool,
  title: PropTypes.string,
  setShowResult: PropTypes.func,
  setIsLoading: PropTypes.func,
};
