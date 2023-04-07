import React from "react";

function Concerns({ concerns }) {
  return (
    <div className="container shadow">
      <h3 className="text-warning text-center p-2 bg-black">Project Concerns</h3>

      <table className="table table-bordered table-striped table-responsive">
        <thead className="bg-dark text-white">
          <tr>
            <th>Project Id</th>
            <th>Concern Id</th>
            <th>Raised By</th>
            <th>Raised On</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {concerns?.map((concerns, index) => (
            <tr key={index}>
              <td>{concerns.concern_id}</td>
              <td>{concerns.project_id}</td>
              <td>{concerns.raised_by}</td>
              <td>{concerns.raised_date}</td>
              <td>{concerns.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Concerns;
