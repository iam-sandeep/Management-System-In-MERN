import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Job = () => {
  const [jobData, setJobData] = useState({
    job_id: '',
    words: '',
    allocated_to: '',
    deadline: '',
    rate: '',
  });

  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch all users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9002/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Run the effect only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevJobData) => ({
      ...prevJobData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createJob();
  };

  const createJob = () => {
    const { job_id, words, allocated_to, deadline, rate } = jobData;

    if (job_id && words && allocated_to && deadline && rate) {
      axios.post('http://localhost:9002/jobs', jobData)
        .then(response => {
          console.log('Job created successfully:', response.data);
          alert('Job Created successfully.');
          history.push('/job');
        })
        .catch(error => {
          console.error('Error creating job:', error);
          alert('Job creation failed. Please try again.');
        });
    } else {
      alert('Please enter valid data to create a job.');
    }
  };

  return (
    <div className="create-user-form">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job ID:
          <input type="text" name="job_id" value={jobData.job_id} onChange={handleChange} />
        </label>
        <br />
        <label>
          Words:
          <input type="number" name="words" value={jobData.words} onChange={handleChange} />
        </label>
        <br />
        <label>
          Allocate To:
          <select name="allocated_to"  onChange={handleChange} value={jobData.allocated_to} className="create-user-form-select">
            <option value="">--Select User--</option>
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option> 
            ))}
          </select>

        </label>
        <br />
        <label>
          Deadline:
          <input type="date" name="deadline" value={jobData.deadline} onChange={handleChange} />
        </label>
        <br />
        <label>
          Rate:
          <input type="number" name="rate" value={jobData.rate} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Job;
