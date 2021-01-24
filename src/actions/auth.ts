import { TUser } from "../firebase/firebase";
import { GET_SESSION, GET_SESSION_ERROR } from "./constants";

export interface TGetSession<T> {
  type: string;
  payload: T;
}

export const getSession = (user: TUser): TGetSession<TUser> => ({
  type: GET_SESSION,
  payload: user,
});

export const getSessionError = (errorMessage = ""): TGetSession<string> => ({
  type: GET_SESSION_ERROR,
  payload: errorMessage,
});
