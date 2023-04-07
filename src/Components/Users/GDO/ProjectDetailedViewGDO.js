import React from "react";
import { useParams } from "react-router-dom";
import TeamComposition from "./TeamComposition";
import AddResourcesRequests from "./AddResourceRequest";
import ProjectDetailedView from "../../CommonComponents/Project DetailedView";
import ResolveConcern from "./ResolveConcern";
import "./ProjectDetailedView.css";

function ProjectDetailedViewGDO() {
  let { project_id } = useParams();

  return (
    <div>
      <div>
        <ProjectDetailedView
          url={`http://localhost:1000/gdo/get-projectDetails-Byid/${project_id}`}
        />
      </div>
      <div className="d-flex justify-content-evenly mx-auto p-3 ">
        <TeamComposition project_id={project_id} />
        <ResolveConcern project_id={project_id} />
        <AddResourcesRequests project_id={project_id} />
      </div>
    </div>
  );
}

export default ProjectDetailedViewGDO;
