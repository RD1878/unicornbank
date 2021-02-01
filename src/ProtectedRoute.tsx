import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authState from "./recoilState/recoilAtoms/authAtom";

import { ROUTES } from "./routes";

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const { currentUser, loading } = useRecoilValue(authState);
  if (!currentUser && !loading) {
    return <Redirect to={ROUTES.AUTH} />;
  }

  return <Route {...props} />;
};
