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
import { userSelector, authSelector, currencySelector } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { requestUser } from "../actions";
import { TAlert } from "../interfaces/main";
import * as yup from "yup";
import { selectValidation, sumValidation } from "../utils/validationSchemas";
import { useAlert } from "../utils/useAlert";
import { NOT_NUMBER_REGEX } from ".././Pages/Profile/Profile";

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
  const { currentUser } = useSelector(authSelector);
  const { currency } = useSelector(currencySelector);
  const { products } = useSelector(userSelector);
  const cards = Object.values(products.cards);
  const arrayNumberCard = cards.map((value) => value.number);
  const [currentCurrency, setCurrentCurrency] = useState("");
  const [num, setNum] = useState<number | undefined>(0);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("Translation completed successfully!")}`
      : errorMessage;
  const dispatch = useDispatch();
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const findCardId = (cardNumber: string): string => {
    const idsArray = Object.keys(products.cards);

    return idsArray.find(
      (key: string) => products.cards[key].number === cardNumber
    ) as string;
  };

  const onSubmit = async ({ card1, card2, sum, calculatedSum }: IFormData) => {
    try {
      const amount = Number(sum);
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
            balance: products.cards[id1].balance - amount,
          },
          [id2]: {
            ...products.cards[id2],
            balance: products.cards[id2].balance + calculatedSum,
          },
        },
      });

      dispatch(requestUser());
      setOpenDialog(false);
      resetForm();
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
    const value = Number(event.target.value);
    const { card1, card2 } = values;
    const [id1, id2] = [findCardId(card1), findCardId(card2)];
    const cardCurrency1 = products.cards[id1].currency;
    const cardCurrency2 = products.cards[id2].currency;
    const currency1 = currency.find(
      ({ charCode }) => charCode === cardCurrency1
    );
    const currency2 = currency.find(
      ({ charCode }) => charCode === cardCurrency2
    );
    const calculateOfTransfer = (): number => {
      // Если переводим в рубли нерубли
      if (cardCurrency2 === "RUB" && currency1) {
        return value * currency1.value;
      }

      if (!currency1 && currency2) return value / currency2.previous;
      if (!currency1 || !currency2) return value;

      if (cardCurrency1 === cardCurrency2) {
        return value;
      }

      if (cardCurrency1 === "EUR" || cardCurrency1 === "USD") {
        return (value * currency1.value) / currency2.previous;
      }

      return (value * currency1.previous) / currency2.previous;
    };
    setFieldValue("sum", event.target.value.replace(NOT_NUMBER_REGEX, ""));
    setFieldValue("calculatedSum", calculateOfTransfer());
  };

  useEffect(() => {
    const { card1, card2 } = values;
    const [id1, id2] = [findCardId(card1), findCardId(card2)];
    const cardCurrency1 = products.cards[id1]?.currency;
    const cardCurrency2 = products.cards[id2]?.currency;

    const currentValue1 = currency.find(
      ({ charCode }) => charCode === cardCurrency1
    );
    const currentValue2 = currency.find(
      ({ charCode }) => charCode === cardCurrency2
    );

    if (currentValue1) {
      setCurrentCurrency(cardCurrency1);
      setNum(currentValue1?.previous);
      return;
    }

    setCurrentCurrency(cardCurrency2);
    setNum(currentValue2?.previous);
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
                <InputLabel>{t("Debit account number")}</InputLabel>
                <Select
                  label={t("Debit account number")}
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
                <InputLabel>{t("Crediting account number")}</InputLabel>
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
            <Typography variant="body1">
              {t("The translation will take place at the rate")} {num}{" "}
              {currentCurrency}
            </Typography>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <TextField
                fullWidth
                label={t("Amount")}
                name="sum"
                value={values.sum}
                onChange={handleSumChange}
                error={touched.sum && Boolean(errors.sum)}
                helperText={touched.sum && errors.sum}
              />
              <TextField
                disabled
                fullWidth
                label="Конвертация валюты"
                name="calculatedSum"
                value={values.calculatedSum}
              />
            </Box>
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
