import { TUser } from "../firebase/firebase";
import { GET_SESSION } from "./constants";

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
