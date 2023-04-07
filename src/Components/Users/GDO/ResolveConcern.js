import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function ResolveConcern({ project_id }) {
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
    let updatedConcern = getValues();
    console.log(updatedConcern);
    closeModal();
    //update data through API
    let res = await axios.put(
      `http://localhost:1000/gdo/resolve-concern/${project_id}`,
      updatedConcern,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="w-25 float-start bg-black ">
      <div className="concern-card" class="card">
        <div class="card-body bg-black text-white border ">
          <h5 class="card-title text-warning text-center">Resolve Concern</h5>
          <p class="card-text text-center pt-2">Click here to Resolve Concern</p>
          <button
            className="btn btn-success text-white mx-auto "
            onClick={editUser} >
            Resolve Concern
          </button>
        </div>
      </div>

      {/* Modal for editing */}

      <Modal show={show} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Resolve Concern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="m-3">
              <label>Staus</label>
              <select
                defaultValue="Status"
                {...register("status")}
                className="form-control"
              >
                <option value="title">-- Status Update --</option>
                <option value="In Progress">In Progress</option>
                <option value="Mitigated">Mitigated</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={saveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ResolveConcern;
