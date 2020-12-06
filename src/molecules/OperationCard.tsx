import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Avatar, Box, Card, CardMedia, Typography } from "@material-ui/core";

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 30vw;
  padding: 20px 30px;
`;

export const OperationCard: FC = () => {
  return (
    <Box mt={3} px={3}>
      <Typography variant="caption" color="textSecondary">
        23 августа, понедельник
      </Typography>
      <StyledCard>
        <Avatar>И</Avatar>
        <Box>
          <Typography variant="button">ИВАН ИВАНОВИЧ И.</Typography>
          <Typography variant="body1" color="textSecondary">
            Получение перевода
          </Typography>
        </Box>
        <Typography variant="h2">32 000, 22р</Typography>
      </StyledCard>
    </Box>
  );
};
