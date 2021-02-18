import { atom, AtomEffect } from "recoil";
import { firebaseAuth, TUser } from "../../firebase/firebase";
export interface IAuthSession {
  currentUser: TUser;
  loading: boolean;
  errorMessage: string;
}

const authEffect: AtomEffect<IAuthSession> = ({ setSelf }) => {
  firebaseAuth.onAuthStateChanged(async (user) => {
    try {
      if (!user) {
        setSelf({
          loading: false,
          currentUser: null,
          errorMessage: "Нет активной сессии",
        });
      }

      setSelf({
        errorMessage: "",
        loading: false,
        currentUser: user,
      });
    } catch ({ message }) {
      setSelf({
        loading: false,
        currentUser: null,
        errorMessage: message,
      });
    }
  });
};

const authState = atom<IAuthSession>({
  key: "authState",
  default: {
    loading: true,
    currentUser: null,
    errorMessage: "",
  },
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [authEffect],
});

export default authState;
