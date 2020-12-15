import React, {
  ChangeEvent,
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import { IOperation } from "../../interfaces/main";
import { PrimaryButton } from "../../atoms";
import { OperationCard, TabPanel } from "../../molecules";
import { Box, Tabs, Tab, Typography } from "@material-ui/core";

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

const categories: { type: string; name: string }[] = [
  { type: "all", name: "Все" },
  { type: "transaction", name: "Переводы" },
  { type: "income", name: "Пополнения" },
  { type: "service", name: "Товары и услуги" },
  { type: "entertainment", name: "Развлечения" },
];

export const Operations: FC = () => {
  const [tab, setTab] = useState(0);
  const handleChange = (e: ChangeEvent<unknown>, newVal: number) => {
    setTab(newVal);
  };

  // operations from db state
  const [operations, setOperations]: [
    IOperation[],
    Dispatch<SetStateAction<never[]>>
  ] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("/operations/testaccount1")
      .once("value")
      .then((snapshot) => {
        setOperations(snapshot.val());
      });
  }, []);

  const filteredByType = (type: string): IOperation[] => {
    return operations.filter((item) => item.category === type);
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
            <StyledTab label={item.name} key={item.type} />
          ))}
        </Tabs>

        <TabPanel type="scrollable-force" value={tab} index={0}>
          {operations.map((item) => (
            <OperationCard operation={item} key={item.id} />
          ))}
        </TabPanel>

        {categories.map(
          (category, index) =>
            category.type !== "all" && (
              <TabPanel
                type="scrollable-force"
                value={tab}
                index={index}
                key={index}
              >
                {filteredByType(category.type).length ? (
                  filteredByType(category.type).map((item) => (
                    <OperationCard operation={item} key={item.id} />
                  ))
                ) : (
                  <Box p={4}>
                    <Typography variant="body1" color="textPrimary">
                      Не найдено
                    </Typography>
                  </Box>
                )}
              </TabPanel>
            )
        )}

        <PrimaryButton>Подробнее</PrimaryButton>
      </Box>
    </>
  );
};
