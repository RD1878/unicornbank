import { SAVE_USER } from "../actions";
import { IUser, IActionSaveUser } from "../interfaces/redux";

const initialState = {
  passport: "",
  snils: "",
  contact: {
    phone: "",
    email: "",
  },
};

export default (
  state = initialState,
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
