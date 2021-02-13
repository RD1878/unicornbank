import { SAVE_USER } from "../actions";
import { IUser, IActionSaveUser } from "../interfaces/redux";

const initialState = {
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
    cards: {},
  },
  validity: {
    month: 0,
    year: 0,
  },
  isLoading: true,
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
        isLoading: false,
      };
    default:
      return state;
  }
};
