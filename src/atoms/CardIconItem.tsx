import { ListItemIcon } from "@material-ui/core";
import React, { FC } from "react";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";

const CardIconItem: FC = () => {
  return (
    <ListItemIcon>
      <AccountBalanceWallet color="secondary" fontSize="large" />
    </ListItemIcon>
  );
};

export default CardIconItem;
