import { ListItemIcon } from "@material-ui/core";
import React, { FC } from "react";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";

const CardIconItem: FC = () => {
  return (
    <ListItemIcon>
      <PaymentRoundedIcon color="secondary" fontSize="large" />
    </ListItemIcon>
  );
};

export default CardIconItem;
