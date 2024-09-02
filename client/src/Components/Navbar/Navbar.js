import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import custom CSS
import Logo from '../../Assets/LogoNavbar/Logo.png';

function Navbar() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to the login page or any other page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="FresherMate Logo" className="navbar-logo" />
          FresherMate
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="blogsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Blogs
              </a>
              <ul className="dropdown-menu" aria-labelledby="blogsDropdown">
                <li><Link className="dropdown-item" to="/myblogs">My Blogs</Link></li>
                <li><Link className="dropdown-item" to="/write-blog">Write Blog</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="materialsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Materials
              </a>
              <ul className="dropdown-menu" aria-labelledby="materialsDropdown">
                <li><Link className="dropdown-item" to="/material">Materials</Link></li>
                <li><Link className="dropdown-item" to="/mymaterial">My Materials</Link></li>
                <li><Link className="dropdown-item" to="/upload-material">Upload</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="papersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Papers
              </a>
              <ul className="dropdown-menu" aria-labelledby="papersDropdown">
                <li><Link className="dropdown-item" to="/question-papers">Papers</Link></li>
                <li><Link className="dropdown-item" to="/my-question-papers">My Papers</Link></li>
                <li><Link className="dropdown-item" to="/upload-question-paper">Upload</Link></li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-outline-secondary ms-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
