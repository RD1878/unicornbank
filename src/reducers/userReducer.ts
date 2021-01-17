import { SAVE_USER } from "../actions/constants";
import { IUser, IActionSaveUser } from "../interfaces/redux";

const initialState = {
  firstName: "",
  lastName: "",
  patronymic: "",
  icon: null,
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
