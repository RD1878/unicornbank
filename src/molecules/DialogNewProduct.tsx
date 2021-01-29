import React, { SyntheticEvent, FC, useState } from "react";
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
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { PrimaryButton } from "../atoms";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { userSelector } from "../selectors/userSelector";
import { useFormik } from "formik";
import { db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { CURRENCIES, SHACKBAR_SHOW_DURATION } from "../constants";
import { requestUser } from "./../actions/user";
import { authSelector } from "../selectors";
import { TAlert } from "../interfaces/main";
import { Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getRandomNumber } from "../utils/randomNumber";
import { randomId } from "../utils/randomId";
import { useTranslation } from "react-i18next";

const StyledPrimaryButton = withTheme(styled(PrimaryButton)`
  width: fit-content;
  align-self: center;
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
  const user = useSelector(userSelector);
  const { currentUser } = useSelector(authSelector);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("The card has been successfully issued!")}`
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

  const onSubmit = async ({ currency }: IFormRadio) => {
    try {
      const newCard = {
        currency,
        balance: 0,
        isActive: false,
        number: `${getRandomNumber(5)} **** **** **** ${getRandomNumber(5)}`,
      };

      const updateUser = {
        ...user,
        products: {
          ...user.products,
          cards: {
            ...user.products.cards,
            [randomId()]: newCard,
          },
        },
      };
      if (!currentUser) {
        return;
      }

      db.ref().update({
        [`users/${currentUser.uid}`]: updateUser,
      });

      dispatch(requestUser());
      setOpenDialog(false);
      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      setIsOpenAlert(true);
    }
  };

  const { handleSubmit, getFieldProps } = useFormik({
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
      >
        Новый продукт
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
                aria-label="Продукт"
                {...getFieldProps("product")}
                row
              >
                <FormControlLabel
                  value={t("Debit card")}
                  control={<Radio />}
                  label={t("Debit card")}
                />
                <FormControlLabel
                  value={t("Consumer loan")}
                  control={<Radio />}
                  label={t("Consumer loan")}
                  disabled
                />
                <FormControlLabel
                  value={t("Contribution")}
                  control={<Radio />}
                  label={t("Contribution")}
                  disabled
                />
              </RadioGroup>
            </Box>
            <Box mt={2} mb={1}>
              <FormLabel component="legend">{t("Select currency")}</FormLabel>
              <RadioGroup
                aria-label="Валюта"
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
              <Typography variant="body1">
                {t(
                  "After clicking on the Confirm button, a new card will appear in your open products"
                )}
              </Typography>
              <PrimaryButton type="submit">{t("Confirm")}</PrimaryButton>
            </ButtonWrap>
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

export default DialogNewProduct;
