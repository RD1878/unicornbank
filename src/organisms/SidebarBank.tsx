import React, { FC } from "react";
import Drawer from "@material-ui/core/Drawer";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { DRAWER_BANKCHATS_WIDTH } from "../constants";
import { Button, IconButton, Input, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import { ChatsBankList } from "../molecules";
import { ChatsBankItem } from "../atoms";
import { useRecoilValue } from "recoil";
import chatsAtomState from "../recoilState/recoilAtoms/chatsAtom";
import { getLastArrayIndex } from "../utils/getLastArrayIndex";
import { useTranslation } from "react-i18next";

const StyledDrawer = withTheme(styled(({ open, width, anchor, ...props }) => (
  <Drawer
    classes={{ paper: "paper" }}
    open={open}
    width={width}
    anchor={anchor}
    {...props}
  />
))`
  & .paper {
    position: absolute;
    top: 0;
    background-color: ${(props) => props.theme.palette.primary.main};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: unset;
    overflow-x: hidden;
    padding: 40px 20px;
    width: ${(props) => props.width}px;
  }
`);

const StyledButton = styled(({ ...props }) => (
  <Button classes={{ root: "root" }} {...props} />
))`
  &.root {
    padding: 0;
    width: 100%;
    height: 80px;
    margin-top: 15px;
  }
  &:hover {
    opacity: 0.5;
  }
`;

const Styledform = styled("form")`
  margin-top: 20px;
`;

const StyledGrid = styled(Grid)`
  margin-top: 20px;
`;

const SidebarBank: FC = () => {
  const { chats } = useRecoilValue(chatsAtomState);
  const dataChatsArray = Object.entries(chats);
  const { t } = useTranslation();

  const countNotReadChats = dataChatsArray.filter(([, { isRead }]) => !isRead)
    .length;

  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
      width={DRAWER_BANKCHATS_WIDTH}
    >
      <Typography variant="h2" color="textPrimary">
        {t("Chats with bank clients")}
      </Typography>
      <Styledform noValidate autoComplete="off">
        <Input placeholder={t("Enter client details")} />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Styledform>
      <StyledGrid container>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="body2" color="textPrimary">
              {`${t("Unopened chats")}:`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="secondary">
              {countNotReadChats}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="body2" color="textPrimary">
              {`${t("Total chats")}:`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="secondary">
              {dataChatsArray.length}
            </Typography>
          </Grid>
        </Grid>
      </StyledGrid>
      <ChatsBankList>
        {dataChatsArray
          .sort((a, b) =>
            a[1].isRead === b[1].isRead ? 0 : a[1].isRead ? 1 : -1
          )
          .map(([id, { clientData, dialog, isRead }]) => (
            <StyledButton key={id}>
              <ChatsBankItem
                lastMessage={dialog[getLastArrayIndex(dialog)].value}
                date={dialog[getLastArrayIndex(dialog)].date}
                clientId={id}
                clientData={clientData}
                isRead={isRead}
              />
            </StyledButton>
          ))}
      </ChatsBankList>
    </StyledDrawer>
  );
};

export default SidebarBank;
