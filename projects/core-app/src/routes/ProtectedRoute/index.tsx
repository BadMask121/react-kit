import React from "react";
import { Redirect, Route } from "react-router";

const location = {
  pathname: `/home`,
};
export default ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === false ? <Component {...props} /> : <Redirect to={location} />
      }
    />
  );
};
