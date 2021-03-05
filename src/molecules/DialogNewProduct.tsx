import React, { FC, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { PrimaryButton, PrimaryAlert } from "../atoms";
import styled from "styled-components";
import { withTheme, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from "formik";
import { db } from "../firebase/firebase";
import {
  BANKOFRECIPIENT,
  CURRENCIES,
  INN,
  KPP,
  CORRESPONDENTACCOUNT,
} from "../constants";
import { TAlert } from "../interfaces/tAlert";
import { Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getRandomNumber } from "../utils/randomNumber";
import { randomId } from "../utils/randomId";
import { useTranslation } from "react-i18next";
import { BIK } from "./../constants";
import { useAlert } from "../utils/useAlert";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "../recoilState/recoilAtoms/authAtom";
import userState from "../recoilState/recoilAtoms/userAtom";

const StyledPrimaryButton = withTheme(styled(({ ...props }) => (
  <PrimaryButton {...props} />
))`
  width: fit-content;
  align-self: center;
  & > span > span {
    margin-right: ${(props) => (props.matches ? "8px" : "0")};
  }
`);

const ButtonWrap = styled("div")`
  display: flex;
  flex-direction: column;
  & > * {
    & + * {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

interface IFormRadio {
  product: string;
  currency: string;
}

const DialogNewProduct: FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useRecoilState(userState);
  const { userData } = user;
  const { currentUser } = useRecoilValue(authState);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("The card has been successfully issued!")}`
      : errorMessage;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = async ({ currency }: IFormRadio) => {
    try {
      const { lastName, firstName, patronymic } = userData;
      const account = getRandomNumber(20);
      const newCard = {
        currency,
        id: getRandomNumber(4),
        balance: 0,
        isActive: true,
        number: `**** **** **** ${getRandomNumber(4)}`,
        requisites: {
          account,
          bankOfRecipient: BANKOFRECIPIENT,
          correspondentAccount: CORRESPONDENTACCOUNT,
          bik: BIK,
          inn: INN,
          kpp: KPP,
          purposeOfPayment: `Перевод средств на счет ${account} РУБ`,
          recipient: `${lastName} ${firstName} ${patronymic}`,
        },
        validity: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear() + 3,
        },
        operations: {},
      };

      const updateUser = {
        ...userData,
        products: {
          ...userData.products,
          cards: {
            ...userData.products.cards,
            [randomId()]: newCard,
          },
        },
      };
      if (!currentUser) {
        return;
      }

      await db.ref().update({
        [`users/${currentUser.uid}`]: updateUser,
      });

      setUser({
        ...user,
        userData: updateUser,
      });

      setOpenDialog(false);
      setAlertType("success");
      resetForm();
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      onAlertOpen();
    }
  };

  const { handleSubmit, getFieldProps, resetForm } = useFormik({
    initialValues: {
      product: t("Debit card"),
      currency: "RUB",
    },
    onSubmit,
  });

  return (
    <>
      <StyledPrimaryButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
        matches={matches.toString()}
      >
        {matches && t("New Product")}
      </StyledPrimaryButton>
      <Dialog
        open={isOpenDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="body2">
            {t("Application for a new product")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Please select the required parameters")}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <FormLabel component="legend">{t("Select product")}</FormLabel>
              <RadioGroup
                aria-label={t("product")}
                {...getFieldProps("product")}
                row
              >
                <FormControlLabel
                  value={t("Debit card")}
                  control={<Radio />}
                  label={t("Debit card")}
                />
              </RadioGroup>
            </Box>
            <Box mt={2} mb={1}>
              <FormLabel component="legend">{t("Select currency")}</FormLabel>
              <RadioGroup
                aria-label={t("currency")}
                {...getFieldProps("currency")}
                row
              >
                {Object.entries(CURRENCIES).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={t(value)}
                  />
                ))}
              </RadioGroup>
            </Box>
            <ButtonWrap>
              <StyledIconButton type="button" onClick={handleCloseDialog}>
                <CloseIcon color="secondary" />
              </StyledIconButton>
              <Typography variant="body1">{t("After clicking")}</Typography>
              <PrimaryButton type="submit">{t("Confirm")}</PrimaryButton>
            </ButtonWrap>
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

export default DialogNewProduct;
