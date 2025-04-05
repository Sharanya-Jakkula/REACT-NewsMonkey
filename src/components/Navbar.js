// import React, { Component } from 'react'
import React from "react";
import { Link } from "react-router-dom";
//rcep
const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-white">
        <div className="container-fluid">
          <Link className="navbar-brand text-white mx-5" to="/">
            NewsMonkey
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white mx-4"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white mx-4" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white mx-4" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white mx-4" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white mx-4" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white mx-4" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white mx-4" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
