import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CardInfoTitle } from "../../molecules";
import { PrimaryButton } from "../../atoms";

const StyledButtonsWraper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  min-width: 265px;
  @media screen and (max-width: 1280px) {
    width: 265px;
    margin-top: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CardInfo: FC = () => {
  /*   const id = props.match.params.id;
  console.log(id);*/

  return (
    <>
      <CardInfoTitle />
      <StyledButtonsWraper>
        <StyledPrimaryButton>Заблокировать карту</StyledPrimaryButton>
        <StyledPrimaryButton>Перевыпустить карту</StyledPrimaryButton>
        <StyledLink to={`/card/0/requisites`}>
          <StyledPrimaryButton>Реквизиты</StyledPrimaryButton>
        </StyledLink>
      </StyledButtonsWraper>
    </>
  );
};

export default CardInfo;
