import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/createProjectPage";
import ListProjectsPage from "./pages/ListProjectsPage";
import { NavbarCompnent } from "./components/UIComponents";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App relative">
        <div className="bg-blue-600 background" />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/projects/" element={<ListProjectsPage />} />
          <Route path="/stats/" element={<StatsPage />} />
        </Routes>
        <NavbarCompnent />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
