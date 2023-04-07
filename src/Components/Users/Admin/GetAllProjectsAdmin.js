import React from "react";

import GetAllPorjects from "../../CommonComponents/GetAllProjects";

function GetAllProjectsAdmin() {
  return (
    <div>
      <GetAllPorjects url={"http://localhost:1000/admin/get-projects"} />
    </div>
  );
}

export default GetAllProjectsAdmin;
