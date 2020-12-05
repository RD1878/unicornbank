/* eslint react/prop-types: 0 */
import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import { PrimaryButton, Logo } from "../atoms";

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
          <Link href="#" color="textPrimary">
            Главная
          </Link>
          <Link href="#" color="textPrimary">
            История
          </Link>
          <Link href="#" color="textPrimary">
            Чат
          </Link>
          <Link href="#" color="textPrimary">
            Настройки
          </Link>
          <Link href="#" color="textPrimary">
            Офисы и банкоматы
          </Link>
        </LinksContainer>
        <Typography color="textSecondary">
          Россия, Республика Татарстан, г.Казань ул. Пушкина, 66
        </Typography>
      </LeftNavigation>

      <RightNavigation>
        <Typography color="textPrimary">8 800 555-35-35</Typography>
        <Typography color="textSecondary">Для звонков по России</Typography>
        <Typography color="textPrimary">unicorn@email.com</Typography>
      </RightNavigation>
    </Container>
  );
};

export { Footer };
