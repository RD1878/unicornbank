import React, { FC, useState, ChangeEvent, useEffect } from "react";
import {
  DialogContentText,
  Box,
  FormHelperText,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
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
import { FormItemTransfer } from "./FormItemTransfer";

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

      const id1 = findCardId(card1, products);
      const id2 = findCardId(card2, products);

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
    const id1 = findCardId(card1, products);
    const id2 = findCardId(card2, products);
    const cardCurrency1 = products.cards[id1]?.currency;
    const cardCurrency2 = products.cards[id2]?.currency;

    const { currency1, currency2 } = getCurrencies(
      cardCurrency1,
      cardCurrency2,
      currency
    );

    const bothExist = findBothCurrencies(cardCurrency1, cardCurrency2);

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
    <FormItemTransfer
      errors={errors}
      touched={touched}
      handleSubmit={handleSubmit}
      handleSumChange={handleSumChange}
      same={same}
      arrayNumberCard={arrayNumberCard}
      getFieldProps={getFieldProps}
      currentCurrency={currentCurrency}
      num={num}
      values={values}
      closeDialog={closeDialog}
      inputField={
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
      }
      title={
        <DialogContentText>
          {t("In order to transfer money to your card")}
        </DialogContentText>
      }
    />
  );
};

export default DialogContentYourAccounts;
