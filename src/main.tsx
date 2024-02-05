import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyle } from "./styles/global.ts";
import { StyleSheetManager } from "styled-components";
import emotionIsPropValid from "@emotion/is-prop-valid";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={emotionIsPropValid}>
      <GlobalStyle />
      <App />
    </StyleSheetManager>
  </React.StrictMode>
);
