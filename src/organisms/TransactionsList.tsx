import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../atoms";
import { OperationCard, TabPanel } from "../molecules";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";
import ICardOperation from "../interfaces/cardOpeartion";
import { Link } from "react-router-dom";

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

const categories: { type: string; name: string }[] = [
  { type: "all", name: "Все" },
  { type: "income", name: "Поступления" },
  { type: "writeOff", name: "Списания" },
];

interface IProps {
  cardsTransactions: { id: string; key: string; operation: ICardOperation }[];
}

const TransactionsList: FC<IProps> = ({ cardsTransactions }) => {
  const [tab, setTab] = useState(0);
  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };

  const filteredOperationsByType = (type: string) => {
    const filtered = cardsTransactions.filter(
      ({ operation }) => operation.type === type
    );

    if (filtered.length) {
      return filtered
        .sort(
          (itemA, itemB) =>
            Date.parse(itemB.operation.date) - Date.parse(itemA.operation.date)
        )
        .slice(0, 10)
        .map(({ key, operation }) => (
          <OperationCard operation={operation} key={key} />
        ));
    } else
      return (
        <Box p={4}>
          <Typography variant="body1" color="textPrimary">
            Не найдено
          </Typography>
        </Box>
      );
  };

  return (
    <StyledContainer>
      <Typography variant="h2" color="textPrimary">
        Последние операции
      </Typography>
      <StyledOperationsContainer>
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
          {cardsTransactions
            .sort(
              (itemA, itemB) =>
                Date.parse(itemB.operation.date) -
                Date.parse(itemA.operation.date)
            )
            .slice(0, 10)
            .map(({ key, operation }) => (
              <OperationCard operation={operation} key={key} />
            ))}
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
        <StyledLink to="*">
          <PrimaryButton>Подробнее</PrimaryButton>
        </StyledLink>
      </StyledOperationsContainer>
    </StyledContainer>
  );
};

export default TransactionsList;
