import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --malachite-50: #ecfde8;
        --malachite-100: #d4facd;
        --malachite-200: #aef4a2;
        --malachite-300: #7beb6b;
        --malachite-400: #50dd3e;
        --malachite-500: #33d522;
        --malachite-600: #209b15;
        --malachite-700: #1a7714;
        --malachite-800: #195e16;
        --malachite-900: #195017;
        --malachite-950: #072c07;
    }

    body, input, button, select {
        font-family: 'Montserrat', sans-serif;
        font-weight: normal;
        font-size: 0.9rem;
        color: var(--malachite-800)
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;

export const GlobalContainer = styled.div`
  border-radius: 1.5rem;
  padding: 1rem;
  background-color: var(--malachite-50);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
