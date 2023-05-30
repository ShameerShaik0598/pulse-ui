import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";

function GetAllPorjects({ url, type }) {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();

  const [gdoHeads, setGdo] = useState([]);
  const [pm, setPM] = useState([]);

  //Get all GDO Heads
  const getGdo = async () => {
    let res = await axios.get("http://localhost:1000/user/management-emp");
    console.log(res.data.gdo);
    setGdo(res.data.gdo);
  };
  //fetch managers after first render
  useEffect(() => {
    getGdo();
  }, []);

  //Get all Project Managers
  const getPM = async () => {
    let res = await axios.get("http://localhost:1000/user/management-emp");
    console.log(res.data.pm);
    setPM(res.data.pm);
  };
  //fetch managers after first render
  useEffect(() => {
    getPM();
  }, []);

  //state
  let [projects, setProjects] = useState([]);
  //modal state
  let [showModal, setShowModal] = useState(0);

  const openModal = () => {
    setShowModal(1);
  };
  const closeModal = () => {
    setShowModal(0);
  };

  //function to edit project
  const editProject = (userObj) => {
    //open modal
    openModal();
    //set Values to the modal
    console.log(userObj);
    setValue("project_id", userObj.project_id);
    setValue("project_name", userObj.project_name);
    setValue("client_account_manager", userObj.client_account_manager);
    setValue("gdo", userObj.gdo);
    setValue("project_manager", userObj.project_manager);
    setValue("status", userObj.status);
    setValue("fitness_indicator", userObj.fitness_indicator);
    setValue("client", userObj.client);
  };

  const saveProject = async () => {
    let token = sessionStorage.getItem("token");
    let updatedProject = getValues();
    console.log(updatedProject);
    let res = await axios.put(
      `http://localhost:1000/admin/update-project/${updatedProject.project_id}`,
      updatedProject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //close the modal
    reset();
    getData();
    closeModal();
  };

  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  //get data
  const getData = async () => {
    let res = await axios.get(url, {
      headers: { Authorization: `bearer ${token}` },
    });
    setProjects(res.data.payload);
    console.log(res);
  };

  const redirectHandler = (project_id) => {
    navigate(`get-projectDetails-Byid/${project_id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <h2 className="text-center m-4">All Projects</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="text-center bg-dark text-white align-middle">
            <th>Project Id</th>
            <th>Project Name</th>
            <th>Client</th>
            <th>Client Account Manager</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Fitness Indicator</th>
            <th>View</th>
            {type === "admin" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {projects.map((userObj, index) => (
            <tr
              className="align-middle text-center"
              key={index}
              style={{ cursor: "pointer" }}
            >
              <td className="fw-bold">{userObj.project_id}</td>

              <td>{userObj.project_name}</td>
              <td>{userObj.client}</td>
              <td>{userObj.client_account_manager}</td>
              <td>{userObj.status}</td>
              <td>{userObj.start_date.toString().slice(0, 10)}</td>
              <td>
                {userObj.end_date === null
                  ? "-"
                  : userObj.end_date.toString().slice(0, 10)}
              </td>
              <td>{userObj.fitness_indicator}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => redirectHandler(userObj.project_id)}
                >
                  View
                </button>
              </td>
              {type === "admin" && (
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editProject(userObj)}
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* modal to modify or update project  */}
      {type === "admin" && (
        <Modal show={showModal} onHide={closeModal} backdrop={"static"}>
          {/* <Modal show={show} onHide={handleClose}> */}
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <form className="text-start p-3" onSubmit={handleSubmit(saveProject)}>
            <Modal.Body>
              {/* project id  */}
              <div>
                <label>Project Id</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-2"
                  id="project_id"
                  {...register("project_id")}
                ></input>
              </div>
              {/* project name  */}
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="form-control mt-2 mb-2"
                  id="project_name"
                  disabled
                  {...register("project_name")}
                ></input>
              </div>
              {/* Client  */}
              <div>
                <label>Client</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-2"
                  placeholder="Client"
                  {...register("client", { required: true })}
                ></input>
                {errors.client?.type === "required" && (
                  <p className="text-danger">Mention Client</p>
                )}
              </div>
              {/* client account manager  */}
              <div>
                <label>Client Account Manager</label>
                <input
                  type="text"
                  placeholder="Client Account Manager"
                  className="form-control mt-2 mb-2"
                  {...register("client_account_manager", { required: true })}
                ></input>
                {errors.client_account_manager?.type === "required" && (
                  <p className="text-danger">Mention Client Account Manager</p>
                )}
              </div>
              {/* GDO  */}
              <div>
                <label>GDO</label>
                <select
                  className="form-control mt-2 mb-2"
                  id="gdo"
                  {...register("gdo", { required: true })}
                >
                  <option value="">select the GDO</option>
                  {gdoHeads &&
                    gdoHeads?.map((gdoObj) => (
                      <option value={gdoObj.first_name} key={gdoObj.first_name}>
                        {gdoObj.user_id}-{gdoObj.first_name} {gdoObj.last_name}
                      </option>
                    ))}
                </select>
                {errors.gdo?.type === "required" && (
                  <p className="text-danger">Please select the GDO Head</p>
                )}
              </div>
              {/* Project Managers  */}
              <div>
                <label>Project Managers</label>
                <select
                  className="form-control mt-2 mb-2"
                  id="project_manager"
                  {...register("project_manager", { required: true })}
                >
                  <option value="">select the Project Manager</option>
                  {pm &&
                    pm?.map((pmObj) => (
                      <option value={pmObj.first_name} key={pmObj.first_name}>
                        {pmObj.user_id}-{pmObj.first_name} {pmObj.last_name}
                      </option>
                    ))}
                </select>
                {errors.project_manager?.type === "required" && (
                  <p className="text-danger">
                    Please select the Project Manager
                  </p>
                )}
              </div>
              {/* fitness */}
              <div>
                <label>Fitness</label>
                <select
                  className="form-control mt-2 mb-2"
                  id="fitness_indicator"
                  {...register("fitness_indicator", { required: true })}
                >
                  <option value="">select the fitness level</option>
                  <option value="green">Green</option>
                  <option value="amber">Amber</option>
                  <option value="red">Red</option>
                </select>
                {errors.fitness_indicator?.type === "required" && (
                  <p className="text-danger">Enter fitness of the project</p>
                )}
              </div>
              {/* status */}

              <div>
                <label>Status</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-2"
                  placeholder="domain"
                  id="status"
                  {...register("status", { required: true })}
                />
                {errors.status?.type === "required" && (
                  <p className="text-danger">Enter the Status of the project</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
          {/* </Modal> */}
        </Modal>
      )}
    </div>
  );
}

export default GetAllPorjects;
