/* eslint react/prop-types: 0 */
import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Logo, PrimaryLink } from "../atoms";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  padding: 0px 50px;
  background-color: ${(props) => props.theme.palette.primary.dark};
`);

const LeftNavigation = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  min-width: 50vw;
  padding: 20px 0;
`);

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.5;
`;

const RightNavigation = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: flex-end;
  justify-content: center;
`);

interface IFooter {
  children?: ReactNode;
}

const Footer: FC<IFooter> = ({ children }) => {
  return (
    <Container>
      <LeftNavigation>
        <Logo />
        <LinksContainer>
          <PrimaryLink href="#">Главная</PrimaryLink>
          <PrimaryLink href="#">История</PrimaryLink>
          <PrimaryLink href="#">Чат</PrimaryLink>
          <PrimaryLink href="#">Настройки</PrimaryLink>
          <PrimaryLink href="#">Офисы и банкоматы</PrimaryLink>
        </LinksContainer>
        <Typography color="textSecondary">
          Россия, Республика Татарстан, г.Казань ул. Пушкина, 66
        </Typography>
      </LeftNavigation>

      <RightNavigation>
        <Typography color="textPrimary" variant="h1">
          8 800 555-35-35
        </Typography>
        <Typography color="textSecondary">Для звонков по России</Typography>
        <Typography color="textPrimary" variant="h2">
          unicorn@email.com
        </Typography>
      </RightNavigation>
    </Container>
  );
};

export default Footer;
