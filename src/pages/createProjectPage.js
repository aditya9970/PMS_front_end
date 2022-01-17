import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProjectForm from "../components/CreateProjectComponent";

const CreateProjectPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("set tab is called");
    dispatch({ type: "SET_Tab", payload: 4 });
  }, []);
  return <ProjectForm />;
};

export default CreateProjectPage;
