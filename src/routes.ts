enum routes {
  auth = "/",
  main = "/main",
  history = "/history",
  chat = "/chat",
  settings = "/settings",
  offices = "/offices",
}

const navigation = [
  { name: "Главная", path: routes.main },
  { name: "История", path: routes.history },
  { name: "Чат", path: routes.chat },
  { name: "Настройки", path: routes.settings },
  { name: "Офисы и банкоматы", path: routes.offices },
];

export { routes, navigation };
