import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';

const theme = extendTheme({
  colors: {
    brand: "#0079bf",
    success: "#70b500",
    danger: "#eb5a46",
    info: "#ff9f1a",
    warning: "#f2d600",
    darkblue: "#eae6ff",
    lightblue: "#f2faf9",
    performance: "#0079bf",
    bug: "#eb5a46",
    feature: "#61bd4f",
    information: "#ff9f1a",
    disabled: "#dddddd",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
