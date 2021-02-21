import { selector } from "recoil";
import userState from "../recoilAtoms/userAtom";
import { fetchUser } from "./../../api/dataUser";

export const userSelector = selector({
  key: "userSelector",
  get: async ({ get }) => {
    const state = get(userState);
    const response = await fetchUser();

    return {
      ...state,
      ...response,
    };
  },
});
