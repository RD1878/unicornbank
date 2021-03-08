import React, { FC, useState } from "react";
import styled from "styled-components";
import { useTheme, withTheme } from "@material-ui/core/styles";
import { Header, Sidebar, Footer } from "../../../organisms";
import { ErrorBoundary } from "../../../errorBoundaries";
import SimpleBottomNavigation from "../../../atoms/SimpleBottomNavigation";
import ProminentAppBar from "../../../atoms/ProminentAppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const ContentContainer = withTheme(styled("div")`
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.light};
  min-height: calc(100vh - 235px);
  ${(props) => props.theme.breakpoints.down("md")} {
    min-height: calc(100vh - 235px);
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    min-height: calc(100vh - 56px);
  }
`);

const Container = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 15px;
    margin: 64px 0 56px;
  }
`);

interface IMainLayout {
  onToggleTheme: () => void;
}

const MainLayout: FC<IMainLayout> = ({ children, onToggleTheme }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenMobileDrawer, setOpenMobileDrawer] = useState(false);
  const toggleMobileDrawer = () => {
    setOpenMobileDrawer((prev) => !prev);
  };

  return (
    <>
      {!matches && <Header onToggleTheme={onToggleTheme} />}
      <ErrorBoundary>
        <ContentContainer>
          {matches && (
            <ProminentAppBar
              onToggleTheme={onToggleTheme}
              onToggleMobileDrawer={toggleMobileDrawer}
            />
          )}
          <Sidebar
            view={matches ? "mobile" : "desktop"}
            isOpenDrawer={isOpenMobileDrawer}
            onToggleMobileDrawer={toggleMobileDrawer}
          />
          <Container>{children}</Container>
          {matches && <SimpleBottomNavigation />}
        </ContentContainer>
      </ErrorBoundary>
      {!matches && <Footer />}
    </>
  );
};

export { MainLayout };
