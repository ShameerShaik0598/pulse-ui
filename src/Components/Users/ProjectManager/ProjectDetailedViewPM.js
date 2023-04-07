import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetailedView from "../../CommonComponents/Project DetailedView";
import AddConcern from "./AddConcern";

function ProjectDetailedViewPM() {
  let { project_id } = useParams();

  return (
    <div>
      <div>
        <ProjectDetailedView
          url={`http://localhost:1000/project-manager/get-projectDetails-Byid/${project_id}`}
        />
      </div>
      <div>
        <AddConcern project_id={project_id} />
      </div>
    </div>
  );
}

export default ProjectDetailedViewPM;
