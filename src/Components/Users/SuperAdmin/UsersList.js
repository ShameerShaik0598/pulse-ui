import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { NavLink } from "react-router-dom";

function UsersList() {
  //state

  let [users, setUsers] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let { register, getValues, setValue } = useForm();
  let [modifiedUser, setMoifiedUser] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  let token = sessionStorage.getItem("token");

  const getData = async () => {
    let res = await axios.get("http://localhost:1000/super-admin/role/users", {
      headers: { Authorization: `bearer ${token}` },
    });
    // console.log(res.data);
    setUsers(res.data.payload);
  };

  //edit user
  const editUser = (userObj) => {
    openModal();
    //set values to input fields
    setValue("role", userObj.role);
    setMoifiedUser(userObj);
  };

  //save user
  const saveUser = async () => {
    // get values from edited form
    let updatedUser = getValues();
    //close modal
    closeModal();
    console.log(modifiedUser);
    console.log("modifiedusee details are:", modifiedUser);
    //make http put req
    let res = await axios.put(
      `http://localhost:1000/super-admin/assign-role/user/${modifiedUser.email}`,
      updatedUser,
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    console.log(res);
    setMoifiedUser(res.data.payload);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  //delete user
  const deleteUser = async (email) => {
    let res = await axios.delete(
      `http://localhost:1000/super-admin/delete/user/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  };

  return (
    <div>
      <div className="table-responsive">
        <h2 className="text-center m-3">List of Users</h2>
        <table class="table table-striped table-bordered table-hover">
          <caption>List of Users</caption>
          <thead>
            <tr className="text-center bg-dark text-white align-middle">
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Assign Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userObj, index) => (
              <tr className="text-center align-middle" key={index}>
                <td className="fw-bold ">{userObj.user_id}</td>
                <td>{userObj.first_name + userObj.last_name}</td>
                <td>{userObj.email}</td>
                <td>{userObj.role}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editUser(userObj)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(userObj.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>

      <div>
        {" "}
        {/* Modal  */}
        <Modal show={showModal} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title className="text-black">Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-black">
            <form>
              <div>
                <div className="m-3 pb-3">
                  <lable className="form-label fw-bold">Assign a role</lable>
                  <select
                    className="form-control"
                    {...register("role")}
                    defaultValue="title"
                  >
                    <option value="title" disabled>
                      --- Select A Role ---
                    </option>

                    <option value="gdo">gdo</option>
                    <option value="project_manager">project_manager</option>
                    <option value="testing">testing</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={saveUser}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UsersList;
