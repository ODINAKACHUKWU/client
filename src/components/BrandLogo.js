import React from "react";
import { Link } from "react-router-dom";

// Styles
import "../assets/stylesheets/components/brand-logo.scss";

function BrandLogo() {
  return (
    <Link
      to="/"
      id="brand-name"
      className="navbar-brand text-white font-weight-bold"
    >
      Trancker
    </Link>
  );
}

export default BrandLogo;
