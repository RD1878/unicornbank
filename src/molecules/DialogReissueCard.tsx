import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { FC, useState } from "react";
import { PrimaryButton } from "../atoms";
import styled from "styled-components";
import { db, firebaseAuth, readUserData } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../actions";
import { userSelector } from "../selectors";

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 265px;
  margin-top: 10px;
`;

interface IProps {
  idCurrentCard: string;
}

const DialogReissueCard: FC<IProps> = ({ idCurrentCard }) => {
  const [isOpenDialogReissue, setOpenDialogReissue] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const handleOpenDialogReissue = () => {
    setOpenDialogReissue(true);
  };

  const handleCloseDialogReissue = () => {
    setOpenDialogReissue(false);
    setConfirm(false);
  };
  const handleConfirm = () => {
    handleDisactiveCard();
    setConfirm(true);
  };
  const handleDisactiveCard = async (): Promise<void> => {
    const uid = firebaseAuth?.currentUser?.uid;
    if (!uid) {
      throw new Error("Пользователь не найден");
    }
    db.ref(`users/${uid}/products/cards/${idCurrentCard}`).update({
      isActive: false,
    });
    const updatedCardStatus = await readUserData(uid);
    dispatch(saveUser(updatedCardStatus));
  };
  const {
    products: {
      cards: {
        [`${idCurrentCard}`]: { isActive },
      },
    },
  } = useSelector(userSelector);
  return (
    <>
      <StyledPrimaryButton
        onClick={handleOpenDialogReissue}
        disabled={!isActive}
      >
        Перевыпустить карту
      </StyledPrimaryButton>
      <Dialog
        open={isOpenDialogReissue}
        onClose={handleCloseDialogReissue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!isConfirm
            ? "Вы уверены что хотите перевыпустить карту? После подтверждения данная карта будет заблокирована, а у новой карты будут другие реквизиты."
            : "Данная карта заблокирована. Сотрудник банка свяжется с Вами в течении 24 часов для уточнения места получения новой карты."}
        </DialogTitle>
        <DialogActions>
          <PrimaryButton onClick={handleCloseDialogReissue}>
            {!isConfirm ? "Отмена" : "Закрыть"}
          </PrimaryButton>
          {!isConfirm ? (
            <PrimaryButton onClick={handleConfirm} autoFocus>
              Подтвердить
            </PrimaryButton>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogReissueCard;
