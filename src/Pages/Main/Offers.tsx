import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

const StyledPaper = styled(Paper)`
  display: flex;
  margin: 0 0 60px;

  & .MuiTabs-root {
    width: 100%;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  title?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, title, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5} mt={3}>
          <Typography variant="h1" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export const Offers: FC = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (
    e: ChangeEvent<Record<string, unknown>>,
    newVal: number
  ) => {
    setTab(newVal);
  };

  return (
    <Container maxWidth="lg">
      <TabPanel value={tab} index={0} title="Процент выше">
        Item One
      </TabPanel>
      <TabPanel
        value={tab}
        index={1}
        title="Накопительный счёт с повышенной ставкой"
      >
        Item Two
      </TabPanel>
      <TabPanel value={tab} index={2} title="Новые возможности">
        Item Three
      </TabPanel>

      <StyledPaper>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </StyledPaper>
    </Container>
  );
};
