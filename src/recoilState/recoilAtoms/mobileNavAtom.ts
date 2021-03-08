import { atom } from "recoil";

interface IMobileNavState {
  activeTab: number;
}

const initialMobileNavItem = 0;

const mobileNavState = atom<IMobileNavState>({
  key: "mobileNavState",
  default: {
    activeTab: initialMobileNavItem,
  },
});

export default mobileNavState;
