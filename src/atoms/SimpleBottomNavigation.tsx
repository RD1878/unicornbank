import React, { FC, useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const StyledBottomNavigation = withTheme(styled(BottomNavigation)`
  &.MuiBottomNavigation-root {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: ${(props) => props.theme.palette.primary.main};
    position: fixed;
    bottom: 0;
    left: 0;
  }
  & > a {
    text-decoration: none;
  }
`);

const StyledBottomNavigationAction = withTheme(styled(BottomNavigationAction)`
  &.Mui-selected {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`);

const SimpleBottomNavigation: FC = () => {
  const [value, setValue] = useState(0);

  return (
    <StyledBottomNavigation
      value={value}
      onChange={(event: Event, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
      }}
      showLabels
    >
      <StyledBottomNavigationAction
        component={Link}
        to={ROUTES.MAIN}
        label="Главная"
        icon={<PaymentRoundedIcon />}
      />
      <StyledBottomNavigationAction
        label="История"
        icon={<HistoryRoundedIcon />}
      />
      <StyledBottomNavigationAction label="Чат" icon={<ChatRoundedIcon />} />
      <StyledBottomNavigationAction
        component={Link}
        to={ROUTES.SETTINGS}
        label="Настройки"
        icon={<SettingsRoundedIcon />}
      />
    </StyledBottomNavigation>
  );
};

export default SimpleBottomNavigation;
