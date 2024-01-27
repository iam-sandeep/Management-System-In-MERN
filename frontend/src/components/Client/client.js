import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./client.css";
import { useHistory } from "react-router-dom";


function UserList({ loginUser }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Fetch users from your API endpoint
    axios.get("http://localhost:9002/clients")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
  };

  const handleUpdate = () => {
    // Make a request to update the user on the server
    const updatedUser = {
      ...editingUser,
      name: updatedName,
      email: updatedEmail,
      role: updatedRole,

    };

    axios.put(`http://localhost:9002/users/${editingUser._id}`, updatedUser)
      .then(response => {
        // Update the local state with the updated user
        setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));
        // Reset editing state
        setEditingUser(null);
        setUpdatedName("");
        setUpdatedEmail("");
      })
      .catch(error => console.error("Error updating user:", error));
  };

  let userdata = [];

    if (loginUser?.role !== 'Admin') {
    userdata = users.filter(user => user._id === loginUser?._id);
    console.log(loginUser?._id);
  } else if (loginUser?.role === 'Admin') {
    userdata = users;
  }

  console.log("Login User:", loginUser);


  const handleDelete = (userId) => {
    // Make a request to delete the user on the server
    axios.delete(`http://localhost:9002/users/${userId}`)
        .then(() => {
            // Update the local state by removing the deleted user
            setUsers(users.filter(user => user._id !== userId));
        })
        .catch(error => {
            console.error("Error deleting user:", error);
            // Handle the error appropriately, e.g., display an error message to the user
        });
  };

  return (
    <div className="user-list">

    <header>
          
          <nav>

              
            <ul>
              <li className='h2'>Task Management System </li> 
              <li className='widthcol'></li> 
              {/* <li className='widthcol'></li>  */}
              {/* <li className='widthcol'></li>  */}
              {loginUser?.role === 'Client' && (
                  <li className='widthcol'></li>   
                    
              )}
              {loginUser?.role === 'Client' && (
                  <li className='widthcol'></li>   
                    
              )}

              {loginUser?.role === 'Client' && (
                    <li className='element'><Link to="/client">Client Details</Link></li>            
              )}

              {loginUser?.role === 'Admin' && (
                  <li className='element'><Link to="/client">Client Details</Link></li>            

              )}
              {loginUser?.role === 'Admin' && (
              <li className='element'><Link to="/user">Employee Details</Link></li>

              )}
              {loginUser?.role === 'User' && (
              <li className='element'><Link to="/user">Employee Details</Link></li>

              )}


              <li className='element'><Link to="/project">Project Details</Link></li>






              <div className="button" onClick={() => history.push("/login")}>Logout</div>

              
            </ul>
          </nav>
        </header>
      <div className="card">
        <div className="card-header">
          <h1>Client Details 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <span className="space"><Link to="/CreateUser" className="btn btn-success btn-sm">+ Create Client</Link></span></h1>

          
        </div>
        <div className="card-body">
          {/* Add the "Create User" button with Link */}
         

          {/* Edit Form */}
          {editingUser && (
            <div className="edit-form">
              <h2>Edit Client</h2>
              <label>Name:</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="text"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              

              <label>
              Role:
              <select name="role" className="create-user-form-select" value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)}>
                <option value="" disabled>Select Role</option>
                <option value="Admin">Admin</option> 
                <option value="User">User</option> 
              </select>
              </label>

              <button onClick={handleUpdate}>Update</button>
            </div>
          )}

          <table className="user-table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <button onClick={() => handleEditClick(user)} className="btn btn-info btn-sm">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
