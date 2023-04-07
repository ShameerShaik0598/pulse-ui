import React from "react";
import { NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearState } from "../../../Slices/userLoginSlice";

function GdoHomepage() {
  let { userObj, role } = useSelector((state) => state.user);
  console.log(userObj);

  let navigate = useNavigate();

  let dispatch = useDispatch();

  const handleLogout = () => {
    let actionObj = clearState();
    dispatch(actionObj);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className="bg-black p-3 nav d-flex">
        <li className="nav-item ">
          <NavLink
            className="text-warning text-end"
            onClick={() => navigate("get-all-projects-gdo")}
          >
            {" "}
            All Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="text-warning text-end"
            onClick={() => navigate("add-project-gdo")}
          >
            {" "}
            Add Project
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="text-warning" onClick={handleLogout}>
            {" "}
            Logout
          </NavLink>
        </li>
        {console.log("email", userObj.payload.email)}
        <div className="d-block  flex-end">
          <p className="text-white fs-5">{userObj.payload.email}</p>
        </div>
      </div>

      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
}

export default GdoHomepage;
