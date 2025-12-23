import React, { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { Keywords } from "../Data/KeyWords";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideFooter, ShowFooter } from "../Actions/FooterAction";
import toast from "react-hot-toast";
import SearchKeywords from "./searchKeywords";

const SearchCourse = () => {
  const [showResult, setShowResult] = useState(false);
  const [error, seterror] = useState(false);
  const [results, setResults] = useState([]);
  const location = useLocation();
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const [discription, setDiscription] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("MyGlobalConsultant - Home");
  const [filterValue, setFilterValue] = useState({
    country: "",
    course: "",
    year: "",
  });

  const SetTitle = (filter) => {
    if (filter.course.length > 0 && filter.country.length > 0) {
      setTitle(`Course of ${filter.course} in ${filter.country}`);
    } else if (filter.course.length > 0) {
      setTitle(`Course of ${filter.course}`);
    } else if (filter.country.length > 0) {
      setTitle(`Course of ${filter.country}`);
    } else {
      setTitle("Explore ");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    SetTitle(filterValue);

    // changing url of the page
    let url = "";
    if (filterValue.course.length > 0 && filterValue.country.length > 0) {
      url =
        "?filter=true&course=" +
        filterValue.course +
        "&country=" +
        filterValue.country;
    } else if (filterValue.course.length > 0) {
      url = "?filter=true&course=" + filterValue.course;
    } else if (filterValue.country.length > 0) {
      url = "?filter=true&country=" + filterValue.country;
    } else {
      url = "?filter=false";
    }
    navigate(url);
  }

  useEffect(() => {
    if (showResult) {
      dispatch(HideFooter());
    } else {
      dispatch(ShowFooter());
    }
  }, [showResult]);

  const fetchData = (filter) => {
    SetTitle(filter);

    // checking if course or country is selected or not
    if (filter.course.length > 0 || filter.country.length > 0) {
      // if selected then
      seterror(false);
      setShowResult(true);
      setIsLoading(true);
      // fetch data
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/filter`, {
          params: filter,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setResults(res.data);
          let d = "";
          res.data.map((course, index) => {
            if (index < 5) {
              d = d + `${index + 1}. ${course.Course_Name}, `;
            }
          });
          setDiscription(d);
          setReset(true);
        })
        .catch((err) => {
          console.log("some error occurred");
          toast.error("Some Unknown Error Occurred.");
          setResults([]);
          setShowResult(false);
          setIsLoading(false);
        });
    } else {
      // if not filled then
      seterror(true);
      setShowResult(false);
    }
  };

  useEffect(() => {
    let queryObj = {};
    if (location.search) {
      let query = location.search;
      if (query.length > 0) {
        query = query
          .split("?")
          .pop()
          .replaceAll("%20", " ")
          .replaceAll("+", " ")
          .split("&");
        query.forEach((elem) => {
          const arr = elem.split("=");
          queryObj[arr[0]] = arr[1];
        });
      }
      if (queryObj.filter === "true") {
        // checking if filter is true or not
        setFilterValue(queryObj);
        if (queryObj.course && queryObj.country) {
          if (queryObj.year && queryObj.year.length) {
            fetchData(queryObj);
          } else {
            queryObj.year = "";
            fetchData(queryObj);
          }
        }
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={`${discription}. Explore ${title}. Explore program details, including specializations, entry requirements, and career paths. Ready to apply? Find out how to start your application process today!`}
        />
        <meta
          name="keywords"
          content={SearchKeywords(filterValue.course, filterValue.country)}
        />
      </Helmet>
      <SearchInput
        error={error}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        handleSubmit={handleSubmit}
      />
      <SearchResult
        showResult={showResult}
        setShowResult={setShowResult}
        reset={reset}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        title={title}
        results={results}
        setReset={setReset}
        setResults={setResults}
      />
    </>
  );
};

export default SearchCourse;
