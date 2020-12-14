import React, { FC } from "react";

interface TabPanelProps {
  type: string;
  value: number;
  index: number;
}

const TabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  type,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`${type}-tabpanel-${index}`}
    aria-labelledby={`${type}-tab-${index}`}
    {...other}
  >
    {value === index && children}
  </div>
);

export default TabPanel;
