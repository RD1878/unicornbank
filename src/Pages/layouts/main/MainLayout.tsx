import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Header, Sidebar, Footer } from "../../../organisms";

const ContentContainer = withTheme(styled("div")`
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.light};
  min-height: calc(100vh - 230px);
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
  return (
    <>
      <Header onToggleTheme={onToggleTheme} />
      <ContentContainer>
        <Sidebar fullName="Константинопальский Константин Константинович" />
        <Container>{children}</Container>
      </ContentContainer>
      <Footer />
    </>
  );
};

export { MainLayout };
