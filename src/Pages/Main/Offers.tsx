import React, { FC, ChangeEvent, ReactNode } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../../atoms";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

interface TabPanelProps {
  children?: ReactNode;
  title: string;
  subtitle?: string;
  action: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { title, subtitle, action, value, index, ...other } = props;

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
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        </Box>
      )}
    </div>
  );
}

const StyledPaper = styled(Paper)`
  display: flex;
  margin: 0 0 60px;

  & .MuiTabs-root {
    width: 100%;
  }
`;

export const Offers: FC = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (
    e: ChangeEvent<Record<string, unknown>>,
    newVal: number
  ) => {
    setTab(newVal);
  };

  return (
    <Container maxWidth="lg" disableGutters={true}>
      <TabPanel
        value={tab}
        index={0}
        title="Процент выше"
        subtitle="По вкладу 'Семейный'"
        action="Подробности"
      />
      <TabPanel
        value={tab}
        index={1}
        title="Накопительный счёт с повышенной ставкой"
        subtitle="6% в первый месяц"
        action="Подробности"
      />
      <TabPanel
        value={tab}
        index={2}
        title="Новые возможности"
        subtitle="Для вас и вашего бизнеса"
        action="Подробности"
      />

      <StyledPaper>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="Вклады" />
          <Tab label="Кредиты" />
          <Tab label="Для бизнеса" />
        </Tabs>
      </StyledPaper>
    </Container>
  );
};
