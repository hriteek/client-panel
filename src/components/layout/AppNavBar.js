import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppNavBar extends Component {
  render() {
    return (
      <nav className="navbar nabar-extend-md navbar-dark bg-info mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Client Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarmain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarmain">
            <ul
              className="nav navbar-nav navbar-right"
              style={{ float: "right" }}
            >
              <li className="navbar-item">
                <Link to="/" className="navbar-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default AppNavBar;
