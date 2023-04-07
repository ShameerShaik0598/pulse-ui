import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function AddResourceRequest({ project_id }) {
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
    let res = await axios.post(
      `http://localhost:1000/gdo/resource-request/project/${project_id}`,
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
      <div class="card">
        <div class="card-body bg-black text-warning border ">
          <h5 class="card-title text-center">Resource Request</h5>
          <p class="card-text text-white text-center pt-2">Click here to Add Resource</p>
          <button
            className="btn btn-success text-white mx-auto "
            onClick={editUser}
          >
            Add Resource
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
            <input
              type="text"
              className="form-control"
              {...register("resource_desc", {
                required: "Resource Description is required",
              })}
              placeholder="Resource Description"
            />

            {/* Gdo input  */}
            <div className="m-3">
              <input
                type="text"
                className="form-control"
                {...register("no_of_resources", {
                  required: "Number of resources is required",
                })}
                placeholder="no_of_resources"
              />
            </div>
            {/* Start date */}
            <div className="m-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                {...register("date")}
                placeholder="Date"
              />
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

export default AddResourceRequest;
