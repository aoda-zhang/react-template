import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { App as AtdApp } from "antd";

import "antd/dist/reset.css";

import App from "./App";
import envConfig from "./config";

import "./shared/i18n";
const theme = {
  token: {
    colorPrimary: envConfig?.systemSettings?.colorPrimary,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: envConfig?.queryOptions?.refetchOnReconnect,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AtdApp>
        <Router>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Router>
      </AtdApp>
    </ConfigProvider>
  </React.StrictMode>,
);
