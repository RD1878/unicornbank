import React, { FC, useState, ChangeEvent, useEffect } from "react";
import {
  DialogContentText,
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
import { PrimaryButton, TextField } from ".";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { IFormData } from "./../molecules/DialogTransaction";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import authState from "../recoilState/recoilAtoms/authAtom";
import currencySelector from "../recoilState/recoilSelectors/currencySelector";
import { calculateOfTransfer } from "../utils/calculateOfTransfer";
import { findCardId } from "../utils/calculateOfTransfer";
import * as yup from "yup";
import {
  NOT_A_LETTER,
  CATEGORY,
  DESCRIPTION,
  WRITTINGOFF,
  INCOMES,
  REQUIRED_MESSAGE,
} from ".././constants";
import { db } from "../firebase/firebase";
import { selectValidation, sumValidation } from "../utils/validationSchemas";
import { useFormik } from "formik";
import { TAlert } from "../interfaces/tAlert";
import { randomId } from "../utils/randomId";
import { fetchUser } from "../api";
import { getCurrencies } from "../utils/getCurrencies";
import { findBothCurrencies } from "../utils/findBothCurrencies";

interface IDialogContentYourAccounts {
  closeDialog: () => void;
  openAlert: () => void;
  setAlertType: (type: TAlert) => void;
  setErrorMessage: (message: string) => void;
}

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

const DialogContentYourAccounts: FC<IDialogContentYourAccounts> = ({
  closeDialog,
  openAlert,
  setAlertType,
  setErrorMessage,
}) => {
  const { t } = useTranslation();
  const { currentUser } = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const { userData } = user;
  const { products } = userData;
  const { currency } = useRecoilValue(currencySelector);
  const cards = Object.values(products.cards);
  const arrayNumberCard = cards.map((value) => value.number);
  const [currentCurrency, setCurrentCurrency] = useState("");
  const [num, setNum] = useState<number | undefined>(0);
  const [same, setSame] = useState(false);

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
            operations: {
              ...products.cards[id1].operations,
              [randomId()]: {
                amount,
                category: CATEGORY,
                currency: products.cards[id1].currency,
                date: new Date(),
                description: DESCRIPTION,
                name: t(WRITTINGOFF),
                type: "writeOff",
              },
            },
          },
          [id2]: {
            ...products.cards[id2],
            balance: products.cards[id2].balance + Number(calculatedSum),
            operations: {
              ...products.cards[id2].operations,
              [randomId()]: {
                amount,
                category: CATEGORY,
                currency: products.cards[id2].currency,
                date: new Date(),
                description: DESCRIPTION,
                name: t(INCOMES),
                type: "income",
              },
            },
          },
        },
      });

      const updatedUser = await fetchUser();

      setUser({
        ...user,
        userData: updatedUser,
      });

      closeDialog();
      resetForm();
      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      openAlert();
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
      cardNumber: "",
    },
    validationSchema: yup.object({
      card1: selectValidation(t("Choose a card"), t(REQUIRED_MESSAGE)),
      card2: selectValidation(t("Choose a card"), t(REQUIRED_MESSAGE)),
      sum: sumValidation(
        t("Please enter valid phone number"),
        t(REQUIRED_MESSAGE)
      ),
    }),
    onSubmit,
  });

  const handleSumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("sum", event.target.value.replace(NOT_A_LETTER, ""));
  };

  useEffect(() => {
    const { card1, card2, sum } = values;
    const [id1, id2] = [
      findCardId(card1, products),
      findCardId(card2, products),
    ];
    const cardCurrency1 = products.cards[id1]?.currency;
    const cardCurrency2 = products.cards[id2]?.currency;

    const { currency1, currency2 } = getCurrencies({
      cardCurrency1,
      cardCurrency2,
      currency,
    });

    const bothExist = findBothCurrencies({
      cardCurrency1,
      cardCurrency2,
    });

    if (cardCurrency1 === cardCurrency2) {
      setSame(true);
    } else {
      setSame(false);
    }

    const num = calculateOfTransfer({
      sum,
      cardCurrency1,
      cardCurrency2,
      currency1,
      currency2,
    });

    setFieldValue("calculatedSum", num.toFixed(2));

    if (bothExist && currency1 && currency2) {
      return setNum(currency1.previous / currency2.value);
    }

    if (currency1) {
      setCurrentCurrency(cardCurrency1);
      setNum(currency1?.value);

      return;
    }

    setCurrentCurrency(cardCurrency2);
    setNum(currency2?.value);
  }, [values]);

  return (
    <DialogContent>
      <DialogContentText>
        {t("In order to transfer money to your card")}
      </DialogContentText>
      <form onSubmit={handleSubmit}>
        <Typography variant="body2">{t("Filling in requisites")}</Typography>
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
              step: "0.01",
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
              <PrimaryButton color="primary" onClick={closeDialog}>
                {t("Cancel")}
              </PrimaryButton>
            </Box>
          </Box>
        </DialogActions>
      </form>
    </DialogContent>
  );
};

export default DialogContentYourAccounts;
