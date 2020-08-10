import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      Home Page
      <Link to="/login">Login</Link>
    </div>
  );
};
