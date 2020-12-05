import React, { ReactNode } from "react";
import { Header } from "../../../organisms";

interface IMainLayout {
  children?: ReactNode;
  onToggleTheme: () => void;
}

const MainLayout: React.FC<IMainLayout> = ({ children, onToggleTheme }) => {
  return (
    <>
      <Header onToggleTheme={onToggleTheme} />
      <div>{children}</div>
    </>
  );
};

export { MainLayout };
