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
  { name: "Главная", path: ROUTES.MAIN },
  { name: "История", path: ROUTES.HISTORY },
  { name: "Чат", path: ROUTES.CHAT },
  { name: "Настройки", path: ROUTES.SETTINGS },
  { name: "Офисы и банкоматы", path: ROUTES.OFFICES },
];

export { ROUTES, navigation };
