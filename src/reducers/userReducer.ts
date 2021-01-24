import { SAVE_USER } from "../actions";
import { IUser, IActionSaveUser } from "../interfaces/redux";

const initialState = {
  firstName: "",
  lastName: "",
  patronymic: "",
  avatarURL: "",
  passport: "",
  snils: "",
  contact: {
    phone: "",
    email: "",
  },
  products: {
    cards: {},
  },
  validity: {
    month: 0,
    year: 0,
  },
};

export default (
  state: IUser = initialState,
  { type, payload }: IActionSaveUser
): IUser => {
  switch (type) {
    case SAVE_USER:
      return {
        ...state,
        ...payload.user,
      };
    default:
      return state;
  }
};
