import axios from "axios";
import React, { useEffect, useState } from "react";
import Concerns from "./Concerns";
import ProjectDetails from "./ProjectDetails";
import ProjectIndicator from "./ProjectIndicator";
import TeamDetails from "./TeamDetails";
import Updates from "./Updates";
import ResourceRequests from "./ResourceRequest";
import { Navigate, useNavigate } from "react-router-dom";

function ProjectDetailedView({ url }) {
  let token = sessionStorage.getItem("token");

  let [project, setProject] = useState({});

  const getProjectDetailedView = async () => {
    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProject(res.data.payload);
  };

  useEffect(() => {
    getProjectDetailedView();
  }, []);

  let navigate = useNavigate();


  return (
    <div>
      {/* To Display Indiactor */}
      <ProjectIndicator project={project} />

      {/* Project detailed View */}
      <ProjectDetails project={project} />

      {/* Team Details */}
      {project.employees?.length === 0 ? (
        <p className="fs-2 text-danger m-5">
          No Project Updates in past two weeks
        </p>
      ) : (
        <TeamDetails employees={project.employees} />
      )}

      {/* Project Updates */}
      {project.updates?.length === 0 ? (
        <p className="fs-2 text-danger m-5">
          No Project Updates in past two weeks
        </p>
      ) : (
        <Updates updates={project.updates} />
      )}

      {/* Concerns */}
      {project.concerns === undefined ? (
        <p></p>
      ) : project.concerns.length === 0 ? (
        <p className="fs-2 text-danger m-5">No Project Concerns found</p>
      ) : (
        <Concerns concerns={project.concerns} />
      )}
      {/* Resourcing requests */}
      {project.resourcing_requests === undefined ? (
        <p></p>
      ) : project.resourcing_requests.length === 0 ? (
        <p className="fs-2 text-danger m-5">No Resourcing Requests</p>
      ) : (
        <ResourceRequests resourcing_requests={project.resourcing_requests} />
      )}
      {/* </div> */}
    </div>
  );
}

export default ProjectDetailedView;
