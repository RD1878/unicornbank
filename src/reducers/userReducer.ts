import { SAVE_USER } from "../actions/constants";
import { IUser } from "../actions/action";

const initialState = {
  passport: "",
  snils: "",
  contact: {
    phone: "",
    email: "",
  },
};

interface IActionSaveUser {
  type: string;
  payload: {
    user: IUser;
  };
}

export default (
  state = initialState,
  { type, payload }: IActionSaveUser
): IUser => {
  switch (type) {
    case SAVE_USER:
      return {
        passport: payload.user.passport,
        snils: payload.user.snils,
        contact: {
          phone: payload.user.contact.phone,
          email: payload.user.contact.email,
        },
      };
    default:
      return state;
  }
};
