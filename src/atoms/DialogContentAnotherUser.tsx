import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { IFormData } from "./../molecules/DialogTransaction";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import authState from "../recoilState/recoilAtoms/authAtom";
import currencySelector from "../recoilState/recoilSelectors/currencySelector";
import { calculateOfTransfer } from "../utils/calculateOfTransfer";
import { findCardId } from "../utils/calculateOfTransfer";
import * as yup from "yup";
import { db } from "../firebase/firebase";
import {
  phoneValidation,
  selectValidation,
  sumValidation,
} from "../utils/validationSchemas";
import { useFormik } from "formik";
import { TAlert } from "../interfaces/tAlert";
import {
  REQUIRED_MESSAGE,
  NOT_A_LETTER,
  CATEGORY2,
  DESCRIPTION,
  WRITTINGOFF,
  INCOMES,
} from ".././constants";
import { getInfoAboutAnotherUser } from "../utils/getInfoAboutAnotherUser";
import { cleanPhone, phoneMask } from "./../utils/phoneMask";
import { FormItemTransfer } from "./FormItemTransfer";
import { randomId } from "../utils/randomId";
import { fetchUser } from "../api";
import { getCurrencies } from "../utils/getCurrencies";
import { findBothCurrencies } from "../utils/findBothCurrencies";
import { Box, DialogContentText } from "@material-ui/core";
import { TextField } from ".";

export interface IDialogContentAnotherUser extends IFormData {
  phone?: string;
}

interface IDialogContentYourAccounts {
  closeDialog: () => void;
  openAlert: () => void;
  setAlertType: (type: TAlert) => void;
  setErrorMessage: (message: string) => void;
}

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

  const onSubmit = async ({
    card1,
    sum,
    calculatedSum,
    phone,
  }: IDialogContentAnotherUser) => {
    try {
      const amount = Number(sum);
      const uid = currentUser?.uid;

      if (!phone) {
        return;
      }

      const clearedPhone = cleanPhone(phone);
      const {
        uid: anotherUserUid,
        products: anotherUserProducts,
      } = await getInfoAboutAnotherUser(clearedPhone);

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
            operations: {
              ...products.cards[id1].operations,
              [randomId()]: {
                amount,
                category: CATEGORY2,
                currency: products.cards[id1].currency,
                date: new Date(),
                description: DESCRIPTION,
                name: t(WRITTINGOFF),
                type: "writeOff",
              },
            },
          },
        },
      });

      await db.ref().update({
        [`users/${anotherUserUid}/products/cards/${card2Id}`]: {
          ...cards[card2Id],
          balance: anotherCardInfo.balance + Number(calculatedSum),
          operations: {
            ...anotherCardInfo.operations,
            [randomId()]: {
              amount,
              category: CATEGORY2,
              currency: anotherCardInfo.currency,
              date: new Date(),
              description: DESCRIPTION,
              name: t(INCOMES),
              type: "income",
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
      phone: "",
    },
    validationSchema: yup.object({
      card1: selectValidation(t("Choose a card"), t(REQUIRED_MESSAGE)),
      phone: phoneValidation(
        t("Please enter valid phone number"),
        t(REQUIRED_MESSAGE)
      ),
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

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("phone", phoneMask(event.target.value));
  };

  useEffect(() => {
    const countSumForTransaction = async () => {
      const { card1, sum, phone } = values;
      const clearedPhone = cleanPhone(phone);

      if (clearedPhone?.length < 11) {
        return;
      }

      const {
        uid: anotherUserUid,
        products: anotherUserProducts,
      } = await getInfoAboutAnotherUser(clearedPhone);

      if (!anotherUserUid) {
        throw new Error(t("User is not found"));
      }

      const id1 = findCardId(card1, products);

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

      setFieldValue("calculatedSum", num.toFixed());

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
    };

    countSumForTransaction();
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
      }
      title={
        <DialogContentText>
          {t("In order to transfer money to another bank user")}
        </DialogContentText>
      }
    />
  );
};

export default DialogContentAnotherUser;
