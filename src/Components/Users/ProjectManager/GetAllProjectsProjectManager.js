import React from "react";

import GetAllPorjects from "../../CommonComponents/GetAllProjects";

function GetAllProjectsProjectManager() {
  return (
    <div>
      <GetAllPorjects
        url={"http://localhost:1000/project-manager/get-projects"}
        type={"pm"}
      />
    </div>
  );
}

export default GetAllProjectsProjectManager;
