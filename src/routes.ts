enum ROUTES {
  REGISTER = "/register",
  AUTH = "/auth",
  MAIN = "/",
  HISTORY = "/history",
  CHAT = "/chat",
  SETTINGS = "/settings",
  OFFICES = "/offices",
  PROFILE = "/profile",
}

const navigation = [
  { name: "Home", path: ROUTES.MAIN },
  { name: "History", path: ROUTES.HISTORY },
  { name: "Chat", path: ROUTES.CHAT },
  { name: "Settings", path: ROUTES.SETTINGS },
  { name: "Offices and ATMs", path: ROUTES.OFFICES },
];

export { ROUTES, navigation };
