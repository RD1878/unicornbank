import { atom, AtomEffect } from "recoil";
import api from "../../api";
import { firebaseAuth } from "../../firebase/firebase";
import { IUser } from "../../interfaces/user";

interface IUserState {
  userData: IUser;
  errorMessage: string;
}

const initialData = {
  firstName: "",
  lastName: "",
  patronymic: "",
  avatarUrl: "",
  passport: "",
  snils: "",
  contact: {
    phone: "",
    email: "",
  },
  products: {
    cards: [],
  },
};

const userEffect: AtomEffect<IUserState> = ({ setSelf }) => {
  const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
    try {
      if (!user) {
        return;
      }

      const userData = await api.fetchUser();

      setSelf({
        userData,
        errorMessage: "",
      });
    } catch ({ message }) {
      setSelf({
        userData: initialData,
        errorMessage: message,
      });
    }
  });
  return () => unsubscribe();
};

const userState = atom<IUserState>({
  key: "userRequestState",
  default: {
    userData: initialData,
    errorMessage: "",
  },
  effects_UNSTABLE: [userEffect],
});

export default userState;
