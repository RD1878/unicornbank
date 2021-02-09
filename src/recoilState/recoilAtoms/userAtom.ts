import { atom } from "recoil";
import { IUser } from "../../interfaces/user";

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
  dangerouslyAllowMutability: true,
});

export default userState;
