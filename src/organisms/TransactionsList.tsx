import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../atoms";
import { OperationCard, TabPanel } from "../molecules";
import { Box, Tabs, Tab, Typography, LinearProgress } from "@material-ui/core";
import { IOperation } from "../interfaces/operation";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";

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

interface ICardTransaction {
  id: string;
  key: string;
  operation: IOperation;
}

interface IProps {
  cardsTransactions: ICardTransaction[];
}

const TransactionsList: FC<IProps> = ({ cardsTransactions }) => {
  const { t } = useTranslation();
  const { userData } = useRecoilValue(userState);
  const [tab, setTab] = useState(0);
  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };

  const categories: { type: string; name: string }[] = [
    { type: "all", name: t("All") },
    { type: "income", name: t("Incomes") },
    { type: "writeOff", name: t("Write off") },
  ];

  const formattedOperations = (operations: ICardTransaction[]) =>
    operations
      .sort(
        (itemA, itemB) =>
          Date.parse(itemB.operation.date) - Date.parse(itemA.operation.date)
      )
      .slice(0, 10)
      .map(({ key, operation }) => (
        <OperationCard operation={operation} key={key} />
      ));

  const filteredOperationsByType = (type: string) => {
    const filtered = cardsTransactions.filter(
      ({ operation }) => operation.type === type
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

  return (
    <StyledContainer>
      <Typography variant="h2" color="textPrimary">
        {t("Last operations")}
      </Typography>
      {userData.isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
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
          <StyledLink to="*">
            <PrimaryButton>{t("More")}</PrimaryButton>
          </StyledLink>
        </StyledOperationsContainer>
      )}
    </StyledContainer>
  );
};

export default TransactionsList;
