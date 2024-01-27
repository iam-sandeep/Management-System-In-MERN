import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./project.css";
import { useHistory } from "react-router-dom";

function JobList({ loginUser }) {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [updatedJobid, setUpdatedJobid] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [updatedAllocated_to, setUpdatedAllocated_to] = useState("");
  const [updatedWords, setUpdatedWords] = useState("");
  const [updatedRate, setUpdatedRate] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Fetch jobs from your API endpoint
    axios.get("http://localhost:9002/job_index")
      .then(response => setJobs(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  const handleEditClick = (job) => {
    setEditingJob(job);
    setUpdatedJobid(job.job_id);
    setUpdatedDeadline(job.deadline);
    setUpdatedAllocated_to(job.allocated_to);
    setUpdatedWords(job.words);
    setUpdatedRate(job.rate);
  };

  const handleUpdate = () => {
    // Make a request to update the job on the server
    const updatedJob = {
      ...editingJob,
      job_id: updatedJobid,
      deadline: updatedDeadline,
      allocated_to: updatedAllocated_to,
      words: updatedWords,
      rate: updatedRate,
    };

    axios.put(`http://localhost:9002/jobs/${editingJob._id}`, updatedJob)
      .then(response => {
        // Update the local state with the updated job
        setJobs(jobs.map(job => (job._id === updatedJob._id ? response.data : job)));
        // Reset editing state
        setEditingJob(null);
        setUpdatedJobid("");
        setUpdatedDeadline("");
        setUpdatedAllocated_to("");
        setUpdatedWords("");
        setUpdatedRate("");
      })
      .catch(error => console.error("Error updating job:", error));
  };

  const handleDelete = (jobId) => {
    // Make a request to delete the job on the server
    axios.delete(`http://localhost:9002/jobs/${jobId}`)
      .then(() => {
        // Update the local state by removing the deleted job
        setJobs(jobs.filter(job => job._id !== jobId));
      })
      .catch(error => {
        console.error("Error deleting job:", error);
        // Handle the error appropriately, e.g., display an error message to the user
      });
  };

  // Initialize jobdata with an empty array
  let jobdata = [];

  if (loginUser?.role !== 'Admin') {
    jobdata = jobs.filter(job => job.allocated_to === loginUser?.name);
    // Additional code related to testingJobs if needed
  } else if (loginUser?.role === 'Admin') {
    jobdata = jobs;
    // Additional code related to testingJobs if needed
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Make a request to your backend endpoint that provides user information
    axios.get('http://localhost:9002/users')
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

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
          <h1>Project Details <span className="space"><Link to="/Createproject" className="btn btn-success btn-sm">+ Create Project</Link></span></h1>
        </div>
        <div className="card-body">
          {/* Add the "Create User" button with Link */}

          {/* Edit Form */}
          {editingJob && (
            <div className="edit-form">
              <h2>Edit Project</h2>
              <label>Job ID:</label>
              <input
                type="text"
                value={updatedJobid}
                onChange={(e) => setUpdatedJobid(e.target.value)}
              />
              <label>Deadline:</label>
              <input
                type="date"
                value={updatedDeadline}
                onChange={(e) => setUpdatedDeadline(e.target.value)}
              />
              <label>Allocated To:</label>
              <input
                type="text"
                value={updatedAllocated_to}
                onChange={(e) => setUpdatedAllocated_to(e.target.value)}
              />
              <label>Words:</label>
              <input
                type="number"
                value={updatedWords}
                onChange={(e) => setUpdatedWords(e.target.value)}
              />
              <label>Rate:</label>
              <input
                type="text"
                value={updatedRate}
                onChange={(e) => setUpdatedRate(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}

          <table className="user-table table-bordered table-striped">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Allocated To</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobdata.map((job) => (
                <tr key={job._id}>
                  <td>{job.job_id}</td>
                  <td>{job.allocated_to}</td>
                  <td>{job.deadline}</td>
                  <td>
                    <button onClick={() => handleEditClick(job)} className="btn btn-info btn-sm">Edit</button>
                    <button onClick={() => handleDelete(job._id)} className="btn btn-danger btn-sm">Delete</button>
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

export default JobList;
