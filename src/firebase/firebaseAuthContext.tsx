import React, { useEffect, useState, FC } from "react";
import { firebaseAuth, IUser } from "./firebase";

interface IAuthFirebase {
  children: React.ReactElement;
}

export const AuthContext = React.createContext<IUser>(null);

export const FirebaseAuthContext: FC<IAuthFirebase> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser>(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export default FirebaseAuthContext;
