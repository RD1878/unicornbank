import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Logo, PrimaryLink } from "../atoms";
import { navigation } from "../routes";
import { Link } from "react-router-dom";

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

  & a {
    margin-bottom: 0.5rem;
  }
`);

const Footer: FC = () => (
  <Container>
    <LeftNavigation>
      <Logo />
      <LinksContainer>
        {navigation.map((item) => (
          <Link to={item.path} key={item.path}>
            <PrimaryLink component="span">{item.name}</PrimaryLink>
          </Link>
        ))}
      </LinksContainer>
      <Typography color="textSecondary">
        Россия, Республика Татарстан, г.Казань ул. Пушкина, 66
      </Typography>
    </LeftNavigation>

    <RightNavigation>
      <PrimaryLink href="tel:88005553535">8 800 555-35-35</PrimaryLink>
      <Typography color="textSecondary">Для звонков по России</Typography>
      <PrimaryLink href="mailto:unicorn@email.com">
        unicorn@email.com
      </PrimaryLink>
    </RightNavigation>
  </Container>
);

export default Footer;
