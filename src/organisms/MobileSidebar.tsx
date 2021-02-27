import React, { ChangeEvent, FC } from "react";
import {
  StyledDrawer,
  StyledIconButton,
  StyledList,
  StyledIcon,
} from "./SidebarComponents";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { CardsList, LanguageSelect } from "../molecules";
import { Link } from "react-router-dom";
import { AddAvatar, CardIconItem, UserAvatar } from "../atoms";
import {
  Collapse,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { ROUTES } from ".././routes";
import { useTranslation } from "react-i18next";

interface IProps {
  firstName: string;
  lastName: string;
  patronymic: string;
  avatarUrl: string;
  isOpenDrawer: boolean;
  onToggleMobileDrawer: () => void;
  addPhoto: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleClick: () => void;
  isOpenCards: boolean;
}

const MobileSidebar: FC<IProps> = ({
  firstName,
  lastName,
  patronymic,
  avatarUrl,
  isOpenDrawer,
  onToggleMobileDrawer,
  addPhoto,
  handleClick,
  isOpenCards,
}) => {
  const { t } = useTranslation();

  return (
    <StyledDrawer
      open={isOpenDrawer}
      onClose={onToggleMobileDrawer}
      view="mobile"
    >
      <StyledIconButton onClick={onToggleMobileDrawer}>
        <ChevronLeftIcon fontSize="large" />
      </StyledIconButton>
      <LanguageSelect />
      <Link to={ROUTES.PROFILE}>
        {avatarUrl ? (
          <UserAvatar
            avatarUrl={avatarUrl}
            onToggleMobileDrawer={onToggleMobileDrawer}
          />
        ) : (
          <StyledIcon sizes="large" onClick={onToggleMobileDrawer} />
        )}
      </Link>
      <Typography variant="h1" color="textPrimary" align="center">
        {`${firstName} ${patronymic} ${lastName} `}
      </Typography>
      <AddAvatar addPhoto={addPhoto} />
      <StyledList>
        <ListItem button onClick={handleClick}>
          <CardIconItem />
          <ListItemText>
            <Typography variant="h1" color="textPrimary">
              {t("Cards")}
            </Typography>
          </ListItemText>
          {isOpenCards ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isOpenCards} timeout="auto" unmountOnExit>
          <CardsList
            open={isOpenDrawer}
            onToggleMobileDrawer={onToggleMobileDrawer}
          />
        </Collapse>
      </StyledList>
    </StyledDrawer>
  );
};

export default MobileSidebar;
