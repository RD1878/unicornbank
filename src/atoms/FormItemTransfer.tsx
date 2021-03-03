import React, { FC, ChangeEvent, FormEvent, ReactElement } from "react";
import { PrimaryButton, TextField } from ".";
import styled from "styled-components";
import {
  DialogActions,
  Box,
  Typography,
  FormHelperText,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  DialogContent,
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { FieldInputProps, FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";
import { IDialogContentAnotherUser } from "./DialogContentAnotherUser";

const StyledFormControl = withTheme(styled(({ ...props }) => (
  <FormControl classes={{ root: "root" }} {...props} />
))`
  & .select {
    margin-top: 10px;
  }
`);

interface IFormItemTransfer {
  errors: FormikErrors<IDialogContentAnotherUser>;
  touched: FormikTouched<IDialogContentAnotherUser>;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  handleSumChange: (event: ChangeEvent<HTMLInputElement>) => void;
  same: boolean;
  arrayNumberCard: string[];
  getFieldProps: (nameOrOptions: string) => FieldInputProps<string>;
  currentCurrency: string;
  num: number | undefined;
  values: IDialogContentAnotherUser;
  closeDialog: () => void;
  inputField: ReactElement;
  title: ReactElement;
}

export const FormItemTransfer: FC<IFormItemTransfer> = ({
  errors,
  touched,
  handleSubmit,
  handleSumChange,
  same,
  arrayNumberCard,
  getFieldProps,
  currentCurrency,
  num,
  values,
  closeDialog,
  inputField,
  title,
}) => {
  const { t } = useTranslation();
  return (
    <DialogContent>
      {title}
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
        {inputField}
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
