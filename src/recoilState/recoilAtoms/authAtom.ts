import { atom } from "recoil";
import { TUser } from "../../firebase/firebase";
export interface IAuthSession {
  currentUser: TUser;
  loading: boolean;
  errorMessage: string;
}

const authState = atom<IAuthSession>({
  key: "authState",
  default: {
    loading: true,
    currentUser: null,
    errorMessage: "",
  },
  dangerouslyAllowMutability: true,
});

export default authState;
