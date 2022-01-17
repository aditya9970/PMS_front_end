import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListProjectComponent from "../components/ListProjectComponent";

const ListProjectsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_Tab", payload: 2 });
  }, []);
  return (
    <>
      <ListProjectComponent />
    </>
  );
};

export default ListProjectsPage;
