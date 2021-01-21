import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { ROUTES } from "./routes";
import { authSelector } from "./selectors";

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const { currentUser, loading } = useSelector(authSelector);
  if (!currentUser && !loading) {
    return <Redirect to={ROUTES.AUTH} />;
  }

  return <Route {...props} />;
};
