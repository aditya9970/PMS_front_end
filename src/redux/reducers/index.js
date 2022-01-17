import { combineReducers } from "redux";
import navbarReducer from "./navbarReducer";
import projectReducer from "./projectsReducer";
import statsReducer from "./statsReducer";
import tempReducer from "./tempReducer";

export default combineReducers({
  navbar: navbarReducer,
  projects: projectReducer,
  create: tempReducer,
  stats: statsReducer,
});
