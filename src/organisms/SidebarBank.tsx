import React, { FC, useState, ChangeEvent } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Badge, Button, Input, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ChatsBankList } from "../molecules";
import { ChatsBankItem } from "../atoms";
import { useRecoilValue } from "recoil";
import chatsAtomState from "../recoilState/recoilAtoms/chatsAtom";
import { getLastArrayIndex } from "../utils/getLastArrayIndex";
import { useTranslation } from "react-i18next";
import { IChat } from "../interfaces/chats";
import MailIcon from "@material-ui/icons/Mail";

const StyledContainer = withTheme(styled("div")`
   {
    background-color: ${(props) => props.theme.palette.primary.main};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    min-width: 400px;
    height: auto;
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
  const [searchData, setSearchData] = useState("");
  const { t } = useTranslation();
  const dataChatsArray = Object.entries(chats).filter(
    ([, { dialog }]) => dialog
  );

  const [activeId, setActiveId] = useState("");

  const countNotReadChats = dataChatsArray.filter(([, { isRead }]) => !isRead)
    .length;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const sortedChatsArray = (array: [string, IChat][]) =>
    array.sort((a, b) =>
      a[1].isRead === b[1].isRead ? 0 : a[1].isRead ? 1 : -1
    );

  const filtredChatsArray = (array: [string, IChat][]) =>
    array.filter(([, { clientData }]) => {
      const { firstName, lastName, patronymic } = clientData;
      if (
        firstName.toLowerCase().includes(searchData.toLowerCase()) ||
        lastName.toLowerCase().includes(searchData.toLowerCase()) ||
        patronymic.toLowerCase().includes(searchData.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

  const handleClick = (id: string): void => {
    setActiveId(id);
  };

  return (
    <StyledContainer>
      <Typography variant="h2" color="textPrimary">
        {t("Chats with bank clients")}
      </Typography>
      <Styledform noValidate autoComplete="off">
        <Input
          placeholder={t("Enter client details")}
          value={searchData}
          onChange={handleChange}
        />
      </Styledform>
      <StyledGrid container>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="body2" color="textPrimary">
              {`${t("Unread chats")}:`}
            </Typography>
          </Grid>
          <Grid item>
            <Badge color="secondary" badgeContent={countNotReadChats}>
              <MailIcon />
            </Badge>
          </Grid>
        </Grid>
      </StyledGrid>
      <ChatsBankList>
        {filtredChatsArray(sortedChatsArray(dataChatsArray)).map(
          ([id, { clientData, dialog, isRead }]) => (
            <StyledButton key={id}>
              <ChatsBankItem
                lastMessage={dialog[getLastArrayIndex(dialog)].value}
                date={dialog[getLastArrayIndex(dialog)].date}
                clientId={id}
                clientData={clientData}
                isRead={isRead}
                isActive={id === activeId ? true : false}
                onClick={handleClick}
              />
            </StyledButton>
          )
        )}
      </ChatsBankList>
    </StyledContainer>
  );
};

export default SidebarBank;
