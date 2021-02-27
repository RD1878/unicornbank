import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../atoms";
import { DatePickers, OperationCard, TabPanel } from "../molecules";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
  Grid,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
import { ROUTES } from "../routes";
import { IOperationItem } from "../interfaces/operationItem";
import { categories, CURRENCIES, sevenDaysAgo } from "../constants";
import { getEndToday } from "../utils/getEndToday";
import { getFiltredOperations } from "../utils/getFiltredOperations";

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

const StyledLink = styled(Link)`
  align-self: center;
  text-decoration: none;
`;

interface IProps {
  cardsTransactions: IOperationItem[];
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

  const formattedOperations = (operations: IOperationItem[]) => {
    const resultOperations =
      useLocation().pathname === ROUTES.HISTORY
        ? getFiltredOperations(
            operations,
            card,
            currency,
            selectedDateFrom,
            selectedDateTo
          )
        : operations;
    if (resultOperations.length) {
      return resultOperations
        .sort(
          (itemA, itemB) =>
            Date.parse(itemB.operation.date) - Date.parse(itemA.operation.date)
        )
        .map(({ key, operation }) => (
          <OperationCard operation={operation} key={key} />
        ));
    } else
      return (
        <Box p={4}>
          <Typography variant="body1" color="textPrimary">
            {t("Not found")}
          </Typography>
        </Box>
      );
  };

  const isQueryPathHistory = () => useLocation().pathname === ROUTES.HISTORY;

  const filteredOperationsByType = (type: string) => {
    const transactions = isQueryPathHistory()
      ? getFiltredOperations(
          cardsTransactions,
          card,
          currency,
          selectedDateFrom,
          selectedDateTo
        )
      : cardsTransactions;
    const filtered = transactions.filter(
      ({ operation }) => operation.type === type
    );

    return formattedOperations(filtered);
  };

  const handleChangeTab = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
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
      {!isQueryPathHistory() && (
        <Typography variant="h2" color="textPrimary">
          {t("Last operations")}
        </Typography>
      )}
      {userData.isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <StyledOperationsContainer>
          {isQueryPathHistory() && (
            <>
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
              <DatePickers
                selectedDateFrom={selectedDateFrom}
                selectedDateTo={selectedDateTo}
                handleDateChangeFrom={handleDateChangeFrom}
                handleDateChangeTo={handleDateChangeTo}
              />
            </>
          )}
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            scrollButtons="on"
          >
            {categories.map((item) => (
              <StyledTab label={t(item.name)} key={item.type} />
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
          {!isQueryPathHistory() && (
            <StyledLink to={ROUTES.HISTORY}>
              <PrimaryButton>{t("More")}</PrimaryButton>
            </StyledLink>
          )}
        </StyledOperationsContainer>
      )}
    </StyledContainer>
  );
};

export default TransactionsList;
