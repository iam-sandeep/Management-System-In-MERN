import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    reEnterPassword: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  const register = () => {
    const { name, email, password, reEnterPassword, role } = userData;

    if (name && email && password && password === reEnterPassword) {
      axios.post('http://localhost:9002/register', userData)
        .then(response => {
          console.log('User registered successfully:', response.data);
          // Assuming the registration API returns a success message
          alert('User Created successfully.');
          // Redirect to the login page
          history.push('/user');
        })
        .catch(error => {
          console.error('Error registering user:', error);
          alert('Registration failed. Please try again.');
        });
    } else {
      alert('Please enter valid data to register.');
    }
  };

  return (
    <div className="create-user-form">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder='Enter Full Name' />
          </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder='Enter Email eg. abc@gmail.com' />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder='Enter Password'/>
        </label>
        <br />
        <label>
          Re-enter Password:
          <input type="password" name="reEnterPassword" value={userData.reEnterPassword} onChange={handleChange} placeholder='Re-enter Password' />
        </label>
        <label>
          Role:
          <select name="role" className="create-user-form-select" defaultValue="" onChange={handleChange}>
            <option value="" selected disabled>--Select Role--</option>
            <option value="Admin">Admin</option> 
            <option value="User">User</option> 
          </select>
          </label>


        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;
