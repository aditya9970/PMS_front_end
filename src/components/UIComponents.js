import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const NavbarCompnent = () => {
  const navigate = useNavigate();
  const { active } = useSelector((state) => state.navbar);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(active);
    switch (active) {
      case 1:
        navigate("/stats");
        return;
      case 2:
        navigate("/projects");
        return;
      case 3:
        return;
      case 4:
        navigate("/projects/create");
        return;
      default:
        return null;
    }
  }, [active]);
  return (
    <>
      {active !== 0 && (
        <div className="lg:h-screen fixed z-50 bottom-0 lg:top-0 left-0 bg-white flex lg:flex-col flex-row lg:w-12 w-screen justify-center align-center">
          <div
            onClick={() => dispatch({ type: "SET_Tab", payload: 1 })}
            className="w-12 h-12 flex justify-center items-center"
          >
            <i
              className={`${
                active === 1 ? "text-blue-600" : "text-gray-600"
              }  text-xl fas fa-tachometer-alt`}
            ></i>
          </div>
          <div
            onClick={() => dispatch({ type: "SET_Tab", payload: 2 })}
            className="w-12 h-12 flex justify-center items-center"
          >
            <i
              className={`${active === 2 ? "text-blue-600" : "text-gray-600"}
         text-xl fas fa-list`}
            ></i>
          </div>
          <div
            onClick={() => dispatch({ type: "SET_Tab", payload: 3 })}
            className="w-12 h-12 flex justify-center items-center"
          >
            <i
              className={`${active === 3 ? "text-blue-600" : "text-gray-600"}
         text-xl fas fa-user-lock`}
            ></i>
          </div>
          <div
            onClick={() => dispatch({ type: "SET_Tab", payload: 4 })}
            className="w-12 h-12 flex justify-center items-center"
          >
            <i
              className={`${active === 4 ? "text-blue-600" : "text-gray-600"}
         text-xl fa fa-plus`}
            ></i>
          </div>
          <hr className="my-2 border-black-3" />
          <div
            className="w-12 h-12 flex justify-center self-end items-center"
            onClick={() => navigate("/")}
          >
            <i className={`text-gray-600 text-xl fas fa-sign-out-alt`}></i>
          </div>
        </div>
      )}
    </>
  );
};

export const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className="inline">
      <i className="fas fa-chevron-left mr-2 text-white mt-1"></i>
    </div>
  );
};
