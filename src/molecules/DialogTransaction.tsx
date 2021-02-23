import React, { FC, useState, ChangeEvent } from "react";
import { Dialog, DialogTitle, Tab } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PrimaryAlert, PrimaryButton } from "../atoms";
import { TAlert } from "../interfaces/main";
import { useAlert } from "../utils/useAlert";
import DialogContentYourAccounts from "./../atoms/DialogContentYourAccounts";
import DialogContentAnotherUser from "./../atoms/DialogContentAnotherUser";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
export interface IFormData {
  card1: string;
  card2: string;
  sum: string;
  calculatedSum: string;
  cardNumber: string;
}

const DialogTransaction: FC = () => {
  const [tab, setTab] = useState("0");
  const { t } = useTranslation();
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const alertMessage =
    alertType === "success"
      ? `${t("Translation completed successfully!")}`
      : errorMessage;
  const { isAlertOpen, onAlertOpen, onAlertClose } = useAlert();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (event: ChangeEvent<unknown>, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <PrimaryButton
        variant="outlined"
        color="primary"
        onClick={handleOpenDialog}
      >
        {t("Money transaction")}
      </PrimaryButton>
      <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("Transaction")}</DialogTitle>
        <TabContext value={tab}>
          <TabList onChange={handleChange}>
            <Tab label="In order to transfer money to your card" value="0" />
            <Tab
              label="In order to transfer money to another bank user"
              value="1"
            />
          </TabList>
          <TabPanel value="0">
            <DialogContentYourAccounts
              closeDialog={handleCloseDialog}
              openAlert={onAlertOpen}
              setAlertType={setAlertType}
              setErrorMessage={setErrorMessage}
            />
          </TabPanel>
          <TabPanel value="1">
            <DialogContentAnotherUser
              closeDialog={handleCloseDialog}
              openAlert={onAlertOpen}
              setAlertType={setAlertType}
              setErrorMessage={setErrorMessage}
            />
          </TabPanel>
        </TabContext>
      </Dialog>

      <PrimaryAlert
        open={isAlertOpen}
        onClose={onAlertClose}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </>
  );
};

export default DialogTransaction;
