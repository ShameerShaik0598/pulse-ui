import React from "react";

import GetAllPorjects from "../../CommonComponents/GetAllProjects";

function GetAllProjectsGDO() {
  return (
    <div>
      <GetAllPorjects url={"http://localhost:1000/gdo/get-projects"} />
    </div>
  );
}

export default GetAllProjectsGDO;
