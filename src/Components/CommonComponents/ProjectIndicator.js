import React from "react";
import "./ProjectIndicator.css";
import { GiProgression } from "react-icons/gi";

function ProjectIndicator({ project }) {
  return (
    <div className="container">
      <div className="row row-cols-3">
        <div className="card" className="col">
          <div className="card-body bg-black text-white border ">
            <h5 className="card-title text-center">Project Fitness</h5>
            <hr className="" />
            {project.fitness_indicator === "red" ? (
              <h3 className="text-danger text-center d-flex justify-content-evenly">
                Red <GiProgression />
              </h3>
            ) : project.fitness_indicator === "amber" ? (
              <h3 className="text-warning text-center d-flex justify-content-evenly">
                Amber <GiProgression />
              </h3>
            ) : (
              <h3 className="text-success text-center d-flex justify-content-evenly">
                Green <GiProgression />
              </h3>
            )}
          </div>
        </div>
        {/* Concerns Crad  */}
        <div className="card col">
          <div className="card-body bg-black text-white border ">
            <h5 className="card-title text-center">Concerns</h5>
            <hr />
            <h3 className="text-warning text-center">
              {project.concerns?.length}
            </h3>
          </div>
        </div>
        {/* Team Size  */}
        <div className="card col">
          <div className="card-body bg-black text-white border ">
            <h3 className="card-title text-center">Team Size</h3>
            <hr />

            <h3 className="text-warning text-center">
              {project.employees?.length}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectIndicator;
