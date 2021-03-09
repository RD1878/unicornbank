import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type DateType = Date | null;

interface IProps {
  selectedDateFrom: DateType;
  selectedDateTo: DateType;
  handleDateChangeFrom: (date: DateType) => void;
  handleDateChangeTo: (date: DateType) => void;
}

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  margin-right: 20px;
`;

const DatePickers: FC<IProps> = ({
  selectedDateFrom,
  selectedDateTo,
  handleDateChangeFrom,
  handleDateChangeTo,
}) => {
  const { t } = useTranslation();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start">
        <StyledKeyboardDatePicker
          variant="inline"
          autoOk
          disableFuture
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-dialog1"
          label={t("Period from")}
          value={selectedDateFrom}
          onChange={handleDateChangeFrom}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <StyledKeyboardDatePicker
          variant="inline"
          disableFuture
          autoOk
          margin="normal"
          id="date-picker-dialog2"
          label={t("Period to")}
          format="dd/MM/yyyy"
          value={selectedDateTo}
          minDate={selectedDateFrom}
          minDateMessage={t("Date should not be before minimal date")}
          onChange={handleDateChangeTo}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePickers;
