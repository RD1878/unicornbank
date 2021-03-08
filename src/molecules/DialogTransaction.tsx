import React, { FC, useState, ChangeEvent } from "react";
import { Dialog, DialogTitle, Tab, withTheme } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { PrimaryAlert, PrimaryButton } from "../atoms";
import { TAlert } from "../interfaces/tAlert";
import { useAlert } from "../utils/useAlert";
import DialogContentYourAccounts from "./../atoms/DialogContentYourAccounts";
import DialogContentAnotherUser from "./../atoms/DialogContentAnotherUser";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import userState from "../recoilState/recoilAtoms/userAtom";
export interface IFormData {
  card1: string;
  card2: string;
  sum: string;
  calculatedSum: string;
  cardNumber?: string;
}

const StyledTab = styled(({ ...props }) => (
  <Tab classes={{ wrapper: "wrapper" }} {...props} />
))`
  text-transform: none;
`;

const StyledTabContext = withTheme(styled(({ ...props }) => (
  <TabContext classes={{ root: "root" }} {...props} />
))`
  &.root {
    padding: 16px 48px;
  }
`);

const StyledTabPanel = withTheme(styled(({ ...props }) => (
  <TabPanel classes={{ root: "root" }} {...props} />
))`
  &.root {
    padding: 7px;
  }
`);

const StyledTabList = withTheme(styled(({ ...props }) => (
  <TabList classes={{ root: "root" }} {...props} />
))`
  &.root {
    padding: 7px 30px;
  }
`);

const StyledDialogTitle = withTheme(styled(({ ...props }) => (
  <DialogTitle classes={{ root: "root" }} {...props} />
))`
  &.root {
    padding: 17px 30px;
  }
`);

const DialogTransaction: FC = () => {
  const [tab, setTab] = useState("0");
  const { t } = useTranslation();
  const { userData } = useRecoilValue(userState);
  const { products } = userData;
  const cards = Object.values(products?.cards ?? {});
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
        disabled={!cards.length}
      >
        {t("Money transaction")}
      </PrimaryButton>
      <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
        <StyledDialogTitle>{t("Transaction")}</StyledDialogTitle>
        <StyledTabContext value={tab}>
          <StyledTabList onChange={handleChange}>
            <StyledTab label={t("Between your accounts")} value="0" />
            <StyledTab label={t("To another bank user")} value="1" />
          </StyledTabList>
          <StyledTabPanel value="0">
            <DialogContentYourAccounts
              closeDialog={handleCloseDialog}
              openAlert={onAlertOpen}
              setAlertType={setAlertType}
              setErrorMessage={setErrorMessage}
            />
          </StyledTabPanel>
          <StyledTabPanel value="1">
            <DialogContentAnotherUser
              closeDialog={handleCloseDialog}
              openAlert={onAlertOpen}
              setAlertType={setAlertType}
              setErrorMessage={setErrorMessage}
            />
          </StyledTabPanel>
        </StyledTabContext>
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
