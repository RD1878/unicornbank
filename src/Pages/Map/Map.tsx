import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { Map as YMap, Placemark, YMaps, ZoomControl } from "react-yandex-maps";
import { db } from "../../firebase/firebase";
import MapInfoItem from "./../../atoms/MapInfoItem";

export interface IAtm {
  id: number;
  name: string;
  address: string;
  timeStart: string;
  timeEnd: string;
  latitude: number;
  longitude: number;
}

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
  width: 100%;
  position: relative;
  min-height: 573px;
  overflow: hidden;
`;

const StyledYMap = styled(YMap)`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Map: FC = () => {
  const [tab, setTab] = useState(0);
  const [branches, setBranches] = useState<IAtm[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<IAtm | null>(null);

  const KAZAN_CENTER = [55.798551, 49.106324];

  const getMapInfo = () => {
    db.ref("ATM")
      .once("value")
      .then((response) => {
        const data = response.val();
        setBranches(data);
      });
  };

  useEffect(() => {
    getMapInfo();
  }, []);

  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };

  const onMapInfoClose = () => {
    setSelectedBranch(null);
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
            {categories.map(({ name, type }) => (
              <StyledTab label={name} key={type} />
            ))}
          </Tabs>
        </Box>
      </Container>
      <StyleMapContainer>
        <YMaps>
          <StyledYMap
            width="100%"
            height="100%"
            defaultState={{
              center: KAZAN_CENTER,
              zoom: 13,
              controls: [],
            }}
          >
            {branches.map((branch) => (
              <Placemark
                key={branch.id}
                geometry={[branch.latitude, branch.longitude]}
                onClick={() => setSelectedBranch(branch)}
              />
            ))}
            <ZoomControl
              options={{
                float: "left",
              }}
            />
          </StyledYMap>
        </YMaps>
        {selectedBranch && (
          <MapInfoItem {...selectedBranch} onClose={onMapInfoClose} />
        )}
      </StyleMapContainer>
    </StyledWrap>
  );
};

export default Map;
