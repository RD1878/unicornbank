import React, { FC, useState, SetStateAction, useEffect } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import { Link, useLocation } from "react-router-dom";
import { navigation, ROUTES } from "../routes";

const StyledBottomNavigation = withTheme(styled(({ ...props }) => (
  <BottomNavigation classes={{ root: "root" }} {...props} />
))`
  &.root {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: ${(props) => props.theme.palette.primary.main};
    position: fixed;
    bottom: 0;
    left: 0;

    & > a {
      text-decoration: none;
    }
  }
`);

const StyledBottomNavigationAction = withTheme(styled(({ ...props }) => (
  <BottomNavigationAction
    classes={{ selected: "selected", root: "root" }}
    {...props}
  />
))`
  &.selected {
    color: ${(props) => props.theme.palette.secondary.main};
  }
  &.root {
    min-width: auto;
  }
`);

const SimpleBottomNavigation: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onTabClick = (event: Event, newValue: SetStateAction<number>) => {
    setActiveTab(newValue);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    const tab = navigation.findIndex((item) => item.path === pathname);
    setActiveTab(tab);
  }, [pathname]);

  return (
    <StyledBottomNavigation value={activeTab} onChange={onTabClick} showLabels>
      <StyledBottomNavigationAction
        component={Link}
        to={ROUTES.MAIN}
        label="Главная"
        icon={<PaymentRoundedIcon />}
      />
      <StyledBottomNavigationAction
        component={Link}
        to={ROUTES.HISTORY}
        label="История"
        icon={<HistoryRoundedIcon />}
      />
      <StyledBottomNavigationAction
        label="Чат"
        component={Link}
        to={ROUTES.CHAT}
        icon={<ChatRoundedIcon />}
      />
      <StyledBottomNavigationAction
        component={Link}
        to={ROUTES.SETTINGS}
        label="Настройки"
        icon={<SettingsRoundedIcon />}
      />
      <StyledBottomNavigationAction
        component={Link}
        to={ROUTES.OFFICES}
        label="Офисы"
        icon={<AccountBalanceRoundedIcon />}
      />
    </StyledBottomNavigation>
  );
};

export default SimpleBottomNavigation;
