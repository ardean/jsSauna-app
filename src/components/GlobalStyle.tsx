import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: monospace;
    background-image: url("/bg.jpg");
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;

export default GlobalStyle;