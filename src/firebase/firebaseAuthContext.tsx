import React, { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../actions/action";
import { firebaseAuth, TUser, readUserData } from "./firebase";

interface IAuthFirebase {
  children: React.ReactElement;
}

interface IAuthContext {
  currentUser: TUser;
  loading: boolean;
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  loading: true,
});

export const FirebaseAuthContext: FC<IAuthFirebase> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<TUser>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        setCurrentUser(user);
        if (!user) {
          throw new Error("Данных нет");
        }
        const data = await readUserData(user.uid);
        if (data) {
          dispatch(saveUser(data));
        }
      } catch (error) {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default FirebaseAuthContext;
