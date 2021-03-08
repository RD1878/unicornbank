import { List } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CardItem } from "../atoms";
import { ICard } from "../interfaces/card";
import { useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";

const StyledCardLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

interface IProps {
  open: boolean;
  onToggleMobileDrawer?: () => void;
}

const CardsList: FC<IProps> = ({ open, onToggleMobileDrawer }) => {
  const { userData } = useRecoilValue(userState);

  const cards = Object.entries(userData.products?.cards ?? {});

  return (
    <List component="div" disablePadding>
      {cards.map(([key, value]: [string, ICard]) => (
        <StyledCardLink
          to={`/card/${key}`}
          key={key}
          onClick={onToggleMobileDrawer}
        >
          <CardItem
            open={open}
            number={value.number}
            balance={value.balance}
            currency={value.currency}
          />
        </StyledCardLink>
      ))}
    </List>
  );
};

export default CardsList;
