import React, { FC } from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withTheme } from "@material-ui/core/styles";
import { Header, Sidebar, Footer } from "../../../organisms";
import { ErrorBoundary } from "../../../errorBoundaries";
import SimpleBottomNavigation from "../../../atoms/SimpleBottomNavigation";
import ProminentAppBar from "../../../atoms/ProminentAppBar";

const ContentContainer = withTheme(styled("div")`
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.light};
  min-height: calc(100vh - 230px);

  ${(props) => props.theme.breakpoints.down("lg")} {
    min-height: 100vh;
  }
`);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
`;

interface IMainLayout {
  onToggleTheme: () => void;
}

const MainLayout: FC<IMainLayout> = ({ children, onToggleTheme }) => {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <>
      {!matches && <Header onToggleTheme={onToggleTheme} />}
      <ErrorBoundary>
        <ContentContainer>
          {matches && <ProminentAppBar />}
          {!matches && <Sidebar />}
          <Container>{children}</Container>
          {matches && <SimpleBottomNavigation />}
        </ContentContainer>
      </ErrorBoundary>
      {!matches && <Footer />}
    </>
  );
};

export { MainLayout };
