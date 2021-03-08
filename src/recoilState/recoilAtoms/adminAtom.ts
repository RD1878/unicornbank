import { atom } from "recoil";

interface IAdminState {
  adminAvatar: string;
  errorMessage: string;
}

const adminAtomState = atom<IAdminState>({
  key: "adminAtomState",
  default: {
    adminAvatar: "",
    errorMessage: "",
  },
  dangerouslyAllowMutability: true,
});

export default adminAtomState;
