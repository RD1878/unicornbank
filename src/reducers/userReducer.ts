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

interface IArgument {
  type: string;
  payload: IUser;
}

export default (state = initialState, { type, payload }: IArgument): IUser => {
  switch (type) {
    case SAVE_USER:
      return {
        passport: payload.passport,
        snils: payload.snils,
        contact: {
          phone: payload.contact.phone,
          email: payload.contact.email,
        },
      };
  }

  return state;
};
