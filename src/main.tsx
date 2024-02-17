import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StyleSheetManager } from "styled-components";
import emotionIsPropValid from "@emotion/is-prop-valid";
import { AppProvider } from "./providers/index.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={emotionIsPropValid}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </StyleSheetManager>
  </React.StrictMode>,
);
