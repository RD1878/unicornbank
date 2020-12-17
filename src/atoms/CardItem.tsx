import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import Tooltip from "@material-ui/core/Tooltip";

interface ICardItem {
  title: string;
  value: string;
  open: boolean;
}

const StyledListItem = withTheme(styled(ListItem)`
  padding-left: 18px;
  padding-right: 18px;
`);

const StyledListItemIcon = withTheme(styled(ListItemIcon)`
  min-width: 0px;
`);

const StyledRow = withTheme(styled("div")<ICardItem>`
  display: flex;
  flex-direction: ${(props) => (props.open ? "row" : "column")};
  align-items: ${(props) => (props.open ? "left" : "center")};
  p {
    margin-right: ${(props) => (props.open ? "30px" : "0")};
    text-align: ${(props) => (props.open ? "left" : "center")};
  }
`);

const CardItem: FC<ICardItem> = ({ title, value, open }) => {
  return (
    <StyledListItem button>
      <ListItemText>
        <Tooltip title={title} arrow>
          <StyledRow open={open}>
            <Typography
              variant={open ? "body2" : "body1"}
              color="textPrimary"
              align="left"
            >
              {value}
            </Typography>
            <PaymentRoundedIcon
              color="secondary"
              fontSize={open ? "default" : "large"}
            />
          </StyledRow>
        </Tooltip>
        {open && (
          <Typography variant="body1" color="textSecondary" align="left">
            {title}
          </Typography>
        )}
      </ListItemText>
      {open && (
        <StyledListItemIcon>
          <PieChartOutlinedIcon color="disabled" />
        </StyledListItemIcon>
      )}
    </StyledListItem>
  );
};

export default CardItem;
