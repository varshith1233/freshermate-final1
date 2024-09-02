import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationPage.css'
import {message} from 'antd'

function RegistrationPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [yearOfPassout, setYearOfPassout] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [section, setSection] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [semester, setSemester] = useState('');

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register/addnewuser', {
        rollNumber, firstName, lastName, yearOfPassout, branch, email, section, password, confirmPassword, semester
      });
      if(response.data.code == 200){
        message.info("Verify yourself from your registered email!")
      }else{
        message.error('Error occured! Try again later!')
      }
    } catch (error) {
      message.error('Error occured! Try again later!')
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h4 className="text-center mb-4">Welcome to</h4>
        <span><h1 className='registration-title'>FresherMate</h1></span>
        <div className="mb-3">
          <label htmlFor="rollNumber" className="form-label">Roll Number</label>
          <input
            id="rollNumber"
            type="text"
            className="form-control"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="yearOfPassout" className="form-label">Year of Passout</label>
          <input
            id="yearOfPassout"
            type="date"
            className="form-control"
            placeholder="Enter Year of Passout"
            value={yearOfPassout}
            onChange={(e) => setYearOfPassout(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="branch" className="form-label">Branch</label>
          <input
            id="branch"
            type="text"
            className="form-control"
            placeholder="Enter Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="semester" className="form-label">Semester</label>
          <input
            id="semester"
            type="text"
            className="form-control"
            placeholder="Enter Current Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="section" className="form-label">Section</label>
          <input
            id="section"
            type="text"
            className="form-control"
            placeholder="Enter Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="btn-create-account link-group">
        <span>or</span>
          <Link to="/" className='btn-create-account '>Already have an account?</Link>
        </div>
        <button className="btn btn-primary w-100" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default RegistrationPage;
