import React, { FC, useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "./firebase/firebaseAuthContext";
import { ROUTES } from "./routes";

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (!currentUser && !loading) {
    return <Redirect to={ROUTES.AUTH} />;
  }

  return <Route {...props} />;
};
