import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

import { Header, Sidebar, Footer } from "../../../organisms";

interface IMainLayout {
  children?: ReactNode;
  onToggleTheme: () => void;
}

const ContentContainer = withTheme(styled("div")`
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.light};
`);

const MainLayout: FC<IMainLayout> = ({ children, onToggleTheme }) => {
  return (
    <>
      <Header onToggleTheme={onToggleTheme} />
      <ContentContainer>
        <Sidebar />
        {children}
      </ContentContainer>
      <Footer />
    </>
  );
};

export { MainLayout };
