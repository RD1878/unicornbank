import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { IFormData } from "./../molecules/DialogTransaction";
import { useTranslation } from "react-i18next";
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
import { getInfoAboutAnotherUser } from "../helpers/getInfoAboutAnotherUser";
import { cleanPhone, phoneMask } from "./../helpers/phoneMask";
import { FormItemTransfer } from "./FormItemTransfer";

export interface IDialogContentAnotherUser extends IFormData {
  phone: string;
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
          },
        },
      });

      await db.ref().update({
        [`users/${anotherUserUid}/products/cards/${card2Id}`]: {
          ...cards[card2Id],
          balance: anotherCardInfo.balance + Number(calculatedSum),
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

      setFieldValue("calculatedSum", num.toFixed());

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
    <FormItemTransfer
      errors={errors}
      touched={touched}
      handleSubmit={handleSubmit}
      handleSumChange={handleSumChange}
      handlePhoneChange={handlePhoneChange}
      same={same}
      arrayNumberCard={arrayNumberCard}
      getFieldProps={getFieldProps}
      currentCurrency={currentCurrency}
      num={num}
      values={values}
      closeDialog={closeDialog}
    />
  );
};

export default DialogContentAnotherUser;
