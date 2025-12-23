import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { authenticated } = useSelector((state) => state.adminAuthentication);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authenticated);
    if (!authenticated) {
      navigate("/auth/login");
    } else {
      fetchData();
    }
  }, [authenticated]);

  const [data, setData] = useState({});

  if (!localStorage.getItem("chart")) {
    localStorage.setItem(
      "chart",
      JSON.stringify([
        { month: "3/2023", users: 0 },
        { month: "4/2023", users: 0 },
        { month: "5/2023", users: 0 },
        { month: "6/2023", users: 0 },
        { month: "7/2023", users: 0 },
        { month: "8/2023", users: 0 },
        { month: "9/2023", users: 0 },
        { month: "10/2023", users: 0 },
        { month: "11/2023", users: 0 },
        { month: "12/2023", users: 0 },
        { month: "1/2024", users: 0 },
        { month: "2/2024", users: 6 },
      ])
    );
  }

  const chart = JSON.parse(localStorage.getItem("chart"));

  const fetchData = () => {
    if (chart.length >= 12) {
      chart.splice(0, 1);
    }
    let previousMonth = chart[chart.length - 1].month.charAt(0);
    previousMonth = parseInt(previousMonth, 10);
    const currentDate = new Date();
    console.log(currentDate);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/dashboard`, {
          withCredentials: true,
          headers: {
            "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
      alert("OOPS some error occurred. Please try again.");
    }

    console.log(previousMonth, month);

    if (previousMonth < month) {
      try {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URI}/api/dashboard`, {
            withCredentials: true,
            headers: {
              "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
            },
          })
          .then((res) => {
            chart.push({
              month: `${month}/${year}`,
              users: res.data.user,
            });
            localStorage.setItem("chart", JSON.stringify(chart));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" mx-auto mt-24 p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center mb-8">
        {/* Total Courses */}
        <div className="p-6 bg-white w-full rounded-lg shadow-md mr-4 mb-4 md:mb-0 ">
          <h2 className="text-3xl font-bold mb-2">Total Courses</h2>
          <p className="font-medium text-xl">{data.course}</p>
        </div>

        {/* Total Users */}
        <div className="p-6 bg-white w-full rounded-lg shadow-md mr-4 mb-4 md:mb-0 ">
          <h2 className="text-3xl font-bold mb-2">Total Users</h2>
          <p className="font-medium text-xl">{data.user}</p>
        </div>

        {/* Total Messages */}
        <div className="p-6 bg-white w-full rounded-lg shadow-md mb-4 md:mb-0 ">
          <h2 className="text-3xl font-bold mb-2">Total Messages</h2>
          <p className="font-medium text-xl">{data.message}</p>
        </div>
      </div>
      {/* User Growth Graph */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">User Growth</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="users" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
