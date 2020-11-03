import React, { Fragment } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ component }) {
  return (
    <Fragment>
      <NavBar />
      <div id="content-wrap" className="container mt-5 pt-5">
        {component}
      </div>
      <Footer />
    </Fragment>
  );
}

export default Layout;
