import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import firebase from "firebase";
import { db } from "./../firebase/firebase";
import { TAlert } from "../interfaces/tAlert";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import authState from "../recoilState/recoilAtoms/authAtom";
import { fetchUser } from "../api";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import { PrimaryAlert } from "../atoms";
import { useAlert } from "../utils/useAlert";

interface IProps {
  view: string;
  isOpenDrawer: boolean;
  onToggleMobileDrawer: () => void;
}

const Sidebar: FC<IProps> = ({ view, isOpenDrawer, onToggleMobileDrawer }) => {
  const [user, setUser] = useRecoilState(userState);
  const { userData, isLoading } = user;
  const { firstName, lastName, patronymic, avatarUrl } = userData;
  const { currentUser } = useRecoilValue(authState);
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success" ? "Данные успешно изменены!" : errorMessage;
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [isOpenCards, setOpenCards] = useState(true);
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const addPhoto = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      const file = e?.target?.files?.[0];

      if (!file) return;

      const imagesRef = firebase.storage().ref().child("avatars/");
      const fileRef = imagesRef.child(file.name);

      await fileRef.put(file);

      const avatarUrl = await fileRef.getDownloadURL();
      const uid = currentUser?.uid;

      if (!uid) {
        throw new Error("Пользователь не найден");
      }

      await db.ref().update({
        [`users/${uid}`]: {
          ...userData,
          avatarUrl,
        },
      });

      const updatedData = await fetchUser();

      setUser({
        ...user,
        userData: updatedData,
      });

      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      onAlertOpen();
    }
  };

  const handleDrawerCollapse = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = () => {
    setOpenCards((isOpenCards) => !isOpenCards);
  };

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  return (
    <>
      {view === "desktop" ? (
        <DesktopSidebar
          open={open}
          avatarUrl={avatarUrl}
          addPhoto={addPhoto}
          firstName={firstName}
          lastName={lastName}
          patronymic={patronymic}
          isOpenCards={isOpenCards}
          isLoading={isLoading}
          handleDrawerCollapse={handleDrawerCollapse}
          handleClick={handleClick}
        />
      ) : (
        <MobileSidebar
          firstName={firstName}
          lastName={lastName}
          patronymic={patronymic}
          avatarUrl={avatarUrl}
          isOpenDrawer={isOpenDrawer}
          onToggleMobileDrawer={onToggleMobileDrawer}
          addPhoto={addPhoto}
          handleClick={handleClick}
          isOpenCards={isOpenCards}
        />
      )}
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </>
  );
};

export default Sidebar;
