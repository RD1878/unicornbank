import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../atoms";
import { OperationCard } from "../../molecules";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";

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
      {value === index && (
        <Box>
          <Typography variant="body1" color="textSecondary">
            {children}
          </Typography>
        </Box>
      )}
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
        <StyledTab label="Все" />
        <StyledTab label="Переводы" />
        <StyledTab label="Пополнения" />
        <StyledTab label="Товары и услуги" />
        <StyledTab label="Штрафы, комиссии" />
        <StyledTab label="Развлечения" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <OperationCard />
        <OperationCard isIncome={true} />
        <OperationCard />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <OperationCard isIncome={true} />
        <OperationCard />
        <OperationCard />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <OperationCard />
        <OperationCard isIncome={true} />
        <OperationCard isIncome={true} />
      </TabPanel>

      <PrimaryButton>Подробнее</PrimaryButton>
    </Box>
  );
};
