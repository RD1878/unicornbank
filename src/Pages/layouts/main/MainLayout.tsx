import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Header, Sidebar, Footer } from "../../../organisms";
import { db } from "../../../firebase/firebase";
import { ErrorBoundary } from "../../../errorBoundaries";

const ContentContainer = withTheme(styled("div")`
  display: flex;
  background-color: ${(props) => props.theme.palette.primary.light};
  min-height: calc(100vh - 230px);
`);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
`;

interface IMainLayout {
  onToggleTheme: () => void;
}

const MainLayout: FC<IMainLayout> = ({ children, onToggleTheme }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [icon, setIcon] = useState(null);

  const getContactInfo = () => {
    db.ref("users/0")
      .once("value")
      .then((response) => {
        const data = response.val();

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPatronymic(data.patronymic);
        setIcon(data.icon);
      });
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <>
      <Header onToggleTheme={onToggleTheme} />
      <ErrorBoundary>
        <ContentContainer>
          <Sidebar
            fullName={`${firstName} ${lastName} ${patronymic}`}
            icon={icon}
          />
          <Container>{children}</Container>
        </ContentContainer>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export { MainLayout };
