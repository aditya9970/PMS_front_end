import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoBack } from "./UIComponents";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const StatsComponents = () => {
  return (
    <>
      <div
        className="flex container mx-auto px-10 pt-5 w-full"
        style={{ maxWidth: "90vw" }}
      >
        <GoBack />
        <div className="text-white w-1/3">Dashboard</div>
        <div className="w-1/3 text-center text-white">Icon Here</div>
        <div className="w-1/3  "></div>
      </div>
      <div
        className="container bg-white mx-auto my-8 p-10 py-8 rounded-2xl shadow-md"
        style={{ maxWidth: "90vw" }}
      >
        <StatsTable />
        <h1 className="text-3xl mt-4">Project Plan Vs Actual</h1>
        <StatsGraph />
      </div>
    </>
  );
};

const StatsTable = () => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.stats);

  useEffect(() => {
    values.isChanged &&
      fetch("http://localhost:8000/api/projects/stats", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) toast.error(data.error);
          else {
            let temp;
            data.stats.forEach((stat) => {
              temp = { ...temp, [stat._id]: stat.count };
            });
            console.log(temp);
            dispatch({ type: "UpdateStats", payload: temp });
          }
        });
  }, [values.isChanged]);
  return (
    <div>
      <ul className="flex flex-nowrap w-full" style={{ overflowX: "scroll" }}>
        <li
          className=" grow p-2 mx-2 shadow-lg px-4"
          style={{ borderLeft: "solid #09C7E2 5px", minWidth: "200px" }}
        >
          <p>Registered</p>
          <h2 className="text-3xl">{values.Registered * 1}</h2>
        </li>
        <li
          className=" grow p-2 mx-2 shadow-lg px-4"
          style={{ borderLeft: "solid #09C7E2 5px", minWidth: "200px" }}
        >
          <p>Closed</p>
          <h2 className="text-3xl">{values.Closed}</h2>
        </li>
        <li
          className=" grow p-2 mx-2 shadow-lg px-4"
          style={{ borderLeft: "solid #09C7E2 5px", minWidth: "200px" }}
        >
          <p>Running</p>
          <h2 className="text-3xl">{values.Running}</h2>
        </li>
        <li
          className=" grow p-2 mx-2 shadow-lg px-4"
          style={{ borderLeft: "solid #09C7E2 5px", minWidth: "200px" }}
        >
          <p>Closure Delay</p>
          <h2 className="text-3xl">{values.ClosureDelay}</h2>
        </li>
        <li
          className=" grow p-2 mx-2 shadow-lg px-4"
          style={{ borderLeft: "solid #09C7E2 5px", minWidth: "200px" }}
        >
          <p>Cancelled</p>
          <h2 className="text-3xl">{values.Cancelled}</h2>
        </li>
      </ul>
    </div>
  );
};

const StatsGraph = () => {
  const dispatch = useDispatch();
  const { isChanged, Registration } = useSelector((state) => state.stats);
  useEffect(() => {
    isChanged &&
      fetch("http://localhost:8000/api/projects/statsByDepartment", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) toast.error(data.error);
          else {
            console.log(data);
            dispatch({ type: "UpdateStatsGraph", payload: data.stats });
          }
        });
  }, [isChanged]);
  return (
    <div className="my-5" style={{ overflowX: "scroll" }}>
      <BarChart
        width={500}
        height={500}
        data={Registration}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="registered" fill="#8884d8" />
        <Bar dataKey="completed" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
