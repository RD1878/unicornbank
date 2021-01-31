import { selector } from "recoil";
import userState from "../recoilAtoms/userAtom";

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => get(userState),
});
