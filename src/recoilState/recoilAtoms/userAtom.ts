import { atom, AtomEffect } from "recoil";
import { fetchUser } from "../../api";
import { firebaseAuth } from "../../firebase/firebase";
import { IUser, IUserCards } from "../../interfaces/user";

interface IUserState {
  userData: IUser;
  errorMessage: string;
  isLoading: boolean;
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
    cards: {} as IUserCards,
  },
  isAdmin: false,
};

const userEffect: AtomEffect<IUserState> = ({ setSelf }) => {
  const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
    try {
      if (!user) {
        return;
      }

      const userData = await fetchUser();

      setSelf({
        userData,
        errorMessage: "",
        isLoading: false,
      });
    } catch ({ message }) {
      setSelf({
        userData: initialData,
        errorMessage: message,
        isLoading: false,
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
    isLoading: true,
  },
  effects_UNSTABLE: [userEffect],
});

export default userState;
