import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../atoms";
import { OperationCard } from "../../molecules";
import { Box, Tabs, Tab } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const StyledTab = styled(Tab)`
  text-transform: none;
  min-width: 80px;
  max-width: 115px;
  line-height: 1.25;

  & .MuiTab-wrapper {
    align-items: flex-start;
  }
`;

export const Operations: FC = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (
    e: ChangeEvent<Record<string, unknown>>,
    newVal: number
  ) => {
    setTab(newVal);
  };

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

  return (
    <Box mt={3} width={500}>
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="on"
      >
        {categories.map((item) => (
          <StyledTab label={item} key={item} />
        ))}
      </Tabs>

      <TabPanel value={tab} index={0}>
        <OperationCard operation={operations[0]} />
        <OperationCard operation={operations[1]} />
        <OperationCard operation={operations[0]} />
      </TabPanel>
      <TabPanel value={tab} index={1}></TabPanel>
      <TabPanel value={tab} index={2}></TabPanel>

      <PrimaryButton>Подробнее</PrimaryButton>
    </Box>
  );
};
