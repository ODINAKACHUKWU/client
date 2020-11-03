import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import Menu from "../components/Menu";

// Images
import hamburger from "../assets/images/hamburger.svg";

// Styles
import "../assets/stylesheets/containers/navbar.scss";

function NavBar() {
  return (
    <nav id="header" className="navbar navbar-expand-lg fixed-top">
      <BrandLogo />

      <div className="ml-auto">
        <Menu />
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <img src={hamburger} width="30" alt="hamburger" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
