import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Header, SidebarBank } from "../../../organisms";
import { ErrorBoundary } from "../../../errorBoundaries";

const ContentContainer = withTheme(styled("div")`
  background-color: ${(props) => props.theme.palette.primary.light};
  margin-left: auto;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`);

const Container = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
`);

interface IMainLayoutBank {
  onToggleTheme: () => void;
}

const MainLayoutBank: FC<IMainLayoutBank> = ({ children, onToggleTheme }) => {
  return (
    <>
      <Header onToggleTheme={onToggleTheme} />
      <ErrorBoundary>
        <ContentContainer>
          <SidebarBank />
          <Container>{children}</Container>
        </ContentContainer>
      </ErrorBoundary>
    </>
  );
};

export { MainLayoutBank };
