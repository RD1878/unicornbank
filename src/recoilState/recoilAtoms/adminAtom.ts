import { atom, AtomEffect } from "recoil";
import { db } from "../../firebase/firebase";

interface IAdminState {
  adminAvatar: string;
  errorMessage: string;
}

const initialAvatarUrl = "";

const adminAtomEffect: AtomEffect<IAdminState> = ({ setSelf }) => {
  const ref = db.ref("users/cNyGWT6OiIdO6wa7CgxiSY5a5a62/avatarUrl");
  const fetchAdminData = async () => {
    try {
      const response = await ref.once("value");
      const data = response.val();
      setSelf({
        adminAvatar: data,
        errorMessage: "",
      });
    } catch ({ message }) {
      setSelf({
        adminAvatar: initialAvatarUrl,
        errorMessage: message,
      });
    }
  };
  fetchAdminData();
  return () => fetchAdminData();
};

const adminAtomState = atom<IAdminState>({
  key: "adminAtomState",
  default: {
    adminAvatar: initialAvatarUrl,
    errorMessage: "",
  },
  effects_UNSTABLE: [adminAtomEffect],
});

export default adminAtomState;
