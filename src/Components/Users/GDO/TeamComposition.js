import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function TeamComposition({ project_id }) {
  let { register, setValue, getValues } = useForm();

  //state for modal
  let [show, setShow] = useState();

  //function to open model
  const openModal = () => setShow(true);
  //function close model
  const closeModal = () => setShow(false);

  //read token from browser storage
  let token = sessionStorage.getItem("token");

  //function to handle edit click event
  const editUser = () => {
    openModal();
    // setUsers();
  };

  //save changes
  const saveChanges = async () => {
    let newEmp = getValues();
    console.log(newEmp);
    closeModal();
    //update data through API
    let res = await axios.post(
      `http://localhost:1000/gdo/team/project/${project_id}`,
      { team: [newEmp] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="w-25 float-start bg-black ">
      <div class="card">
        <div class="card-body bg-black text-white border ">
          <h5 class="card-title text-center text-warning">Add Employee</h5>
          <p class="card-text pt-2 text-center">Click here to Add Employee</p>
          <button className="btn btn-success text-white" onClick={editUser}>
            Add Emp
          </button>
        </div>
      </div>

      {/* Modal to Add Employee */}

      <Modal show={show} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="m-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                {...register("name")}
                className="form-control"
              />
            </div>

            <div className="m-3">
              <label>Role</label>
              <select
                defaultValue="title"
                {...register("role")}
                className="form-control"
              >
                <option value="title">-- Select Role --</option>
                <option value="Front-End Developer">Front-End Developer</option>
                <option value="Backend-Developer">Backend-Developer</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>

            <div className="m-3">
              <label>Exposed To Client</label>
              <select
                {...register("exposed_to_customer")}
                className="form-control"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="m-3">
              <label>Exposed To Client</label>
              <select {...register("allocation_type")} className="form-control">
                <option value="permanent">Permanent</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeamComposition;
