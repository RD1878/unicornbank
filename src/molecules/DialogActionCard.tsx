import {
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import React, { FC, SyntheticEvent, useState } from "react";
import { PrimaryButton } from "../atoms";
import styled from "styled-components";
import { db, firebaseAuth, readUserData } from "../firebase/firebase";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from "../constants";

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 265px;
  margin-top: 10px;
`;

interface IProps {
  idCurrentCard: string;
  actionType: string;
  confirmType: string;
  message: string;
}

const DialogActionCard: FC<IProps> = ({
  idCurrentCard,
  actionType,
  confirmType,
  message,
}) => {
  const { t } = useTranslation();
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { userData } = user;
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setConfirm(false);
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  const handleConfirm = async (): Promise<void> => {
    try {
      const uid = firebaseAuth?.currentUser?.uid;
      if (!uid) {
        throw new Error("Пользователь не найден");
      }
      await db.ref(`users/${uid}/products/cards/${idCurrentCard}`).update({
        isActive: false,
      });
      const updatedCardStatus = await readUserData(uid);
      setUser({
        ...user,
        userData: updatedCardStatus,
      });
      setConfirm(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const {
    products: {
      cards: {
        [`${idCurrentCard}`]: { isActive },
      },
    },
  } = userData;

  return (
    <>
      <StyledPrimaryButton onClick={handleOpenDialog} disabled={!isActive}>
        {actionType}
      </StyledPrimaryButton>
      <Dialog
        open={isOpenDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!isConfirm ? confirmType : message}
        </DialogTitle>
        <DialogActions>
          <PrimaryButton onClick={handleCloseDialog}>
            {!isConfirm ? t("Cancel") : t("Close")}
          </PrimaryButton>
          {!isConfirm ? (
            <PrimaryButton onClick={handleConfirm} autoFocus>
              {t("Confirm")}
            </PrimaryButton>
          ) : null}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DialogActionCard;
