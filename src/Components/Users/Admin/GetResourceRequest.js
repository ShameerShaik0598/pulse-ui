import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetResourceRequests() {
  //state
  let [resourceRequests, setResourceRequests] = useState([]);

  //get token
  let token = sessionStorage.getItem("token");

  //get data
  const getData = async () => {
    let res = await axios.get(
      "http://localhost:1000/admin/get-resource-request",
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    setResourceRequests(res.data.payload);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="text-center m-4">All Resource Requests</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="text-center bg-dark text-white align-middle">
            <th>Request Id</th>
            <th>Date</th>
            <th>Raised By</th>
            <th>Resource_desc</th>
            <th>No of resources</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {resourceRequests.map((userObj, index) => (
            // <tr className="text-center align-middle">
            <tr className="align-middle text-center">
              <td className="fw-bold">{userObj.request_id}</td>
              <td>{userObj.date.toString().slice(0, 10)}</td>
              <td>{userObj.raised_by}</td>
              <td>{userObj.resource_desc}</td>
              <td>{userObj.no_of_resources}</td>
              {/* <td>{userObj.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetResourceRequests;
