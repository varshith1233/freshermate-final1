import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importing a CSS file for styles
import logo from '../../Assets/LogoNavbar/Logo.png'; // Replace with your logo path
import Image from '../../Assets/Login/loginimage.png'; // Replace with your image path
import {message} from 'antd'

function LoginPage() {
  const navigate = useNavigate();
  const [rollNumber, setrollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login/checkuser', { rollNumber, password });
      if (response.data.code === 200) {
        navigate('/home');
        message.success('Welcome! Glad to have you back!')
        localStorage.setItem('token', response.data.token);
      } else if (response.data.code === 404) {
        message.error("Invalid Password");
      } else if (response.data.code === 405) {
        message.error("User doesn't exist");
      }
    } catch (err) {
      message.error("Error occurred! Try again later!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-right">
        <img src={Image} alt="Gardener Illustration" className="illustration" />
      </div>
      {/* Left Section */}
      <div className="login-left">
        {/* <img src={logo} alt="Company Logo" className="logo" /> */}
        <h4>Welcome to</h4>
        <span><h1 className='login-title'>FresherMate</h1></span>
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="rollNumber">Your Roll Number</label>
            <input
              id="rollNumber"
              type="rollNumber"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => setrollNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-footer">
            {/* <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Keep me signed in
            </label> */}
            <button type="button" className="btn-signin" onClick={onSubmit}>
              Sign In
            </button>
            <div className="link-group">
              <span>or</span>
              <Link to="/register" className="btn-create-account">Create an account</Link>
            </div>
            {/* <Link to="/forgot-password" className="forgot-password">Forgot your password? 😊</Link> */}
          </div>
        </form>
      </div>

      {/* Right Section */}
    </div>
  );
}

export default LoginPage;
