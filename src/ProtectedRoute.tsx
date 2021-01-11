import React, { FC, useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "./firebase/firebaseAuthContext";
import { ROUTES } from "./routes";

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const currentUser = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to={ROUTES.AUTH} />;
  }

  return <Route {...props} />;
};
