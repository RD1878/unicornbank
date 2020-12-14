import React, { FC, ChangeEvent, useState } from "react";
import { TabPanel } from "../../molecules";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

interface TabPanelProps {
  title: string;
  subtitle?: string;
  index: number;
  value: number;
}

function TabPanelWrapper({ title, subtitle, value, index }: TabPanelProps) {
  return (
    <TabPanel type="vertical-tabpanel" value={value} index={index}>
      <Box p={5}>
        <Typography variant="h1" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </Box>
    </TabPanel>
  );
}

const offers = [
  {
    id: 1,
    title: "Процент выше",
    subtitle: "По вкладу 'Семейный'",
    type: "deposit",
  },
  {
    id: 2,
    title: "Еще больше выгоды",
    subtitle: "Проценты снижены",
    type: "loan",
  },
  {
    id: 3,
    title: "Новые возможности",
    subtitle: "Для вас и вашего бизнеса",
    type: "business",
  },
];

export const Offers: FC = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (
    e: ChangeEvent<Record<string, unknown>>,
    newVal: number
  ) => {
    setTab(newVal);
  };

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {offers.map((item, index) => (
        <TabPanelWrapper
          value={tab}
          index={index}
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}

      <Box my={7}>
        <Paper>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            centered={true}
          >
            <Tab label="Вклады" />
            <Tab label="Кредиты" />
            <Tab label="Для бизнеса" />
          </Tabs>
        </Paper>
      </Box>
    </Container>
  );
};
