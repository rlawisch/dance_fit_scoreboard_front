import styled, { createGlobalStyle } from "styled-components";
import "@fontsource/roboto";

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body, input, button, select {
        background: ${(props) => props.theme.colors.background};
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 1rem;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
    }

    button {
        cursor: pointer;
    }

    a,
    a:link,
    a:visited,
    a:focus,
    a:hover,
    a:active {
        text-decoration: none;
    cursor: pointer;
}
`;

export const GlobalContainer = styled.div`
  border-radius: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
