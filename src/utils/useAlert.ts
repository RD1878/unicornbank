import { useState } from "react";

interface IUseAlert {
  isAlertOpen: boolean;
  onAlertOpen: () => void;
  onAlertClose: () => void;
}

export const useAlert = (initialState = false): IUseAlert => {
  const [open, setOpen] = useState(initialState);

  const onAlertOpen = () => setOpen(true);
  const onAlertClose = () => setOpen(false);

  return { isAlertOpen: open, onAlertOpen, onAlertClose };
};
