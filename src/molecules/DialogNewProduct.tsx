import {
  Dialog,
  /* DialogActions, */
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { PrimaryButton } from "../atoms";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

/* import { db, firebaseAuth, readUserData } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../actions";
import { userSelector } from "../selectors";
 */
const StyledPrimaryButton = withTheme(styled(PrimaryButton)`
  width: fit-content;
  align-self: center;
`);

const DialogNewProduct: FC = () => {
  const [isOpenDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirm = () => {
    setConfirm(true);
  };

  return (
    <>
      <StyledPrimaryButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Новый продукт
      </StyledPrimaryButton>
      <Dialog
        open={isOpenDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">
          Заявка для нового продукта
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Выберите пожалуйста необходимые параметры
          </DialogContentText>
          <FormControl component="fieldset">
            <FormLabel component="legend">Выберите продукт</FormLabel>
            <RadioGroup
              aria-label="Продукт"
              name="product"
              value="Дебетовая карта"
              /* onChange={handleChange} */
              row
            >
              <FormControlLabel
                value="Дебетовая карта"
                control={<Radio />}
                label="Дебетовая карта"
              />
              <FormControlLabel
                value="Потребительский кредит"
                control={<Radio />}
                label="Потребительский кредит"
                disabled
              />
              <FormControlLabel
                value="Вклад"
                control={<Radio />}
                label="Вклад"
                disabled
              />
            </RadioGroup>
            <PrimaryButton onClick={handleCloseDialog}>Отмена</PrimaryButton>
            <PrimaryButton onClick={handleConfirm} type="submit">
              Подтвердить
            </PrimaryButton>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogNewProduct;
