import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoBack } from "./UIComponents";
const ListProjectComponent = () => {
  const dispatch = useDispatch();
  const { filters, projects, isLoading, searchValue, pages } = useSelector(
    (state) => state.projects
  );
  const handleChangeFilters = (e) => {
    console.log("filter changes", e.target.name, e.target.value);
    if (e.target.name !== "pageNo")
      dispatch({
        type: "changeFilter",
        payload: { [e.target.name]: e.target.value, pageNo: 1 },
      });
    else
      dispatch({
        type: "changeFilter",
        payload: { [e.target.name]: e.target.value },
      });
  };

  const handleStatus = (value, id) => {
    console.log({ value, id });

    fetch(`http://localhost:8000/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: value,
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
          console.log(data);
          let temp = projects.map((project) => {
            console.log(project._id, data.data._id);
            return project._id === data.data._id ? data.data : project;
          });
          toast.dismiss();
          toast.success(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          console.log(temp);
          dispatch({
            type: "loadProjects",
            payload: { projects: temp, pages: pages },
          });
          dispatch({ type: "ForceUpdate" });
        }
      });
  };

  useEffect(() => {
    console.log("isLoadingchanged");
    isLoading &&
      fetch(
        "http://localhost:8000/api/projects/getAll?" +
          new URLSearchParams(filters).toString(),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: searchValue }),
        }
      )
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
            console.log(data);
            dispatch({
              type: "loadProjects",
              payload: { projects: data.projects, pages: data.pages },
            });
          }
        });
  }, [isLoading]);

  const renderButton = (active, name) => {
    return (
      <>
        {active ? (
          <button
            className="mx-2 px-4  rounded-full text-white"
            style={{
              backgroundColor: "#0291CC",
              borderColor: "#0291CC",
              borderWidth: "1px",
            }}
          >
            {name}
          </button>
        ) : (
          <button
            className="mx-2 px-4  rounded-full "
            style={{
              backgroundColor: "white",
              color: "black",
              borderColor: "black",
              borderWidth: "1px",
            }}
          >
            {name}
          </button>
        )}
      </>
    );
  };

  const handleChangeSearch = (e) => {
    dispatch({ type: "changeSearch", payload: e.target.value });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "setLoading" });
  };

  return (
    <>
      <div
        className="flex container mx-auto px-10 pt-5 w-full"
        style={{ maxWidth: "90vw" }}
      >
        <div className="text-white w-1/3">
          <GoBack /> Project Listing
        </div>
        <div className="w-1/3 text-center text-white">Icon Here</div>
        <div className="w-1/3 text-right ">
          <form>
            <label className="mx-2 text-white">Dep :</label>
            <select
              onChange={handleChangeFilters}
              name="department"
              required
              // defaultValue={"All"}
              value={filters.department}
              className="mx-2 bg-transparent text-white"
            >
              <option value="All">All</option>
              <option value="Stratergy">Stratergy</option>
              <option value="Finance">Finance</option>
              <option value="Quality">Quality</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Stores">Stores</option>
              <option value="HR">HR</option>
            </select>
            <label className="mx-2 text-white">Location :</label>

            <select
              // defaultValue={"All"}
              onChange={handleChangeFilters}
              name="location"
              required
              value={filters.location}
              className="mx-2 bg-transparent text-white"
            >
              <option value="All">All</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Calcutta">Calcutta</option>
              <option value="Banglore">Banglore</option>
            </select>
          </form>
        </div>
      </div>
      <div
        className="container bg-white mx-auto my-8 p-10 py-8 rounded-2xl shadow-md"
        style={{ maxWidth: "90vw", height: "80vh" }}
      >
        <form className="flex justify-between mb-4">
          <div className="w-2/6 flex items-center">
            <input
              placeholder="Search"
              onChange={handleChangeSearch}
              onSubmit={handleSearch}
              value={searchValue}
              className="grow border-b-2 p-1 px-2"
            />{" "}
            <i
              className="fas fa-search"
              style={{ marginLeft: "-30px" }}
              onClick={handleSearch}
            ></i>
          </div>
          <div>
            <label className="text-gray-500" htmlFor="priority">
              Priority :
            </label>
            <select
              // defaultValue={"All"}
              id="priority"
              name="priority"
              className="p-2 -pr-4"
              required
              onChange={handleChangeFilters}
              value={filters.priority}
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </form>
        <div style={{ overflowX: "scroll", maxWidth: "100%" }}>
          <table style={{ maxWidth: "100%" }}>
            <tbody>
              {projects.map((project, i) => (
                <tr
                  key={project._id}
                  className="fade-in-fwd"
                  style={{
                    animationDelay: i / 10 + "s",
                  }}
                >
                  <td style={{ maxWidth: "400px", width: "100%" }}>
                    <div className="flex flex-col">
                      <h4 className="font-medium text-gray-800">
                        {project.name}
                      </h4>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "scroll",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <small className="text-gray-500">
                          {moment(project.startDate).format("Do MMM YY")} to{" "}
                          {moment(project.endDate).format("Do MMM YY")}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{project.reason}</td>
                  <td>{project.type}</td>
                  <td>{project.division}</td>
                  <td>{project.category}</td>
                  <td>{project.priority}</td>
                  <td>{project.department}</td>
                  <td>{project.location}</td>
                  <td>{project.status}</td>
                  <td>
                    <div className="flex " style={{ width: "max-content" }}>
                      <div
                        onClick={() => {
                          handleStatus("Running", project.name);
                          console.log({ name: project.name });
                        }}
                      >
                        {renderButton(
                          project.status === "Running" ? true : false,
                          "Start"
                        )}
                      </div>
                      <div onClick={() => handleStatus("Closed", project.name)}>
                        {renderButton(
                          project.status === "Closed" ? true : false,
                          "Close"
                        )}
                      </div>
                      <div onClick={() => handleStatus("Cancel", project.name)}>
                        {renderButton(
                          project.status === "Cancel" ? true : false,
                          "Cancel"
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full">
          <ul className="flex mx-auto justify-center my-2 ">
            {Array(pages)
              .fill(0)
              .map((el, i) => (
                <li
                  name="pageNo"
                  key={i}
                  className={`p-1 px-3 border  ${
                    filters.pageNo == i + 1 && "bg-gray-500 text-white"
                  }`}
                  onClick={() =>
                    filters.pageNo != i + 1 &&
                    handleChangeFilters({
                      target: { name: "pageNo", value: i + 1 },
                    })
                  }
                >
                  {i + 1}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListProjectComponent;
