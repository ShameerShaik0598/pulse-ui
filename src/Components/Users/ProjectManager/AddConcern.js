import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function AddConcern() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  //Get token from browser storage
  let token = sessionStorage.getItem("token");

  //get params
  let { project_id } = useParams();

  //function to handle registration
  const handleConcern = async (project) => {
    project.status = "In progress";
    console.log(project);

    //Send API request
    let res = await axios.post(
      `http://localhost:1000/project-manager/project-concern/${project_id}`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reset();
  };

  return (
    <div>
      <div className="w-50 mx-auto shadow rounded p-3 ">
        <div className="m-3">
          <h1>Raise a Concern</h1>
        </div>
        {/* description  */}
        <form className="form" onSubmit={handleSubmit(handleConcern)}>
          <div className="m-3">
            <input
              type="text"
              className="form-control"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-danger text-start ms-2">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Input field for Concern */}
          <div className="m-3">
            <input
              type="date"
              className="form-control"
              {...register("raised_date", {
                required: "Raised date is required",
              })}
            />
            {errors.resource_desc && (
              <p className="raised_date text-start ms-2">
                {errors.raised_date.message}
              </p>
            )}
          </div>

          {/* severity  */}
          <select
            className="form-control mx-auto"
            {...register("severity")}
            defaultValue="title"
          >
            <option value="title" disabled>
              --- Select Severity ---
            </option>

            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="Moderate">Modarate</option>
          </select>
          {/* exposed to client  */}
          <div className="m-3">
            <label>Exposed To Client</label>
            <select {...register("raised_by_client")} className="form-control">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="m-3">
            <button className="btn btn-success d-block w-100 mx-auto">
              Raise Concern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddConcern;
