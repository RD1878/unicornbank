import { SAVE_USER } from "../actions";
import { IAction, IUser } from "../interfaces/redux";

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
};

export default (
  state: IUser = initialState,
  { type, payload }: IAction<{ user: IUser }>
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
