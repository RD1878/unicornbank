import { selector } from "recoil";
import { db } from "../../firebase/firebase";
import adminAtomState from "../recoilAtoms/adminAtom";

export const adminSelector = selector({
  key: "adminSelector",
  get: async ({ get }) => {
    try {
      const data = get(adminAtomState);
      const response = await db
        .ref("users/cNyGWT6OiIdO6wa7CgxiSY5a5a62/avatarUrl")
        .once("value");
      const currencyData = response.val();
      return {
        ...data,
        adminAvatar: currencyData,
        errorMessage: "",
      };
    } catch ({ message }) {
      return {
        adminAvatar: "",
        errorMessage: message,
      };
    }
  },
});
