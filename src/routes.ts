enum ROUTES {
  register = "/register",
  auth = "/auth",
  main = "/",
  history = "/history",
  chat = "/chat",
  settings = "/settings",
  offices = "/offices",
  profile = "/profile",
}

const navigation = [
  { name: "Главная", path: ROUTES.main },
  { name: "История", path: ROUTES.history },
  { name: "Чат", path: ROUTES.chat },
  { name: "Настройки", path: ROUTES.settings },
  { name: "Офисы и банкоматы", path: ROUTES.offices },
];

export { ROUTES, navigation };
