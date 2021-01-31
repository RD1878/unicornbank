import { selector } from "recoil";
import authState from "../recoilAtoms/authAtom";

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => get(authState),
});
