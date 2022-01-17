import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StatsComponents } from "../components/StatsComponent";
const StatsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_Tab", payload: 1 });
  }, []);
  return <StatsComponents />;
};

export default StatsPage;
