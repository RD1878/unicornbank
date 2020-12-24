import React, { FC, useState, ChangeEvent } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { Map as YMap, Placemark, YMaps, ZoomControl } from "react-yandex-maps";

const categories: { type: string; name: string }[] = [
  { type: "all", name: "Отделения" },
  { type: "transaction", name: "Банкоматы" },
];

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
  }
`;

const StyledWrap = styled("div")`
  margin: -40px;
`;
const StyleMapContainer = styled("div")`
  position: relative;
`;

const StyledYMap = styled(YMap)`
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 30px;
  min-height: 100vh;
`;

const Map: FC = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };
  return (
    <StyledWrap>
      <Container>
        <Box mt={5}>
          <Typography variant="h1" color="textPrimary">
            Карта отделений и банкоматов
          </Typography>
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
        </Box>
      </Container>
      <StyleMapContainer>
        <YMaps>
          <StyledYMap
            defaultState={{
              center: [55.798551, 49.106324],
              zoom: 16,
              controls: [],
            }}
          >
            <Placemark />
            <ZoomControl
              options={{
                float: "right",
              }}
            />
          </StyledYMap>
        </YMaps>
      </StyleMapContainer>
    </StyledWrap>
  );
};

export default Map;
