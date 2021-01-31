import { atom } from "recoil";

const userState = atom({
  key: "userState",
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
});

export default userState;
