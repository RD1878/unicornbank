import { TGetSession, GET_SESSION, GET_SESSION_ERROR } from "../actions";
import { TUser } from "../firebase/firebase";

export interface IAuthSession {
  currentUser: TUser;
  loading: boolean;
  errorMessage: string;
}

const initialState = {
  loading: true,
  currentUser: null,
  errorMessage: "",
};

export default (
  state: IAuthSession = initialState,
  { type, payload }: TGetSession<TUser | string>
): IAuthSession => {
  switch (type) {
    case GET_SESSION:
      return {
        ...state,
        loading: false,
        currentUser: payload as TUser,
      };

    case GET_SESSION_ERROR:
      return {
        loading: false,
        currentUser: null,
        errorMessage: payload as string,
      };

    default:
      return state;
  }
};
