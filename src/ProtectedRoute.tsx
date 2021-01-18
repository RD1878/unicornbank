import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getSession, saveUser } from "./actions";
import { firebaseAuth, readUserData } from "./firebase/firebase";
import { ROUTES } from "./routes";
import { authSelector } from "./selectors";

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const { currentUser, loading } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          throw new Error("Нет активной сессии");
        }

        dispatch(getSession(user));

        const data = await readUserData(user.uid);

        dispatch(saveUser(data));
      } catch (error) {
        dispatch(getSession(null));
      }
    });
  }, []);

  if (!currentUser && !loading) {
    return <Redirect to={ROUTES.AUTH} />;
  }

  return <Route {...props} />;
};
