import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Dasboard = lazy(() => import("../pages/Dashboard"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default () => {
  return (
    <BrowserRouter>
      {/* advise code spliting routes */}
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path={"/home"} exact component={Home} />
          <Route path={"/login"} exact component={Login} />
          <ProtectedRoute
            authed={false}
            path={"/dashboard"}
            component={Dasboard}
          />
          <Route path={"*"} exact component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
