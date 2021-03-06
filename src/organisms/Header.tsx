import React, { FC } from "react";
import styled from "styled-components";
import { useTheme, withTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { PrimaryButton, Logo, PrimaryAlert } from "../atoms";
import { navigation } from "../routes";
import PrimaryLink from "./../atoms/PrimaryLink";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase/firebase";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../molecules";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import { useAlert } from "../utils/useAlert";
import { useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";

interface IContainer {
  isAdmin: boolean;
}

const Container = withTheme(styled("div")<IContainer>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0px 30px 0px 50px;
  width: 100%;
  margin-left: auto;
  background-color: ${(props) => props.theme.palette.primary.dark};
`);

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.5;
  width: 45vw;
  max-width: 600px;
`;

const ControlsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 15vw;
  max-width: 150px;
  justify-content: space-evenly;
  align-items: center;
`;

interface IHeader {
  onToggleTheme: () => void;
}

const Header: FC<IHeader> = ({ onToggleTheme }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const { userData } = useRecoilValue(userState);
  const { isAdmin } = userData;

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      onAlertOpen();
    }
  };

  return (
    <Container isAdmin={isAdmin}>
      <Logo />
      {!isAdmin && (
        <LinksContainer>
          {navigation.map((item) => (
            <Link to={item.path} key={item.path}>
              <PrimaryLink component="span">{t(item.name)}</PrimaryLink>
            </Link>
          ))}
        </LinksContainer>
      )}
      <ControlsContainer>
        <LanguageSelect />
        <IconButton onClick={onToggleTheme}>
          {theme.palette.type === "dark" ? (
            <Brightness4RoundedIcon />
          ) : (
            <Brightness7RoundedIcon />
          )}
        </IconButton>
      </ControlsContainer>
      <PrimaryButton onClick={signOut}>{t("Exit")}</PrimaryButton>
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={t("An error occured, failed to exit!")}
        alertType={"error"}
      />
    </Container>
  );
};

export default Header;
