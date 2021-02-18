import { atom, AtomEffect } from "recoil";
import api from "../../api";
import { firebaseAuth } from "../../firebase/firebase";
import { IUser } from "../../interfaces/user";

const authEffect: AtomEffect<IUser> = ({ setSelf }) => {
  firebaseAuth.onAuthStateChanged(async (user) => {
    if (!user) {
      return;
    }

    const userData = await api.fetchUser();
    setSelf(userData);
  });
};

const userState = atom<IUser>({
  key: "userRequestState",
  default: {
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
  },
  effects_UNSTABLE: [authEffect],
});

export default userState;
