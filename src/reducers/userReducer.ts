import { SAVE_USER } from "../actions/constants";
import { IUser, IActionSaveUser } from "../interfaces/redux";

const initialState = {
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
        passport: payload.user.passport,
        snils: payload.user.snils,
        contact: {
          phone: payload.user.contact.phone,
          email: payload.user.contact.email,
        },
        products: {
          cards: payload.user.products.cards,
        },
      };
    default:
      return state;
  }
};
