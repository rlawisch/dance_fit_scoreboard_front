import styled, { createGlobalStyle } from "styled-components";
import "@fontsource/roboto";
import { shade } from "polished";

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
        color: ${(props) => props.theme.colors.text}
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
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
  background-color: ${(props) => shade(-0.1, props.theme.colors.background)};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.colors.text};
`;

interface DashboardContainerProps {
  isopen: boolean;
}

export const DashboardContainer = styled.main<DashboardContainerProps>`
  margin-left: ${(props) => (props.isopen ? "12rem" : "5rem")};
  transition: margin 350ms ease;
  height: auto;
  box-sizing: border-box;
`;

export const PlayerMiniature = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MusicLevelMiniature = styled.img`
  width: 40px;
  height: 40px;

`
