import React, { FC, useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  FormHelperText,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PrimaryAlert, PrimaryButton, TextField } from "../atoms";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { db } from "../firebase/firebase";
import { TAlert } from "../interfaces/tAlert";
import * as yup from "yup";
import { selectValidation, sumValidation } from "../utils/validationSchemas";
import { useAlert } from "../utils/useAlert";
import { calculateOfTransfer, findCardId } from "../utils/calculateOfTransfer";
import { NOT_A_LETTER } from "./../constants";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import authState from "../recoilState/recoilAtoms/authAtom";
import { fetchUser } from "../api";
import currencySelector from "../recoilState/recoilSelectors/currencySelector";

const StyledFormControl = withTheme(styled(({ open, width, ...props }) => (
  <FormControl
    classes={{ root: "root" }}
    open={open}
    width={width}
    {...props}
  />
))`
  & .select {
    margin-top: 10px;
  }
`);

interface IFormData {
  card1: string;
  card2: string;
  sum: string;
  calculatedSum: string;
}

const validationSchema = yup.object({
  card1: selectValidation,
  card2: selectValidation,
  sum: sumValidation,
});

const DialogTransaction: FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const { userData } = user;
  const { products } = userData;
  const { currency } = useRecoilValue(currencySelector);
  const cards = Object.values(products?.cards ?? {});
  const arrayNumberCard = cards.map((value) => value.number);
  const [currentCurrency, setCurrentCurrency] = useState("");
  const [num, setNum] = useState<number | undefined>(0);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [same, setSame] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("Translation completed successfully!")}`
      : errorMessage;
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = async ({ card1, card2, sum, calculatedSum }: IFormData) => {
    try {
      const amount = Number(sum);
      const uid = currentUser?.uid;
      const [id1, id2] = [
        findCardId(card1, products),
        findCardId(card2, products),
      ];

      if (card1 === card2) {
        throw new Error(t("Accounts for debiting and depositing are the same"));
      }

      if (products.cards[id1].balance < Number(sum)) {
        throw new Error(t("There are not enough funds on your card"));
      }

      await db.ref().update({
        [`users/${uid}/products/cards`]: {
          ...products.cards,
          [id1]: {
            ...products.cards[id1],
            balance: products.cards[id1].balance - amount,
          },
          [id2]: {
            ...products.cards[id2],
            balance: products.cards[id2].balance + calculatedSum,
          },
        },
      });

      const updatedUser = await fetchUser();

      setUser({
        ...user,
        userData: updatedUser,
      });

      setOpenDialog(false);
      resetForm();
      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      onAlertOpen();
    }
  };

  const {
    errors,
    handleSubmit,
    touched,
    getFieldProps,
    resetForm,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      card1: "",
      card2: "",
      sum: "",
      calculatedSum: "",
    },
    validationSchema,
    onSubmit,
  });

  const handleSumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("sum", event.target.value.replace(NOT_A_LETTER, ""));
  };

  useEffect(() => {
    if (!products) {
      return;
    }

    const { card1, card2, sum } = values;
    const [id1, id2] = [
      findCardId(card1, products),
      findCardId(card2, products),
    ];
    const cardCurrency1 = products.cards[id1]?.currency;
    const cardCurrency2 = products.cards[id2]?.currency;

    const currency1 = currency.find(
      ({ charCode }) => charCode === cardCurrency1
    );

    const currency2 = currency.find(
      ({ charCode }) => charCode === cardCurrency2
    );

    const bothExist =
      (cardCurrency1 === "USD" && cardCurrency2 === "EUR") ||
      (cardCurrency1 === "EUR" && cardCurrency2 === "USD");

    if (cardCurrency1 === cardCurrency2) {
      setSame(true);
    } else {
      setSame(false);
    }

    const currentValue1 = currency.find(
      ({ charCode }) => charCode === cardCurrency1
    );
    const currentValue2 = currency.find(
      ({ charCode }) => charCode === cardCurrency2
    );

    const num = calculateOfTransfer({
      sum,
      cardCurrency1,
      cardCurrency2,
      currency1,
      currency2,
    });

    setFieldValue("calculatedSum", num);

    if (bothExist && currentValue1 && currentValue2) {
      return setNum(currentValue1.previous / currentValue2.value);
    }

    if (currentValue1) {
      setCurrentCurrency(cardCurrency1);
      setNum(currentValue1?.value);

      return;
    }

    setCurrentCurrency(cardCurrency2);
    setNum(currentValue2?.value);
  }, [values]);

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
                variant="outlined"
                fullWidth
                error={touched.card1 && Boolean(errors.card1)}
              >
                <InputLabel>{t("Debit card number")}</InputLabel>
                <Select
                  label={t("Debit card number")}
                  {...getFieldProps("card1")}
                >
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
                variant="outlined"
              >
                <InputLabel>{t("Crediting card number")}</InputLabel>
                <Select
                  label={t("Crediting account number")}
                  {...getFieldProps("card2")}
                >
                  {arrayNumberCard.map((number: string) => (
                    <MenuItem value={number} key={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.card2 && errors.card2}</FormHelperText>
              </StyledFormControl>
            </Box>
            {!same && (
              <Typography variant="body1">
                {t("The translation will take place at the rate")} {num}{" "}
                {currentCurrency}
              </Typography>
            )}

            <Box display="flex" mt={2} mb={2}>
              <TextField
                disabled={!values.card1 || !values.card2}
                fullWidth
                label={t("Amount")}
                name="sum"
                type="number"
                inputProps={{
                  min: "0",
                  step: "0.1",
                }}
                value={values.sum}
                onChange={handleSumChange}
                error={touched.sum && Boolean(errors.sum)}
                helperText={touched.sum && errors.sum}
              />
            </Box>
            <TextField
              disabled
              fullWidth
              label={t("Currency conversion")}
              name="calculatedSum"
              value={values.calculatedSum}
            />
            <DialogActions>
              <Box mt={3} display="flex">
                <PrimaryButton type="submit" color="primary">
                  {t("Transfer")}
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
      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </>
  );
};

export default DialogTransaction;
