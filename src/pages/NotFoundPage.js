import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Oops! The page was not found</h2>
      <p className="text-center">
        You can click the menu icon on the <Link to="/">home page</Link> to see
        available pages
      </p>
    </div>
  );
};

export default NotFoundPage;
