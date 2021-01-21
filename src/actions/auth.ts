import { TUser } from "../firebase/firebase";
import { GET_SESSION, GET_SESSION_ERROR } from "./constants";

export type TGetSession = {
  type: string;
  payload: {
    user: TUser;
  };
};

export const getSession = (user: TUser): TGetSession => ({
  type: GET_SESSION,
  payload: {
    user,
  },
});

export const getSessionError = (): { type: string } => ({
  type: GET_SESSION_ERROR,
});
