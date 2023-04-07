import React from "react";

import { useParams } from "react-router-dom";
import ProjectDetailedView from "../../CommonComponents/Project DetailedView";
import GetResourceRequests from "./GetResourceRequest";

function ProjectDetailedViewAdmin() {
  let { project_id } = useParams();
  return (
    <div>
      <div>
        <ProjectDetailedView
          url={`http://localhost:1000/admin/get-projectDetails-Byid/${project_id}`}
        />
      </div>
      <div>
        <GetResourceRequests />
      </div>
    </div>
  );
}

export default ProjectDetailedViewAdmin;
