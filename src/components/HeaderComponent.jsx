import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/9391703.png'; // logo image

const HeaderComponent = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="80" height="80" className="d-inline-block align-middle" />
          Issue Tracker Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
              <Link className="nav-link" to="/home">
                <h3>Home</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <h3>Issue Table</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-issue">
              <h3>  Add Issue</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/issues">
               <h3>Issues</h3> 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/email">
                <h3>Email</h3>
              </Link>
            </li>
          </ul>
          <form className="d-flex">
          </form>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
