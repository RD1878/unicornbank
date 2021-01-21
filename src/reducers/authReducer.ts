import { TGetSession, GET_SESSION, GET_SESSION_ERROR } from "../actions";
import { TUser } from "../firebase/firebase";

export interface IAuthSession {
  currentUser: TUser;
  loading: boolean;
}

const initialState = {
  loading: true,
  currentUser: null,
};

export default (
  state: IAuthSession = initialState,
  { type, payload }: TGetSession
): IAuthSession => {
  switch (type) {
    case GET_SESSION:
      const { user } = payload;

      return {
        loading: false,
        currentUser: user,
      };

    case GET_SESSION_ERROR:
      return {
        loading: false,
        currentUser: null,
      };

    default:
      return state;
  }
};
