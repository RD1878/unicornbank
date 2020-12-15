import React, {
  FC,
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import firebase from "firebase/app";
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
    <TabPanel
      type="vertical-tabpanel"
      value={value}
      index={index}
      imagesrc={index + 1}
    >
      <Box p={5} minHeight={200}>
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

interface IOffer {
  id: number;
  title: string;
  subtitle: string;
  type: string;
}

export const Offers: FC = () => {
  // offers tab state
  const [tab, setTab] = useState(0);
  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };

  // offers from db state
  const [offers, setOffers]: [
    IOffer[],
    Dispatch<SetStateAction<never[]>>
  ] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("/offers")
      .once("value")
      .then((snapshot) => {
        setOffers(snapshot.val());
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {offers.length &&
        offers.map((item, index) => (
          <TabPanelWrapper
            value={tab}
            index={index}
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}

      <Box mb={7}>
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
