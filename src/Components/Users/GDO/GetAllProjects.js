import React from "react";

import GetAllPorjects from "../../CommonComponents/GetAllProjects";

function GetAllProjectsGDO() {
  return (
    <div>
      <GetAllPorjects url={"http://localhost:1000/gdo/get-projects"}
      type={"gdo"} />
    </div>
  );
}

export default GetAllProjectsGDO;
