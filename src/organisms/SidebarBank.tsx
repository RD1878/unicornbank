import React, { FC } from "react";
import Drawer from "@material-ui/core/Drawer";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { DRAWER_BANKCHATS_WIDTH } from "../constants";
import { IconButton, Input, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import { ChatsBankList } from "../molecules";
import { ChatsBankItem } from "../atoms";
import { useRecoilValue } from "recoil";
import chatsAtomState from "../recoilState/recoilAtoms/chatsAtom";

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

const Styledform = styled("form")`
  margin-top: 20px;
`;

const StyledGrid = styled(Grid)`
  margin-top: 20px;
`;

const SidebarBank: FC = () => {
  const { chats } = useRecoilValue(chatsAtomState);
  const chatsArray = Object.entries(chats);

  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
      width={DRAWER_BANKCHATS_WIDTH}
    >
      <Typography variant="h2" color="textPrimary">
        Чаты с клиентами банка
      </Typography>
      <Styledform noValidate autoComplete="off">
        <Input placeholder="Введите данные клиента" />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Styledform>
      <StyledGrid container>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="body2" color="textPrimary">
              Непрочитанных сообщений:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="secondary">
              5
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="body2" color="textPrimary">
              Всего чатов:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="secondary">
              31
            </Typography>
          </Grid>
        </Grid>
      </StyledGrid>
      <ChatsBankList>
        {chatsArray.map(([id, dialog]) => (
          <ChatsBankItem
            key={id}
            lastMessage={dialog[dialog.length - 1].value}
            clientId={id}
          />
        ))}
      </ChatsBankList>
    </StyledDrawer>
  );
};

export default SidebarBank;
