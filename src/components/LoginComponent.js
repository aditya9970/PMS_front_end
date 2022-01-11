import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  return (
    <>
      <image src="./LogoIcon.png" alt="icon" />
      <LoginForm />
    </>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    show: false,
    message: "",
  });

  const handleChange = () => {
    setValues({ ...values, message: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.err) setValues({ ...values, message: data.err });
        else {
          setValues({
            ...values,
            message: data.message + "redirecting in 5 seconds",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        }
      });
    console.log(e.target.elements.email.value);
  };

  const toggleIcon = () => {
    setValues({ ...values, show: !values.show });
  };
  return (
    <>
      <form
        onSubmit={handleLogin}
        onChange={handleChange}
        className="flex flex-col px-6 py-10 pb-4 rounded-xl shadow-md  bg-white relative"
        style={{ width: "400px", maxWidth: "100%" }}
      >
        <h2 className="text-xl my-2 mb-4 text-center">Login to get started</h2>
        <label
          for="email  "
          className="text-gray-500"
          style={{ textAlign: "left" }}
        >
          Email
        </label>
        <input
          type="email"
          required
          name="email"
          className="border rounded bg-gray-100 p-2 my-2"
        />
        <label
          for="password"
          className="text-gray-500"
          style={{ textAlign: "left" }}
        >
          Password
        </label>
        <div className="relative">
          <input
            type={values.show ? "text" : "password"}
            required
            name="password"
            className="border rounded bg-gray-100 p-2 my-2 w-full"
          />

          <PasswordIcon onClick={toggleIcon} show={values.show} />
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-2 px-8 rounded-full text-white self-center my-2"
          style={{ width: "min-content" }}
        >
          Login
        </button>
        {values.message && (
          <p
            className="my-2 text-sm text-gray-500 absolute "
            style={{
              bottom: "-40px",
              left: "50%",
              width: "max-content",
              transform: "translate(-50%)",
            }}
          >
            {values.message}
          </p>
        )}
      </form>
    </>
  );
};

const PasswordIcon = ({ show, onClick }) => {
  return (
    <span
      onClick={onClick}
      className="absolute bg-gray-100"
      style={{ transform: "translate(0, -50%)", top: "50%", right: "10px" }}
    >
      {show ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
    </span>
  );
};

export default LoginComponent;
