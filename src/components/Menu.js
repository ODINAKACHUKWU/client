import React from "react";
import { Link } from "react-router-dom";

// Images
import hamburger from "../assets/images/hamburger.svg";

// Styles
import "../assets/stylesheets/components/menu.scss";

function Menu() {
  return (
    <ul id="menu-lg" className="navbar-nav">
      <li className="nav-item dropdown">
        <Link
          to="#"
          className="nav-link"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src={hamburger} width="30" alt="hamburger" />
        </Link>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
        >
          <Link to="/" className="dropdown-item">
            Dashboard
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="/transactions" className="dropdown-item">
            Transactions
          </Link>
          <div className="dropdown-divider"></div>
          <Link to="about" className="dropdown-item">
            About
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default Menu;
