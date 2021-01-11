import React, { ReactNode } from "react";
import styled from "styled-components";
import errorBackground from "../assets/images/error-boundary.jpg";

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

const ErrorBackground = styled.div`
  background-image: url(${errorBackground});
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  white-space: pre-line;
`;

const StyledErrorText = styled.h1`
  font-size: 24px;
  color: #0c121f;
`;

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorBackground>
          <StyledErrorText>{`
            Извините, но что-то пошло не так :(
            Мы уже в курсе проблемы и работаем над ее устранением!
            `}</StyledErrorText>
        </ErrorBackground>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
