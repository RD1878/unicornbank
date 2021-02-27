import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { OperationCard, TabPanel } from "../molecules";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import { IOperation } from "../interfaces/operation";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import { CURRENCIES, sevenDaysAgo } from "../constants";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { getEndToday } from "../utils/getEndToday";

const StyledTab = styled(({ ...props }) => (
  <Tab classes={{ wrapper: "wrapper" }} {...props} />
))`
  text-transform: none;
  min-width: 80px;
  max-width: 130px;
  line-height: 1.25;
  & .wrapper {
    align-items: flex-start;
    white-space: nowrap;
    align-items: center;
  }
`;

const StyledContainer = styled("div")`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledOperationsContainer = styled("div")`
  margin-top: 10px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

interface ICardTransaction {
  id: string;
  key: string;
  operation: IOperation;
}

interface IProps {
  cardsTransactions: ICardTransaction[];
}

interface ICardValue {
  value: unknown;
}

interface ICardCurrency {
  value: unknown;
}

const TransactionsList: FC<IProps> = ({ cardsTransactions }) => {
  const { t } = useTranslation();
  const { userData } = useRecoilValue(userState);
  const [tab, setTab] = useState(0);
  const [card, setCard] = useState("all");
  const [currency, setCurrency] = useState("all");
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(
    sevenDaysAgo
  );
  const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(
    getEndToday()
  );

  const { products } = userData;
  const { cards } = products;
  const dataCards = Object.entries(cards);
  const currencies = Object.keys(CURRENCIES);

  const categories: { type: string; name: string }[] = [
    { type: "all", name: t("All") },
    { type: "income", name: t("Incomes") },
    { type: "writeOff", name: t("Write off") },
  ];

  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };

  const formattedOperations = (operations: ICardTransaction[]) =>
    operations
      .sort(
        (itemA, itemB) =>
          Date.parse(itemB.operation.date) - Date.parse(itemA.operation.date)
      )
      .filter(({ id }) => (card === "all" ? true : id === card))
      .filter(({ operation }) =>
        currency === "all" ? true : operation.currency === currency
      )
      .filter(({ operation }) => {
        if (selectedDateFrom !== null) {
          return Date.parse(operation.date) >= selectedDateFrom.getTime();
        }
      })
      .filter(({ operation }) => {
        if (selectedDateTo !== null) {
          return Date.parse(operation.date) <= selectedDateTo.getTime();
        }
      })
      .map(({ key, operation }) => (
        <OperationCard operation={operation} key={key} />
      ));

  const filteredOperationsByType = (type: string) => {
    const filtered = cardsTransactions
      .filter(({ operation }) => operation.type === type)
      .filter(({ id }) => (card === "all" ? true : id === card))
      .filter(({ operation }) =>
        currency === "all" ? true : operation.currency === currency
      );
    if (filtered.length) {
      return formattedOperations(filtered);
    } else
      return (
        <Box p={4}>
          <Typography variant="body1" color="textPrimary">
            {t("Not found")}
          </Typography>
        </Box>
      );
  };

  const handleChangeCard = (event: ChangeEvent<ICardValue>) => {
    setCard(event.target.value as string);
  };

  const handleChangeCurrency = (event: ChangeEvent<ICardCurrency>) => {
    setCurrency(event.target.value as string);
  };

  const handleDateChangeFrom = (date: Date | null) => {
    setSelectedDateFrom(date);
  };

  const handleDateChangeTo = (date: Date | null) => {
    setSelectedDateTo(date);
  };

  return (
    <StyledContainer>
      {userData.isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <StyledOperationsContainer>
          <Grid container justify="space-evenly" spacing={1}>
            <FormControl>
              <Select value={card} onChange={handleChangeCard} displayEmpty>
                <MenuItem value="" disabled>
                  {t("Card")}
                </MenuItem>
                <MenuItem value={"all"}>{t("All")}</MenuItem>
                {dataCards.map(([key, { number }]) => (
                  <MenuItem key={key} value={key}>
                    {number.slice(-7)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{t("Card")}</FormHelperText>
            </FormControl>
            <FormControl>
              <Select
                value={currency}
                onChange={handleChangeCurrency}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {t("Currency")}
                </MenuItem>
                <MenuItem value={"all"}>{t("All")}</MenuItem>
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{t("Currency")}</FormHelperText>
            </FormControl>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-evenly">
              <KeyboardDatePicker
                variant="inline"
                autoOk
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-dialog1"
                label="Период с"
                value={selectedDateFrom}
                onChange={handleDateChangeFrom}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                variant="inline"
                autoOk
                margin="normal"
                id="date-picker-dialog2"
                label="Период по"
                format="dd/MM/yyyy"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            scrollButtons="on"
          >
            {categories.map((item) => (
              <StyledTab label={item.name} key={item.type} />
            ))}
          </Tabs>
          <TabPanel type="scrollable-force" value={tab} index={0}>
            {formattedOperations(cardsTransactions)}
          </TabPanel>
          {categories.map(
            (category, index) =>
              category.type !== "all" && (
                <TabPanel
                  type="scrollable-force"
                  value={tab}
                  index={index}
                  key={index}
                >
                  {filteredOperationsByType(category.type)}
                </TabPanel>
              )
          )}
        </StyledOperationsContainer>
      )}
    </StyledContainer>
  );
};

export default TransactionsList;
