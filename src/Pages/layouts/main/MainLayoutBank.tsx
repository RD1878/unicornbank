import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { HeaderBank, SidebarBank } from "../../../organisms";
import { ErrorBoundary } from "../../../errorBoundaries";

const ContentContainer = withTheme(styled("div")`
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.light};
  min-height: calc(100vh - 370px);
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
      <HeaderBank onToggleTheme={onToggleTheme} />
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
