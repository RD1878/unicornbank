import { atom } from "recoil";

interface IClientIdAtom {
  clientId: string;
}

const clientIdAtom = atom<IClientIdAtom>({
  key: "clientIdState",
  default: {
    clientId: "",
  },
});

export default clientIdAtom;
