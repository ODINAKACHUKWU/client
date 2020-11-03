import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

// Styles
import "../assets/stylesheets/containers/footer.scss";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <footer
      id="footer"
      className="d-flex align-items-center justify-content-between text-white py-4 px-5"
    >
      <div className="copyright-section">
        <FontAwesomeIcon icon={faCopyright} /> {year} Trancker. All Rights
        Reserved.
      </div>
      <div className="links-section">
        <Link to="/about" className="text-white">
          About
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
