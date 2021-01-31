import { atom } from "recoil";

const authState = atom({
  key: "userState",
  default: {
    loading: true,
    currentUser: null,
    errorMessage: "",
  },
});

export default authState;
