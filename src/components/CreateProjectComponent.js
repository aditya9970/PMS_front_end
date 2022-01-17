import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoBack } from "./UIComponents";

const ProjectForm = () => {
  const values = useSelector((state) => state.create);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    dispatch({
      type: "Change",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    fetch("http://localhost:8000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          console.log(data.error);
        } else {
          dispatch({ type: "Reset" });
          dispatch({ type: "ForceUpdate" });
          dispatch({ type: "setLoading" });
          console.log(data);
          toast.success(data.message);
        }
      });
  };
  return (
    <div>
      <div
        className="flex container mx-auto px-10 pt-5 w-full"
        style={{ maxWidth: "90vw" }}
      >
        <div className="text-white lg:w-1/3">
          <GoBack /> Create Project
        </div>
        <div className="lg:w-1/3 text-center text-white">Icon Here</div>
        <div className="lg:w-1/3 text-right "></div>
      </div>

      <form
        className="container bg-white mx-auto my-8 p-10 py-8 rounded-2xl shadow-md"
        style={{ maxWidth: "90vw" }}
        onSubmit={handleSubmit}
      >
        <textarea
          name="name"
          className="text-xl text-gray-500 ml-10 lg:w-2/3 w-5/6 rounded-md px-4 py-2 mb-2"
          required
          style={{
            backgroundColor: "#E1E1EB",
          }}
          autoComplete="false"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter Project"
        ></textarea>
        <hr />
        <div className="lg:w-4/6 w-full flex flex-col">
          <div className="flex lg:flex-row flex-col">
            <div className="flex  flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Reason</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="reason"
                required
                onChange={handleChange}
                value={values.reason}
              >
                <option value="Business">Business</option>
                <option value="Dealership">Dealership</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Type</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="type"
                required
                onChange={handleChange}
                value={values.type}
              >
                <option value="Internal">Internal </option>
                <option value="External">External </option>
                <option value="Vendor">Vendor </option>
              </select>
            </div>
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Division</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="division"
                required
                onChange={handleChange}
                value={values.division}
              >
                <option value="Compressor">Compressor</option>
                <option value="Filters">Filters</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="Water Heater">Water Heater</option>
              </select>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col ">
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Category</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="category"
                required
                onChange={handleChange}
                value={values.category}
              >
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
            </div>
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Priority</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="priority"
                required
                onChange={handleChange}
                value={values.priority}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Reason</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="department"
                required
                onChange={handleChange}
                value={values.department}
              >
                <option value="Stratergy">Stratergy</option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col">
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Start Date</label>
              <input
                type="date"
                placeholder="DD-MM-YYYY"
                name="startDate"
                required
                onChange={handleChange}
                value={values.startDate}
              />
            </div>
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">End Date</label>
              <input
                type="date"
                placeholder="DD-MM-YYYY"
                name="endDate"
                required
                onChange={handleChange}
                value={values.endDate}
              />
            </div>
            <div className="flex flex-col lg:w-1/3 p-2">
              <label className="font-medium text-gray-600">Location</label>
              <select
                className="px-4 py-2 rounded-md"
                style={{
                  backgroundColor: "#E1E1EB",
                }}
                name="location"
                required
                onChange={handleChange}
                value={values.location}
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Calcutta">Calcutta</option>
                <option value="Banglore">Banglore</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="lg:w-1/3 px-2 font-medium">
              <span className="text-gray-600">Status </span> : Registered
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 py-2 px-8 rounded-full text-white self-center my-2"
            style={{ width: "max-content" }}
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
