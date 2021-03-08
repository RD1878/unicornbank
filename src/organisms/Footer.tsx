import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Logo, PrimaryLink } from "../atoms";
import { ROUTES } from "../routes";
import { Link } from "react-router-dom";
import { PHONE_BANK, EMAIL_BANK } from "../constants";
import { useTranslation } from "react-i18next";

const Container = withTheme(styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.palette.primary.dark};
`);

const MiddleNavigation = withTheme(styled("div")`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  min-width: 50vw;
`);

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

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Link to={ROUTES.MAIN}>
        <Logo />
      </Link>
      <MiddleNavigation>
        <Typography color="textSecondary">
          {t('"Uni Corn Bank" JSC')}
        </Typography>
        <Typography color="textSecondary">
          {t("Russia, Republic of Tatarstan, Kazan, Pushkin st., 66")}
        </Typography>
        <PrimaryLink href={EMAIL_BANK}>{EMAIL_BANK}</PrimaryLink>
      </MiddleNavigation>
      <RightNavigation>
        <PrimaryLink href={PHONE_BANK}>{PHONE_BANK}</PrimaryLink>
        <Typography color="textSecondary">
          {t("For calls within Russia")}
        </Typography>
      </RightNavigation>
    </Container>
  );
};

export default Footer;
