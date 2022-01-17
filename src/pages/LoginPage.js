import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import LoginComponent from "../components/LoginComponent";
const LoginPage = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch({ type: "SET_Tab", payload: 0 });
  }, []);
  return (
    <div
      className="container mx-auto flex flex-col justify-center  items-center "
      style={{ width: "100%", height: "100vh", backgroundColor: "transparent" }}
    >
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
