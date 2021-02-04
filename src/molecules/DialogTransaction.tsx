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
  FormHelperText,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PrimaryButton, TextField } from "../atoms";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { userSelector, authSelector } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { requestUser } from "../actions";
import { Alert } from "@material-ui/lab";
import { SHACKBAR_SHOW_DURATION } from "../constants";
import { TAlert } from "../interfaces/main";
import * as yup from "yup";
import { selectValidation, sumValidation } from "../utils/validationSchemas";

const StyledFormControl = withTheme(styled(({ open, width, ...props }) => (
  <FormControl
    classes={{ root: "root" }}
    open={open}
    width={width}
    {...props}
  />
))`
  label {
    padding: 0px 15px;
  }

  p {
    padding: 0px 15px;
  }

  & .select {
    margin-top: 10px;
  }
`);

interface IFormData {
  card1: string;
  card2: string;
  sum: string;
}

const validationSchema = yup.object({
  card1: selectValidation,
  card2: selectValidation,
  sum: sumValidation,
});

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

      if (card1 === card2) {
        throw new Error(t("Accounts for debiting and depositing are the same"));
      }

      if (products.cards[id1].balance < Number(sum)) {
        throw new Error(t("There are not enough funds on your card"));
      }

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

  const { errors, handleSubmit, touched, getFieldProps } = useFormik({
    initialValues: {
      card1: "",
      card2: "",
      sum: "",
    },
    validationSchema,
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
      <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("Transaction")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("In order to transfer money to your card")}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <Typography variant="body2">
              {t("Filling in requisites")}
            </Typography>
            <Box mt={3}>
              <StyledFormControl
                fullWidth
                error={touched.card1 && Boolean(errors.card1)}
              >
                <InputLabel>{t("Debit account number")}</InputLabel>
                <Select {...getFieldProps("card1")}>
                  {arrayNumberCard.map((number: string) => (
                    <MenuItem value={number} key={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.card1 && errors.card1}</FormHelperText>
              </StyledFormControl>
            </Box>
            <Box mt={3} mb={3}>
              <StyledFormControl
                fullWidth
                error={touched.card2 && Boolean(errors.card2)}
              >
                <InputLabel>{t("Crediting account number")}</InputLabel>
                <Select {...getFieldProps("card2")}>
                  {arrayNumberCard.map((number: string) => (
                    <MenuItem value={number} key={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.card2 && errors.card2}</FormHelperText>
              </StyledFormControl>
            </Box>
            <TextField
              fullWidth
              label={t("Amount")}
              {...getFieldProps("sum")}
              error={touched.sum && Boolean(errors.sum)}
              helperText={touched.sum && errors.sum}
            />
            <DialogActions>
              <Box mt={3} display="flex">
                <PrimaryButton type="submit" color="primary">
                  {t("Transfer money")}
                </PrimaryButton>
                <Box ml={2}>
                  <PrimaryButton color="primary" onClick={handleCloseDialog}>
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
