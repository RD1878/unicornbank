import React, { FC, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import appThemes from "./theme/theme";
import {
  Auth,
  MainPage,
  Profile,
  Register,
  Settings,
  Map,
  Chat,
  History,
  CardInfo,
  Requisites,
} from "./Pages";
import { MainLayout } from "./Pages/layouts/main/MainLayout";
import { ROUTES } from "./routes";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayoutBank } from "./Pages/layouts/main/MainLayoutBank";
import { useRecoilValue } from "recoil";
import authState from "./recoilState/recoilAtoms/authAtom";
import userState from "./recoilState/recoilAtoms/userAtom";
import clientIdState from "../src/recoilState/recoilAtoms/clientIdAtom";
import { useAlert } from "./utils/useAlert";
import { PrimaryAlert, PrimaryLoader } from "./atoms";

const App: FC = () => {
  const [theme, setTheme] = useState(appThemes.dark);
  const { errorMessage } = useRecoilValue(authState);
  const { userData, isLoading } = useRecoilValue(userState);
  const { clientId } = useRecoilValue(clientIdState);
  const { isAdmin } = userData;
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();

  useEffect(() => {
    if (errorMessage.length) {
      onAlertOpen();
    }
  }, [errorMessage]);

  const toggleTheme = () => {
    const newTheme = theme.palette.type === "dark" ? "light" : "dark";
    setTheme(appThemes[newTheme]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path={ROUTES.AUTH} exact component={Auth} />
        <Route path={ROUTES.REGISTER} exact component={Register} />
        <ProtectedRoute path="*">
          {isLoading && <PrimaryLoader />}
          {!isLoading &&
            (isAdmin ? (
              <MainLayoutBank onToggleTheme={toggleTheme}>
                <ProtectedRoute path={ROUTES.MAIN} exact>
                  <Chat clientId={clientId} />
                </ProtectedRoute>
              </MainLayoutBank>
            ) : (
              <MainLayout onToggleTheme={toggleTheme}>
                <ProtectedRoute path={ROUTES.MAIN} exact component={MainPage} />
                <ProtectedRoute path={ROUTES.PROFILE} component={Profile} />
                <ProtectedRoute path={ROUTES.SETTINGS} component={Settings} />
                <ProtectedRoute path={ROUTES.HISTORY} component={History} />
                <ProtectedRoute path={ROUTES.OFFICES} component={Map} />
                <ProtectedRoute path={ROUTES.CHAT} component={Chat} />
                <ProtectedRoute path={ROUTES.CARD} exact component={CardInfo} />
                <ProtectedRoute
                  path={ROUTES.REQUISITES}
                  component={Requisites}
                />
              </MainLayout>
            ))}
        </ProtectedRoute>
      </Switch>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={errorMessage}
        alertType={"error"}
      />
    </ThemeProvider>
  );
};

export default App;
