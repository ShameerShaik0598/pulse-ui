import React from "react";
import "./Admin.css";
import "../../../App.css"
import { NavLink } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearState } from "../../../Slices/userLoginSlice";

function AdminHomepage() {
  let { userObj, role } = useSelector((state) => state.user);
  console.log("for naaaame", userObj);
  let navigate = useNavigate();

  let dispatch = useDispatch();

  const handleLogout = () => {
    let actionObj = clearState();
    dispatch(actionObj);
    sessionStorage.removeItem("token");
    navigate("/");
  };


  useEffect(() => {
    // if there is no token then redirect to login page
    if (sessionStorage.getItem("token") === null) {
      console.log("token not found");
      navigate("/");
    }
  }, []);


  return (
    <div>
      <div className="p-3 text-warning nav bg-black">
        <ul className="nav justify-content-start">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active hello nav-link" : "inactive hai nav-link"
              }
              // to="/get-all-projects-admin"
              onClick={() => navigate("get-all-projects-admin")}
            >
              All Projects
            </NavLink>
          </li>
          <li className="nav-item float-end">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              onClick={() => navigate("add-project")}
            >
              {" "}
              Add Project
            </NavLink>
          </li>
          <li className="nav-item float-end">
            <NavLink
              onClick={(project_id) => navigate(`modify-project/${project_id}`)}
            >
              {" "}
              Modify Project
            </NavLink>
          </li>
          <li className="nav-item float-end">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              onClick={handleLogout}
            >
              {" "}
              Logout
            </NavLink>
          </li>{" "}
          <li className="bg-success  text-end justify-content-end">
            <p className="text-white"> {userObj.payload?.email}</p>
          </li>
        </ul>
      </div>
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHomepage;
