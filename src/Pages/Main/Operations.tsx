import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../atoms";
import { OperationCard, TabPanel } from "../../molecules";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";

const StyledTab = styled(({ ...props }) => (
  <Tab classes={{ wrapper: "wrapper" }} {...props} />
))`
  text-transform: none;
  min-width: 80px;
  max-width: 115px;
  line-height: 1.25;

  & .wrapper {
    align-items: flex-start;
  }
`;

const categories: string[] = [
  "Все",
  "Переводы",
  "Пополнения",
  "Товары и услуги",
  "Развлечения",
];

const operations = [
  {
    id: 0,
    accountId: 0,
    date: "2020-12-03T14:43:09.926Z",
    name: "ООО Додо",
    description: "Получение заработной платы",
    type: "income",
    amount: 32000,
    category: "income",
    currency: "₽",
  },
  {
    id: 1,
    accountId: 1,
    date: "2019-10-02T14:43:09.926Z",
    name: "Uber",
    description: "Оплата такси",
    type: "expense",
    amount: 1.7,
    category: "service",
    currency: "$",
  },
];

export const Operations: FC = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (
    e: ChangeEvent<Record<string, unknown>>,
    newVal: number
  ) => {
    setTab(newVal);
  };

  return (
    <>
      <Typography variant="h1" color="textPrimary">
        Последние операции
      </Typography>

      <Box mt={2} maxWidth={800}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          scrollButtons="on"
        >
          {categories.map((item) => (
            <StyledTab label={item} key={item} />
          ))}
        </Tabs>

        <TabPanel type="scrollable-force" value={tab} index={0}>
          <OperationCard operation={operations[0]} />
          <OperationCard operation={operations[1]} />
        </TabPanel>

        <PrimaryButton>Подробнее</PrimaryButton>
      </Box>
    </>
  );
};
