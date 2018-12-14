import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  font-size: 10vw;
  color: #222;
  background-color: #fff;
  padding: 10px 20px;
`;

export default class LoadingIndicator extends React.Component {
  render() {
    return (
      <Container>
        <InnerContainer>Loading</InnerContainer>
      </Container>
    );
  }
}