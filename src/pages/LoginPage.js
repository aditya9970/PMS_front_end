import React from "react";
import LoginComponent from "../components/LoginComponent";
import { NavbarCompnent } from "../components/UIComponents";
const LoginPage = () => {
  return (
    <div
      className="container mx-auto flex flex-col justify-center  items-center "
      style={{ width: "100%", height: "100vh", backgroundColor: "transparent" }}
    >
      {/* <NavbarCompnent /> */}
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
