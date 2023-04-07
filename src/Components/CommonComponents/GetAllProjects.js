import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetAllPorjects({ url }) {
 
  //state
  let [projects, setProjects] = useState([]);
  
  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  //get data
  const getData = async () => {

    let res = await axios.get(url, {
      headers: { Authorization: `bearer ${token}` },
    });
    setProjects(res.data.payload);
   
  };

  const redirectHandler = (project_id) => {
    navigate(`get-projectDetails-Byid/${project_id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <h2 className="text-center m-4">All Projects</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="text-center bg-dark text-white align-middle">
            <th>Project Id</th>
            <th>Project Name</th>
            <th>Client</th>
            <th>Client Account Manager</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Fitness Indicator</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((userObj, index) => (
            
            <tr
              className="align-middle text-center"
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => redirectHandler(userObj.project_id)}
            >
              <td className="fw-bold">{userObj.project_id}</td>

              <td>{userObj.project_name}</td>
              <td>{userObj.client}</td>
              <td>{userObj.client_account_manager}</td>
              <td>{userObj.status}</td>
              <td>{userObj.start_date.toString().slice(0, 10)}</td>
              <td>
                {userObj.end_date === null
                  ? "-"
                  : userObj.end_date.toString().slice(0, 10)}
              </td>
              <td>{userObj.fitness_indicator}</td>
              <td>
                <button className="btn btn-success">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllPorjects;
