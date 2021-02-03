import React, { FC, useState, SyntheticEvent } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PrimaryButton, TextField } from "../atoms";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { userSelector, authSelector } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db } from "../firebase/firebase";
import { requestUser } from "../actions";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from "../constants";
import { TAlert } from "../interfaces/main";

const StyledSelect = withTheme(styled(({ open, width, ...props }) => (
  <Select classes={{ root: "root" }} open={open} width={width} {...props} />
))`
  & .root {
    padding: 15.5px 14px;
  }

  &.select {
    margin-top: 10px;
  }
`);

interface IFormData {
  card1: string;
  card2: string;
  sum: string;
}

const DialogTransaction: FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector(authSelector);
  const { products } = useSelector(userSelector);
  const cards = Object.values(products.cards);
  const arrayNumberCard = cards.map((value) => value.number);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("Translation completed successfully!")}`
      : errorMessage;
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  const findCardId = (cardNumber: string): string => {
    const idsArray = Object.keys(products.cards);

    return idsArray.find(
      (key: string) => products.cards[key].number === cardNumber
    ) as string;
  };

  const onSubmit = async ({ card1, card2, sum }: IFormData) => {
    try {
      const uid = currentUser?.uid;
      const [id1, id2] = [findCardId(card1), findCardId(card2)];

      db.ref().update({
        [`users/${uid}/products/cards`]: {
          ...products.cards,
          [id1]: {
            ...products.cards[id1],
            balance: products.cards[id1].balance - Number(sum),
          },
          [id2]: {
            ...products.cards[id2],
            balance: products.cards[id2].balance + Number(sum),
          },
        },
      });

      dispatch(requestUser());
      setOpenDialog(false);
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      setIsOpenAlert(true);
    }
  };

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      card1: "",
      card2: "",
      sum: "",
    },
    // validationSchema,
    onSubmit,
  });

  return (
    <>
      <PrimaryButton
        variant="outlined"
        color="primary"
        onClick={handleOpenDialog}
      >
        {t("Money transaction")}
      </PrimaryButton>
      <Dialog
        open={isOpenDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{t("Translations")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("In order to transfer money to your card")}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <Typography variant="body2">
              {t("Filling in requisites")}
            </Typography>
            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  {t("Debit account number")}
                </InputLabel>
                <StyledSelect
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  {...getFieldProps("card1")}
                >
                  {arrayNumberCard.map((number: string) => (
                    <MenuItem value={number} key={number}>
                      {number}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>
            <Box mt={3} mb={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  {t("Crediting account number")}
                </InputLabel>
                <StyledSelect
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  {...getFieldProps("card2")}
                >
                  {arrayNumberCard.map((number: string) => (
                    <MenuItem value={number} key={number}>
                      {number}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label={t("Amount")}
              id="sum"
              {...getFieldProps("sum")}
            />
            <DialogActions>
              <Box mt={2} display="flex">
                <PrimaryButton type="submit" color="primary">
                  {t("Transfer money")}
                </PrimaryButton>
                <Box ml={2}>
                  <PrimaryButton
                    type="submit"
                    color="primary"
                    onClick={handleCloseDialog}
                  >
                    {t("Cancel")}
                  </PrimaryButton>
                </Box>
              </Box>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={SHACKBAR_SHOW_DURATION}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertType} onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DialogTransaction;
