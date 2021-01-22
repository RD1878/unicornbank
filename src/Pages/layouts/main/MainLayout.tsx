import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Header, Sidebar, Footer } from "../../../organisms";
import { db } from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "../../../errorBoundaries";
import { saveUser } from "../../../actions/user";

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
  const dispatch = useDispatch();

  const getContactInfo = () => {
    db.ref("users/AXWUCpTAxhfHb7nWfoS2Nk7DqZa2")
      .once("value")
      .then((response) => {
        const data = response.val();
        dispatch(saveUser(data));
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
          <Sidebar />
          <Container>{children}</Container>
        </ContentContainer>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export { MainLayout };
