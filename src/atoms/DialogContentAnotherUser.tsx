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
// import {
//   FieldInputProps,
//   FormikErrors,
//   FormikTouched,
//   FormikValues,
//   useFormik,
// } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import authState from "../recoilState/recoilAtoms/authAtom";
import currencySelector from "../recoilState/recoilSelectors/currencySelector";
import {
  calculateOfTransfer,
  findCardId,
} from "../helpers/calculateOfTransfer";
import * as yup from "yup";
import { db } from "../firebase/firebase";
import api from "../api";
import {
  phoneValidation,
  selectValidation,
  sumValidation,
} from "../utils/validationSchemas";
import { useFormik } from "formik";
import { TAlert } from "../interfaces/main";
import { REQUIRED_MESSAGE, NOT_A_LETTER } from ".././constants";
import { NOT_NUMBER_REGEX } from "../Pages/Profile/Profile";
import { PATTERN } from "./../Pages/Profile/Profile";
import { getInfoAboutAnotherUser } from "../helpers/getInfoAboutAnotherUser";

interface IDialogContentAnotherUser extends IFormData {
  phone: string;
}

const cleanPhone = (phone: string): string =>
  phone.replace(NOT_NUMBER_REGEX, "");

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

const DialogContentAnotherUser: FC<IDialogContentYourAccounts> = ({
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

  const phoneMask = (phone: string): string => {
    const cleaned = cleanPhone(phone);
    const match = cleaned.match(PATTERN);

    if (!match) {
      return "+7";
    }

    const first = match[2] && `(${match[2]}`;
    const second = match[3] && `)${match[3]}`;
    const third = match[4] && `-${match[4]}`;
    const fourth = match[5] && `-${match[5]}`;

    return ["+7", first, second, third, fourth].join("");
  };

  const onSubmit = async ({
    card1,
    sum,
    calculatedSum,
    phone,
  }: IDialogContentAnotherUser) => {
    try {
      const amount = Number(sum);
      const uid = currentUser?.uid;
      const {
        uid: anotherUserUid,
        products: anotherUserProducts,
      } = await getInfoAboutAnotherUser(phone);

      if (!anotherUserUid) {
        throw new Error(t("User is not found"));
      }

      const cards = anotherUserProducts.cards;
      const arrayCards = Object.keys(cards);
      const cardsInfo = arrayCards.map((id) => ({
        ...cards[id],
        id,
      }));

      const anotherCardInfo = cardsInfo.find((card) => card.isActive === true);

      if (!anotherCardInfo) {
        throw new Error("Карта не найдена");
      }

      const card2Id = anotherCardInfo.id;

      const id1 = findCardId(card1, products);

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
        },
      });

      await db.ref().update({
        [`users/${anotherUserUid}/products/cards/${card2Id}`]: {
          ...cards[card2Id],
          balance: anotherCardInfo.balance + calculatedSum,
        },
      });

      const updatedUser = await api.fetchUser();

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
      phone: "",
    },
    validationSchema: yup.object({
      card1: selectValidation,
      sum: sumValidation,
      phone: phoneValidation(
        t("Please enter valid phone number"),
        t(REQUIRED_MESSAGE)
      ),
    }),
    onSubmit,
  });

  const handleSumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("sum", event.target.value.replace(NOT_A_LETTER, ""));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("phone", phoneMask(event.target.value));
  };

  useEffect(() => {
    const countSumForTransaction = async () => {
      const { card1, sum, phone } = values;

      if (!phone.length) {
        return;
      }

      const id1 = findCardId(card1, products);
      const {
        uid: anotherUserUid,
        products: anotherUserProducts,
      } = await getInfoAboutAnotherUser(phone);

      if (!anotherUserUid) {
        throw new Error(t("User is not found"));
      }

      const cards = anotherUserProducts.cards;
      const arrayCards = Object.keys(cards);
      const cardsInfo = arrayCards.map((id) => ({
        ...cards[id],
        id,
      }));

      const anotherCardInfo = cardsInfo.find((card) => card.isActive === true);

      if (!anotherCardInfo) {
        throw new Error("Карта не найдена");
      }

      const card2Id = anotherCardInfo.id;

      const cardCurrency1 = products.cards[id1]?.currency;
      const cardCurrency2 = anotherUserProducts.cards[card2Id].currency;

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
    };

    countSumForTransaction();
  }, [values]);

  return (
    <DialogContent>
      <DialogContentText>
        {t("In order to transfer money to another bank user")}
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
          <DialogContentText>
            {t(
              "Enter the phone number of the user to whom you want to transfer funds"
            )}
          </DialogContentText>
          <TextField
            fullWidth
            label={t("Phone")}
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handlePhoneChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Box>
        {!same && (
          <Typography variant="body1">
            {t("The translation will take place at the rate")} {num}{" "}
            {currentCurrency}
          </Typography>
        )}
        <Box display="flex" mt={2} mb={2}>
          <TextField
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

export default DialogContentAnotherUser;
