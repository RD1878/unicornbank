import React, { FC, ChangeEvent, useState, useEffect } from "react";
import firebase from "firebase/app";
import { TabPanel } from "../../molecules";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
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
  const [offerTab, setOfferTab] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [offers, setOffers] = useState<IOffer[]>([]);

  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setOfferTab(newVal);
  };

  useEffect(() => {
    firebase
      .database()
      .ref("/offers")
      .once("value")
      .then((snapshot) => {
        setOffers(snapshot.val());
        setLoaded(true);
      });
  }, []);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      {offers.length ? (
        offers.map((item, index) => (
          <TabPanelWrapper
            value={offerTab}
            index={index}
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))
      ) : (
        <Box p={8}>
          <Typography variant="h2" color="textPrimary">
            Загрузка персональных предложений
          </Typography>
        </Box>
      )}
      {!loaded && <LinearProgress color="secondary" />}
      <Box mb={7}>
        <Paper>
          <Tabs
            value={offerTab}
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
