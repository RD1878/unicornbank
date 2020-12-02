import React from "react";
import { Header } from "../../../organisms";

const MainLayout: React.FC<React.ReactNode> = ({ children }) => {
  console.log(children);
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export { MainLayout };
