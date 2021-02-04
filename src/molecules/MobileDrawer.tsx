import React, { FC, useState } from "react";
import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withTheme,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ROUTES } from "../routes";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";

import { Link } from "react-router-dom";
import styled from "styled-components";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ICard } from "../interfaces/card";
import { CardItem } from "../atoms";
import { useSelector } from "react-redux";
import { userSelector } from "../selectors";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

const StyledDrawer = withTheme(styled(({ open, ...props }) => (
  <Drawer open={open} {...props} classes={{ paper: "paper" }} />
))`
  & .paper {
    position: relative;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: all 0.2s ease-in-out;
    overflow-y: unset;
    overflow-x: hidden;
    width: 320px;
    display: flex;
    align-items: center;
  }
`);

const StyledCardLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StyledList = styled(List)`
  width: 100%;
`;

const StyledIconButton = styled(IconButton)`
  align-self: flex-start;
`;

const StyledIcon = withTheme(styled(PersonRoundedIcon)`
  width: 100px;
  min-height: 100px;
  color: ${(props) => props.theme.palette.textPrimary.main};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.palette.textPrimary.main};
  margin-bottom: 20px;
`);

const StyledAvatar = styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`;
const StyledAddAvatar = styled("div")`
  position: relative;
  overflow: hidden;

  & > input {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0px;
  }
`;

const MobileDrawer: FC = () => {
  const user = useSelector(userSelector);
  const { products, avatarUrl } = user;
  const cards = Object.entries(products.cards);
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isOpenCards, setOpenCards] = useState(true);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleClick = () => {
    setOpenCards((isOpenCards) => !isOpenCards);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <StyledDrawer open={isOpenDrawer} onClose={toggleDrawer}>
        <StyledIconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon fontSize="large" />
        </StyledIconButton>
        <Link to={ROUTES.PROFILE}>
          {avatarUrl ? (
            <StyledAvatar
              sizes="large"
              alt="name"
              src={avatarUrl}
              onClick={handleDrawerClose}
            />
          ) : (
            <StyledIcon sizes="large" onClick={handleDrawerClose} />
          )}
          <StyledAddAvatar>
            {/*  <input onChange={addPhoto} type="file" /> */}
            <AddAPhotoRoundedIcon />
          </StyledAddAvatar>
        </Link>
        <StyledList>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <PaymentRoundedIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h2" color="textPrimary">
                Карты
              </Typography>
            </ListItemText>
            {isOpenCards ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenCards} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {cards.map(([key, value]: [string, ICard]) => (
                <StyledCardLink
                  to={`/card/${key}`}
                  key={key}
                  onClick={handleDrawerClose}
                >
                  <CardItem
                    open={isOpenDrawer}
                    number={value.number}
                    balance={value.balance}
                    currency={value.currency}
                  />
                </StyledCardLink>
              ))}
            </List>
          </Collapse>
        </StyledList>
      </StyledDrawer>
    </>
  );
};

export default MobileDrawer;
